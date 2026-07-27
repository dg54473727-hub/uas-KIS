export default function UpCase(text) {
  const result = String(text)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  return result;
}
