// components/ResultBox.jsx
export default function ResultBox({ result }) {
  return (
    <div className="mt-4 p-4 bg-gray-600 border border-black rounded-lg">
      <h3 className="font-bold text-gray-200 mb-2">Result:</h3>
      <p className="font-mono text-lg text-gray-200 break-all">
        {result || ""}
      </p>
    </div>
  );
}
