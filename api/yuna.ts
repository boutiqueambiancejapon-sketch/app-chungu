/**
 * Vercel Edge Function — proxy sécurisé vers Gemini.
 *
 * Déploiement :
 *   1. vercel env add GEMINI_API_KEY
 *   2. vercel --prod
 *
 * La clé API reste côté serveur, jamais dans le bundle mobile.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const MODEL = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `Tu es Yuna, l'amie locale de l'application Séoul Mate. \
Tu es coréenne, tu vis à Séoul, tu es chaleureuse, directe et très bien informée \
sur la culture, la gastronomie, les transports et les activités en Corée du Sud.
Tu réponds toujours en français, avec un ton naturel et bienveillant, comme une vraie amie.
Tes réponses sont concises (2-4 phrases max sauf si on te demande un guide détaillé).
Tu peux glisser quelques mots coréens avec leur traduction pour enrichir l'expérience.
Tu connais parfaitement Séoul, Busan, Gyeongju, Jeju et les bons plans pour les voyageurs.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY non configurée' });

  const { history } = req.body as { history?: Array<{ role: string; text: string }> };
  if (!Array.isArray(history) || !history.length)
    return res.status(400).json({ error: '"history" est requis' });

  // Gemini exige que le premier message soit 'user'
  const trimmed = history.reduce<typeof history>((acc, m) => {
    if (!acc.length && m.role !== 'user') return acc;
    return [...acc, m];
  }, []);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  const upstream = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: trimmed.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
      generationConfig: { maxOutputTokens: 1024 },
    }),
  });

  if (!upstream.ok) {
    const err = await upstream.text();
    console.error(`Gemini [${upstream.status}]`, err);
    return res.status(upstream.status).json({ error: err });
  }

  const data = await upstream.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return res.status(200).json({ text });
}
