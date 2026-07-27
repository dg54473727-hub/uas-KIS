import UpCase from "./UpCase";

export default function AtbashEncode(plain){
    const text=UpCase(plain);
    return text.split("").map(cipher =>{
        const code = cipher.charCodeAt(0);
        cipher = String.fromCharCode(90 - (code - 65));
        return cipher;
    }).join("");
}