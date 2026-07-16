/*
  LinkedIA — Worker Cloudflare pour le formulaire de contact.
  Rôle : reçoit une demande depuis le site (POST JSON) et te l'envoie par email via Brevo.
  La clé API Brevo reste secrète côté serveur — elle n'apparaît jamais dans le site public.

  ─────────────────────────────────────────────────────────────────────────────
  VARIABLES À CONFIGURER dans Cloudflare (onglet Settings › Variables du Worker) :

    BREVO_API_KEY   (Secret / "Encrypt")  = ta clé API Brevo  (commence par xkeysib-...)
    SENDER_EMAIL    (Texte)               = l'email expéditeur VÉRIFIÉ dans Brevo
                                            (ex : contact@tondomaine.fr — ou, sans domaine,
                                             une adresse que tu as validée comme expéditeur Brevo)
    TO_EMAIL        (Texte)               = l'adresse où TU veux recevoir les demandes
                                            (ex : Jeremyhproo@gmail.com)

  Optionnel :
    SENDER_NAME     (Texte)               = nom affiché de l'expéditeur (défaut : "LinkedIA")
    AUTO_REPLY      (Texte)               = "1" pour envoyer aussi un accusé de réception
                                            automatique au prospect (défaut : désactivé)
  ─────────────────────────────────────────────────────────────────────────────
*/

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply({ error: 'method not allowed' }, 405, cors);

    let b;
    try { b = await request.json(); } catch (e) { return reply({ error: 'invalid json' }, 400, cors); }

    // Anti-spam : champ piège caché. Si un bot le remplit, on fait comme si tout allait bien.
    if (b.website) return reply({ ok: true }, 200, cors);

    const name = clean(b.name, 120);
    const email = clean(b.email, 160);
    const type = clean(b.type, 80) || 'Non précisé';
    const msg = clean(b.msg, 4000);

    if (!name || !email || !isEmail(email)) return reply({ error: 'champs invalides' }, 400, cors);
    if (!env.BREVO_API_KEY || !env.SENDER_EMAIL || !env.TO_EMAIL) {
      return reply({ error: 'service non configuré' }, 503, cors);
    }

    // Email principal : la demande t'arrive dans ta boîte, avec le mail du prospect en "répondre à".
    const lead = await sendBrevo(env, {
      to: [{ email: env.TO_EMAIL, name: env.SENDER_NAME || 'LinkedIA' }],
      replyTo: { email, name },
      subject: 'Nouvelle demande — ' + name + ' (' + type + ')',
      html: leadHtml({ name, email, type, msg }),
      text: leadText({ name, email, type, msg }),
    });

    if (!lead.ok) {
      const detail = await safeText(lead);
      return reply({ error: 'envoi impossible', detail }, 502, cors);
    }

    // Accusé de réception au prospect (optionnel, non bloquant).
    if (env.AUTO_REPLY === '1') {
      try {
        await sendBrevo(env, {
          to: [{ email, name }],
          replyTo: { email: env.TO_EMAIL, name: env.SENDER_NAME || 'LinkedIA' },
          subject: 'Bien reçu, merci ! — LinkedIA',
          html: ackHtml({ name }),
          text: ackText({ name }),
        });
      } catch (e) { /* non bloquant */ }
    }

    return reply({ ok: true }, 200, cors);
  },
};

/* ---------- Envoi Brevo ---------- */
function sendBrevo(env, m) {
  return fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', 'accept': 'application/json' },
    body: JSON.stringify({
      sender: { name: env.SENDER_NAME || 'LinkedIA', email: env.SENDER_EMAIL },
      to: m.to,
      replyTo: m.replyTo,
      subject: m.subject,
      htmlContent: m.html,
      textContent: m.text,
    }),
  });
}

/* ---------- Contenu de l'email reçu ---------- */
function leadHtml(d) {
  return '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#141416;">'
    + '<div style="background:#0b0b0c;color:#c9f24d;font-weight:800;font-size:22px;padding:20px 24px;border-radius:12px 12px 0 0;">Linked<span style="color:#f4f2ec;">IA</span></div>'
    + '<div style="border:1px solid #e5e5e0;border-top:none;border-radius:0 0 12px 12px;padding:24px;">'
    + '<p style="margin:0 0 18px;font-size:15px;color:#57564f;">Nouvelle demande via le site :</p>'
    + row('Nom', esc(d.name))
    + row('Email', '<a href="mailto:' + esc(d.email) + '" style="color:#0b0b0c;">' + esc(d.email) + '</a>')
    + row('Projet', esc(d.type))
    + (d.msg ? '<div style="margin-top:16px;"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7c7a72;margin-bottom:6px;">Message</div>'
        + '<div style="background:#f6f6f2;border-radius:10px;padding:14px 16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">' + esc(d.msg) + '</div></div>' : '')
    + '<p style="margin:22px 0 0;font-size:13px;color:#7c7a72;">Réponds directement à cet email pour recontacter le prospect.</p>'
    + '</div></div>';
}
function row(k, v) {
  return '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #eee;">'
    + '<span style="min-width:80px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7c7a72;padding-top:2px;">' + k + '</span>'
    + '<span style="font-size:15px;color:#141416;">' + v + '</span></div>';
}
function leadText(d) {
  return 'Nouvelle demande via le site LinkedIA\n\n'
    + 'Nom : ' + d.name + '\n'
    + 'Email : ' + d.email + '\n'
    + 'Projet : ' + d.type + '\n\n'
    + 'Message :\n' + (d.msg || '(vide)') + '\n\n'
    + 'Réponds directement à cet email pour recontacter le prospect.';
}

/* ---------- Accusé de réception au prospect ---------- */
function ackHtml(d) {
  return '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#141416;">'
    + '<div style="background:#0b0b0c;color:#c9f24d;font-weight:800;font-size:22px;padding:20px 24px;border-radius:12px 12px 0 0;">Linked<span style="color:#f4f2ec;">IA</span></div>'
    + '<div style="border:1px solid #e5e5e0;border-top:none;border-radius:0 0 12px 12px;padding:24px;font-size:15px;line-height:1.65;">'
    + '<p style="margin:0 0 14px;">Bonjour ' + esc(d.name) + ',</p>'
    + '<p style="margin:0 0 14px;">Merci pour ton message — je l\'ai bien reçu. Je reviens vers toi sous 24h pour caler un premier échange, gratuit et sans engagement.</p>'
    + '<p style="margin:0 0 14px;">À très vite,<br>Jeremy · LinkedIA</p>'
    + '</div></div>';
}
function ackText(d) {
  return 'Bonjour ' + d.name + ',\n\n'
    + 'Merci pour ton message — je l\'ai bien reçu. Je reviens vers toi sous 24h pour caler un premier échange, gratuit et sans engagement.\n\n'
    + 'À très vite,\nJeremy · LinkedIA';
}

/* ---------- Utilitaires ---------- */
function clean(v, max) { return typeof v === 'string' ? v.trim().slice(0, max) : ''; }
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function reply(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
async function safeText(r) { try { return (await r.text()).slice(0, 300); } catch (e) { return ''; } }
