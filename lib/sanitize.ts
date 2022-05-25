export default function sanitize(string: string) {
    return string.replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();
} 