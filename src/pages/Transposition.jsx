import { useState } from "react";
import ColumnarTransEncode from "../cipherjsx/ColumnarTransEncode";
import ColumnarTransDecode from "../cipherjsx/ColumnarTransDecode";
import ResultBox from "../components/ResultBox";
import saveHistory from "../history/SaveHistory";

export default function ColumnarCipher() {
  const [plain, setPlain] = useState("");
  const [key, setKey] = useState("");
  const [process, setProcess] = useState("");
  const [gridData, setGridData] = useState(null); // Store grid data for visualization

  const handleEncode = () => {
    if (!plain || !key) {
      setProcess("Masukan Key dan Plain");
      setGridData(null);
      return;
    }

    // Get the result and grid data
    const { result, grid, colOrder } = ColumnarTransEncode(plain, key);
    setProcess(result);
    setGridData({ grid, colOrder, keyword: key.toUpperCase() });

    const record = saveHistory({
      cipherType: "Columnar Transposition Cipher",
      plainText: plain,
      key: `Keyword: ${key}`,
      result: result,
      mode: "Encode",
    });
  };

  const handleDecode = () => {
    if (!plain || !key) {
      setProcess(" Please enter both text and key");
      setGridData(null);
      return;
    }
    const result = ColumnarTransDecode(plain, key);
    setProcess(result);
    setGridData(null); // Clear grid on decode

    const record = saveHistory({
      cipherType: "Columnar Transposition Cipher",
      plainText: plain,
      key: `Keyword: ${key}`,
      result: result,
      mode: "Decode",
    });
  };

  const handleClear = () => {
    setPlain("");
    setKey("");
    setProcess("");
    setGridData(null);
  };

  // Render the grid visualization
  const renderGrid = () => {
    if (!gridData) return null;

    const { grid, colOrder, keyword } = gridData;
    const rows = grid.length;
    const cols = grid[0]?.length || 0;

    // Get column order for display
    const colOrderDisplay = colOrder.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Sort columns by their position for display
    const sortedCols = [...colOrderDisplay].sort((a, b) => a.index - b.index);

    return (
      <div className="mt-4 p-4 bg-gray-700 rounded-lg overflow-x-auto">
        {/* Column Order Display */}
        <div className="mb-3">
          <p className="text-gray-300 text-sm mb-2">
            Column Order (based on keyword):
          </p>
          <div className="flex flex-wrap gap-2">
            {colOrderDisplay.map((item) => (
              <span
                key={item.index}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-mono"
              >
                Col {item.index + 1} → Order {item.order}
              </span>
            ))}
          </div>
        </div>

        {/* Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header Row - Keyword */}
            <thead>
              <tr>
                <th className="bg-gray-700 text-white px-3 py-2 border border-gray-700"></th>
                {keyword.split("").map((char, idx) => (
                  <th
                    key={idx}
                    className="bg-gray-600 text-white px-3 py-2 border border-gray-500 text-center font-bold"
                  >
                    {char}
                    <br />
                    <span className="text-xs font-normal text-gray-300">
                      #{idx + 1}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Grid Body */}
            <tbody>
              {grid.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="bg-gray-600 text-white px-3 py-2 border border-gray-500 text-center font-bold">
                    {rowIdx + 1}
                  </td>
                  {row.map((char, colIdx) => {
                    // Check if this cell is in the highlighted column order
                    const colOrderItem = colOrder.find(
                      (item) => item.index === colIdx,
                    );
                    const orderNumber = colOrderItem ? colOrderItem.order : 0;
                    const isPadding =
                      char === "X" &&
                      rowIdx === grid.length - 1 &&
                      row.slice(colIdx + 1).every((c) => c === "X");

                    return (
                      <td
                        key={colIdx}
                        className={`px-3 py-2 border border-gray-500 text-center font-mono text-lg
                          ${isPadding ? "bg-gray-500 text-gray-400" : "bg-gray-800 text-white"}
                          ${char !== "" ? "hover:bg-gray-600 transition" : ""}
                        `}
                        title={
                          char !== ""
                            ? `Col ${colIdx + 1}, Row ${rowIdx + 1}`
                            : "Empty"
                        }
                      >
                        {char || " "}
                        {orderNumber > 0 && (
                          <span className="block text-xs text-blue-400">
                            ↓{orderNumber}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="flex justify-center h-screen">
          <div className="bg-gray-200 p-5 w-3/5 shadow-xl shadow-gra-50/50 text-gray-900 px-6">
          <div className="p-2">
            <h1 className="text-center text-4xl bold">Columnar Transposition Cipher</h1>
            <p className="py-6">Columnar Transposition Cipher adalah metode kriptografi klasik yang mengenkripsi pesan dengan cara mengubah posisi huruf (transposisi) tanpa mengubah bentuk huruf aslinya. Pesan ditulis ke dalam baris-baris pada sebuah tabel (grid), lalu dibaca menurun berdasarkan kolom yang diatur oleh sebuah kata kunci (keyword).</p>
          </div>

            <div className="">
              <input
                type="text"
                placeholder="Enter text"
                value={plain}
                onChange={(e) => setPlain(e.target.value)}
                className="bg-gray-600 m-4 p-2 border rounded-lg w-4/5 text-white"
              />
              <input
                type="text"
                placeholder="Enter Keyword"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-gray-600 m-4 p-2 border rounded-lg w-4/5 text-white"
              />
            </div>

            <div className="flex">
              <button
                onClick={handleEncode}
                className="bg-gray-600 border-gray-700 border-1 text-white rounded-l-xl transition-all: delay-100 duration-250 hover:bg-gray-300 hover:text-black w-2/4 py-4"
              >
                Encrypt
              </button>
              <button
                onClick={handleDecode}
                className="bg-gray-600 border-gray-700 border-1 text-white rounded-r-xl transition-all: delay-100 duration-250 hover:bg-gray-300 hover:text-black w-2/4 py-4"
              >
                Decrypt
              </button>
            </div>
            {renderGrid()}
            <ResultBox result={process} />
          </div>
        </div>
      </div>
    </>
  );
}
