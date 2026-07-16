# Brancher le formulaire de contact — LinkedIA

Objectif : quand quelqu'un remplit le formulaire du site, tu reçois la demande
**par email**. C'est 100 % gratuit (Brevo 300 emails/jour + Cloudflare Worker).

Tant que ce n'est pas fait, le formulaire ouvre le logiciel de mail du visiteur
(repli automatique) — donc rien n'est perdu, mais c'est moins pro qu'un vrai envoi.

Il y a **3 étapes**. Compte ~20 min la première fois.

---

## Étape 1 — Brevo (l'outil qui envoie l'email) · ~7 min

1. Va sur **brevo.com** → crée un compte gratuit (ou connecte-toi si tu en as déjà un
   depuis Blade Society — tu peux réutiliser le même).
2. Menu haut-droite (ton nom) → **Expéditeurs, domaines & IP dédiées** → onglet
   **Expéditeurs** → **Ajouter un expéditeur**.
   - Nom : `LinkedIA`
   - Email : `halimjeremy@gmail.com`  ← l'expéditeur
   - Valide : Brevo envoie un mail de confirmation **à halimjeremy@gmail.com** →
     ouvre cette boîte et clique le lien dedans.
3. Récupère ta **clé API** : menu **SMTP & API** (ou "Clés API") → **Générer une nouvelle clé**.
   - Copie-la de suite (elle commence par `xkeysib-…`) et garde-la de côté.
   - ⚠️ Ne la mets JAMAIS dans le site : elle reste secrète, uniquement dans Cloudflare (étape 2).

---

## Étape 2 — Cloudflare (le petit serveur gratuit) · ~10 min

1. Va sur **dash.cloudflare.com** → connecte-toi (compte `Halimjeremy@gmail.com`).
2. Menu gauche → **Workers & Pages** → **Create** → **Create Worker**.
3. Donne un nom, ex : `linkedia-contact` → **Deploy** (déploie la version par défaut).
4. Clique **Edit code**. Efface tout le contenu, et **colle** le contenu du fichier
   `cloudflare-worker.js` (dans ce dossier). → **Deploy** en haut à droite.
5. Reviens sur le Worker → onglet **Settings** → **Variables and Secrets** →
   ajoute ces **3 variables** (bouton *Add*) :

   | Nom             | Type              | Valeur                                   |
   |-----------------|-------------------|------------------------------------------|
   | `BREVO_API_KEY` | **Secret** (Encrypt) | ta clé Brevo `xkeysib-…` (étape 1.3)  |
   | `SENDER_EMAIL`  | Texte (Plaintext) | `halimjeremy@gmail.com` (l'expéditeur vérifié) |
   | `TO_EMAIL`      | Texte (Plaintext) | `Jeremyhproo@gmail.com` (où tu reçois les demandes) |

   (Optionnel : `AUTO_REPLY` = `1` pour qu'un accusé de réception automatique
   parte aussi au prospect. `SENDER_NAME` = `LinkedIA` pour le nom affiché.)

6. **Deploy** / **Save** pour valider les variables.
7. Copie l'**URL du Worker** — elle ressemble à :
   `https://linkedia-contact.halimjeremy.workers.dev`
   (visible en haut de la page du Worker).

---

## Étape 3 — Relier le site au Worker · ~1 min

1. Ouvre `index.html` (dans ce dossier).
2. Cherche la ligne (tout en haut du `<script>`, vers le début) :

   ```js
   var CONTACT_ENDPOINT = '';
   ```

3. Colle ton URL entre les guillemets :

   ```js
   var CONTACT_ENDPOINT = 'https://linkedia-contact.halimjeremy.workers.dev';
   ```

4. Enregistre. Envoie le site en ligne (push GitHub Desktop, comme les autres).

---

## Tester

Ouvre le site, remplis le formulaire, envoie. Tu dois recevoir la demande sur
`Jeremyhproo@gmail.com` en quelques secondes.
- Rien reçu ? Regarde d'abord dans les **spams** (normal les premières fois avec
  une adresse Gmail — ça se règle plus tard en ajoutant un vrai domaine).
- Message d'erreur rouge sous le formulaire ? Revérifie les 3 variables Cloudflare
  (fautes de frappe, clé Brevo bien collée en entier).

Plus tard, quand tu auras un domaine (ex : `linkedia.fr`), on pourra l'utiliser
comme expéditeur pour une délivrabilité parfaite (0 spam) — même méthode.
