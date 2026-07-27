import UpCase from "./UpCase";

export default function CaesarEncode(plain, key) {
  key = key % 26;
  const text = UpCase(plain);
  return text
    .split("")
    .map((cipher) => {
      const code = cipher.charCodeAt(0);
      cipher = String.fromCharCode(((code - 65 + key + 26) % 26) + 65);
      console.log(cipher);
      return cipher;
    })
    .join("");
}
