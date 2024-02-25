export default function base64ToId(base64: string): string {
  const beginning = base64.substring(
    "data:image/png;base64,".length,
    "data:image/png;base64,".length + 15
  );
  const end = base64.substring(base64.length - 15);

  return `${beginning}${end}`;
}
