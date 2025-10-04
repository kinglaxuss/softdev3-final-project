export const getNotes = async () => {
  const res = await fetch("http://localhost:5000/api/notes");
  const data = await res.json();
  return data;
};
