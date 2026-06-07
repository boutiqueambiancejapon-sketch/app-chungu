export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface YunaSource {
  title: string;
  url: string;
}

export interface YunaResponse {
  text: string;
  sources: YunaSource[];
}

const API_URL =
  (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export async function sendToYuna(history: ChatMessage[]): Promise<YunaResponse> {
  const res = await fetch(`${API_URL}/api/yuna`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Erreur API [${res.status}]: ${txt}`);
  }

  const data = await res.json();
  return { text: data.text ?? '', sources: data.sources ?? [] };
}
