export default function slugify(text: string) {
  return text
    .trim()
    .replace(/ +/g, "-")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/png|jpe?g/g, "");
}
