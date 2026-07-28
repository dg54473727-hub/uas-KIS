import { useState } from "react";
import CaesarEncode from "../cipherjsx/CeasarEncode";
import CaesarDecode from "../cipherjsx/CaesarDecode";
import ResultBox from "../components/ResultBox";
import saveHistory from "../history/SaveHistory";

export default function Caesar() {
  const [plain, setInput] = useState("");
  const [key, setKey] = useState("0");
  const [process, setProcess] = useState("");

  const handleEncode = () => {
    if (!plain || !key) {
      setProcess("Masukan Key dan Plaintext");
      return;
    }
    const result = CaesarEncode(plain, key);
    setProcess(result);
    const record = saveHistory({
      cipherType: "Caesar Cipher",
      plainText: plain,
      key: `Shift: ${key}`,
      result: result,
      mode: "Encode",
    });
  };

  const handleDecode = () => {
    if (!plain || !key) {
      setProcess("Masukan Key dan Cipertext");
      return;
    }
    const result = CaesarDecode(plain, key);
    setProcess(result);
    const record = saveHistory({
      cipherType: "Caesar Cipher",
      plainText: plain,
      key: `Shift: ${key}`,
      result: result,
      mode: "Decode",
    });
  };
  return (
    <>
      <div>
        <div className="flex justify-center h-screen">
          <div className="bg-gray-800 p-5 w-3/5 shadow-xl shadow-gray-700/50 text-gray-50 px-6">
            <div className="p-2">
              <h1 className="text-center text-4xl bold">
                Caesar Cipher
              </h1>
              <p className="py-6">
                Caesar cipher adalah teknik enkripsi klasik yang menggantikan
                setiap huruf dalam pesan asli (plaintext) dengan huruf lain yang
                digeser sejauh angka tetap (kunci) di dalam susunan abjad.
                Dinamai dari Julius Caesar, metode ini adalah bentuk awal dari
                sandi substitusi.
              </p>
            </div>
            <div className="">
              {" "}
              <input
                type="text"
                placeholder="Enter text"
                value={plain}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-600 m-4 p-2 border rounded-lg w-4/5 text-white"
              />
              <input
                type="number"
                placeholder="0"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-gray-600 m-4 p-2 border rounded-md text-gray-50"
                min="1"
                max="25"
              />
            </div>
            <div>
              <button
                onClick={handleEncode}
                className="bg-gray-800 border-gray-700 border-1 text-white transition-all: delay-100 duration-250 hover:bg-gray-300 hover:text-black w-2/4 py-4"
              >
                Encode
              </button>
              <button
                onClick={handleDecode}
                className="bg-gray-800 border-gray-700 border-1 text-white transition-all: delay-100 duration-250 hover:bg-gray-300 hover:text-black w-2/4 py-4"
              >
                Decode
              </button>
            </div>
            <ResultBox result={process} />
          </div>
        </div>
      </div>
    </>
  );
}
