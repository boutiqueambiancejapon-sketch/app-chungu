/**
 * Service Yuna — proxy vers notre Edge Function Vercel.
 * La clé Gemini n'est JAMAIS exposée côté client.
 */

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const API_URL =
  (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export async function sendToYuna(history: ChatMessage[]): Promise<string> {
  const res = await fetch(`${API_URL}/api/yuna`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Erreur API [${res.status}]: ${txt}`);
  }

  const data = (await res.json()) as { text: string };
  return data.text;
}
