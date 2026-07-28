import { useState } from "react";

import ResultBox from "../components/ResultBox";
import AtbashEncode from "../cipherjsx/AtbashEncode";
import AtbashDecode from "../cipherjsx/AtbashDecode";
import saveHistory from "../history/SaveHistory";

export default function Atbash() {
  const [plain, setInput] = useState("");
  const [process, setProcess] = useState("");

  const handleEncode = () => {
    if (!plain) {
      setProcess("Masukan Plaintext");
      return;
    }
    const result = AtbashEncode(plain);
    setProcess(result);
      saveHistory({
    cipherType: "Atbash Cipher",
    plainText: plain,
    key: "N/A (Self-inverse)",
    result: result,
    mode: "Encode",
  });
  };


  return (
    <>
      <div>
        <div className="flex justify-center h-screen">
          <div className="bg-gray-800 p-5 w-3/5 shadow-xl shadow-gray-700/50 text-gray-50 px-6">
          <div className="p-2">
            <h1 className="text-center text-4xl bold">Atbash Cipher</h1>
            <p className="py-6">Sandi Atbash (Atbash cipher) adalah metode sandi substitusi kuno yang bekerja dengan cara membalik urutan abjad dari belakang ke depan (huruf pertama diganti huruf terakhir, huruf kedua diganti huruf kedua dari belakang, dan seterusnya).</p>
          </div>
            <div className="">
              {" "}
              <input
                type="text"
                placeholder="Enter text"
                value={plain}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-600 m-4 p-2 border rounded-lg w-full text-white mx-2"
              />
            </div>
            <div>
              <button
                onClick={handleEncode}
                className="bg-gray-800 border-gray-700 border-1 text-white transition-all: delay-100 duration-250 hover:bg-gray-300 hover:text-black w-full py-4 rounded-md"
              >
                Encode
              </button>
            </div>
            <ResultBox result={process} />
          </div>
        </div>
      </div>
    </>
  );
}
