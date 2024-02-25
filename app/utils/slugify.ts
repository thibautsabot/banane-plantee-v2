export default function slugify(text: string) {
  return text
    .trim()
    .replace(/ +/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/png|jpe?g/g, "");
}
