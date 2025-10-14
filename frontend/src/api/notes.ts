const BASE_URL = "http://localhost:5000/api/notes";

export type NoteDto = {
  id: number;
  content: string;
  color: "gold" | "skyblue" | "pink" | "lightgreen";
};

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export const getNotes = async (): Promise<NoteDto[]> => {
  const res = await fetch(BASE_URL);
  return handleRes(res);
};

export const createNote = async (payload: { content: string; color: NoteDto["color"] }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
};

export const updateNote = async (id: number, payload: { content?: string; color?: NoteDto["color"] }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
};

export const deleteNote = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleRes(res);
};
