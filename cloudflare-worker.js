/*
  LinkedIA — Worker Cloudflare pour le formulaire de contact.

  VERSION ACTUELLE : relais via Web3Forms (gratuit, fiable, sans domaine).
  Web3Forms envoie l'email depuis son propre domaine authentifié → Gmail le livre
  en boîte de réception (contrairement à un envoi « depuis » une adresse @gmail.com).

  ─────────────────────────────────────────────────────────────────────────────
  VARIABLE À CONFIGURER dans Cloudflare (Settings › Variables and Secrets) :

    WEB3FORMS_KEY  (Secret)  = ta clé d'accès Web3Forms (Access Key)
                               → obtenue sur https://web3forms.com en indiquant
                                 l'adresse où tu veux RECEVOIR les demandes
                                 (ici : jeremyhproo@gmail.com)

  Les anciennes variables Brevo (BREVO_API_KEY / SENDER_EMAIL / TO_EMAIL) ne sont
  plus utilisées par cette version — tu peux les laisser, elles sont ignorées.
  On y reviendra quand tu auras un domaine (envoi pro via Brevo).
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
    if (!env.WEB3FORMS_KEY) return reply({ error: 'service non configuré' }, 503, cors);

    // Relais vers Web3Forms, qui envoie l'email dans ta boîte.
    let res;
    try {
      res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_KEY,
          subject: 'Nouvelle demande — ' + name + ' (' + type + ')',
          from_name: 'Formulaire LinkedIA',
          replyto: email,               // "Répondre à" = le prospect → tu réponds direct
          Nom: name,
          Email: email,
          Projet: type,
          Message: msg || '(vide)',
        }),
      });
    } catch (e) {
      return reply({ error: 'envoi impossible' }, 502, cors);
    }

    let data = {};
    try { data = await res.json(); } catch (e) {}
    if (!res.ok || !data.success) {
      return reply({ error: 'envoi refusé', detail: (data && data.message) || ('http ' + res.status) }, 502, cors);
    }

    return reply({ ok: true }, 200, cors);
  },
};

/* ---------- Utilitaires ---------- */
function clean(v, max) { return typeof v === 'string' ? v.trim().slice(0, max) : ''; }
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function reply(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
