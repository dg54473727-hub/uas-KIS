import UpCase from "./UpCase";

export default function CaesarDecode(cipher, key) {
  key = key % 26;
  const text = UpCase(cipher);
  return text
    .split("")
    .map((plain) => {
      const code = plain.charCodeAt(0);
      plain = String.fromCharCode(((code - 65 - key + 26) % 26) + 65);
      console.log(plain);
      return plain;
    })
    .join("");
}
