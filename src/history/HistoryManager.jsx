// history/HistoryManager.js

const STORAGE_KEY = 'cipher_history';

/**
 * Get all history records
 * @returns {Array} Array of history records
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

/**
 * Save a new cipher record to history
 * @param {Object} record - The record to save
 * @param {string} record.cipherType - Type of cipher (Caesar, Atbash, etc.)
 * @param {string} record.plainText - Original text
 * @param {string} record.key - Key used (shift value, keyword, etc.)
 * @param {string} record.result - Encrypted/decrypted result
 * @param {string} record.mode - 'Encode' or 'Decode'
 * @returns {Object} The saved record with id and timestamp
 */
export function saveToHistory({ cipherType, plainText, key, result, mode }) {
  const history = getHistory();
  
  const newRecord = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    cipherType,
    plainText,
    key: key || 'N/A',
    result,
    mode,
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString()
  };
  
  history.unshift(newRecord); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  
  return newRecord;
}

/**
 * Delete a record by id
 * @param {string} id - Record id to delete
 */
export function deleteHistoryRecord(id) {
  const history = getHistory();
  const filtered = history.filter(record => record.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Clear all history
 */
export function clearAllHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export history as JSON file
 * @param {string} filename - Optional custom filename
 */
export function exportHistoryAsJSON(filename = null) {
  const history = getHistory();
  
  if (history.length === 0) {
    alert('No history to export!');
    return;
  }
  
  // Create JSON data with metadata
  const exportData = {
    exportedAt: new Date().toISOString(),
    totalRecords: history.length,
    records: history
  };
  
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  
  // Generate filename
  if (!filename) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    filename = `cipher_history_${date}_${time}.json`;
  }
  
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import history from JSON file
 * @param {File} file - The JSON file to import
 * @returns {Promise} Promise that resolves when import is complete
 */
export function importHistoryFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Handle both old and new format
        let records = [];
        if (Array.isArray(importedData)) {
          records = importedData;
        } else if (importedData.records && Array.isArray(importedData.records)) {
          records = importedData.records;
        } else {
          reject(new Error('Invalid data format: Expected array or {records: []}'));
          return;
        }
        
        const currentHistory = getHistory();
        const merged = [...records, ...currentHistory];
        
        // Remove duplicates by id
        const unique = merged.filter((record, index, self) => 
          index === self.findIndex(r => r.id === record.id)
        );
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
        resolve(unique);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * Get history statistics
 * @returns {Object} Statistics about the history
 */
export function getHistoryStats() {
  const history = getHistory();
  const stats = {
    total: history.length,
    byCipher: {},
    byMode: {},
    oldest: null,
    newest: null
  };
  
  if (history.length === 0) return stats;
  
  history.forEach(record => {
    // Count by cipher type
    stats.byCipher[record.cipherType] = (stats.byCipher[record.cipherType] || 0) + 1;
    // Count by mode
    stats.byMode[record.mode] = (stats.byMode[record.mode] || 0) + 1;
  });
  
  stats.oldest = history[history.length - 1];
  stats.newest = history[0];
  
  return stats;
}

export default {
  getHistory,
  saveToHistory,
  deleteHistoryRecord,
  clearAllHistory,
  exportHistoryAsJSON,
  importHistoryFromFile,
  getHistoryStats
};