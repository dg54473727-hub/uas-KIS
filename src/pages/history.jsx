// pages/History.jsx

import { useState, useEffect } from "react";
import {
  getHistory,
  deleteHistoryRecord,
  clearAllHistory,
  exportHistoryAsJSON,
  importHistoryFromFile,
} from "../history/HistoryManager";

export default function History() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [message, setMessage] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getHistory();
    setHistory(data);
  };

  const filteredHistory = history.filter((record) => {
    const matchesSearch =
      record.plainText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.result?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.cipherType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || record.cipherType === filterType;

    return matchesSearch && matchesType;
  });

  const cipherTypes = ["all", ...new Set(history.map((r) => r.cipherType))];

  const handleDelete = (id) => {
    if (window.confirm("Delete this record?")) {
      deleteHistoryRecord(id);
      loadHistory();
      setMessage("deleted");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Delete ALL history? This cannot be undone!")) {
      clearAllHistory();
      loadHistory();
      setMessage("history cleared");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleExport = () => {
    exportHistoryAsJSON();
    setMessage("success");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await importHistoryFromFile(file);
      loadHistory();
      setMessage("📤 History imported successfully");
      setTimeout(() => setMessage(""), 2000);
      setShowImportModal(false);
    } catch (error) {
      setMessage(`❌ Import failed: ${error.message}`);
      setTimeout(() => setMessage(""), 3000);
    }
    event.target.value = "";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage("📋 Copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="flex justify-center h-max">
      <div className="bg-gray-800 p-5 w-4/5 rounded-b-xl shadow-xl shadow-gray-700/50">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white text-center">Cipher History</h1>
            <p className="text-gray-400">{history.length} records saved</p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-4 p-3 bg-gray-700 text-green-400 rounded border border-gray-600">
            {message}
          </div>
        )}

        {/* Controls */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by text, result, or cipher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-48">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:border-blue-500"
              >
                {cipherTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
              >
                Export JSON
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
              >
              Import JSON
              </button>
              {history.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                >
                Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
Import History
              </h3>
              <p className="text-gray-300 mb-4">
                Select a JSON file to import history records.
              </p>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
              />
              <button
                onClick={() => setShowImportModal(false)}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* History Table */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 bg-gray-700 rounded-lg">
            <p className="text-gray-300 text-lg">No history records found</p>
            <p className="text-gray-500">
              Start encrypting/decrypting to save records
            </p>
          </div>
        ) : (
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-600 border-b border-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Cipher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Plain Text
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {filteredHistory.map((record, index) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-600 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-semibold">
                          {record.cipherType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-300 max-w-[150px] truncate">
                        {record.plainText}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-300">
                        {record.key}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-green-400 max-w-[150px] truncate">
                        {record.result}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.mode === "Encode"
                              ? "bg-green-900 text-green-300"
                              : "bg-purple-900 text-purple-300"
                          }`}
                        >
                          {record.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {record.formattedDate ||
                          new Date(record.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 bg-gray-600 border-t border-gray-500 flex justify-between text-sm text-gray-400">
              <span>
                Showing {filteredHistory.length} of {history.length} records
              </span>
              <button
                onClick={handleExport}
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Export all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
