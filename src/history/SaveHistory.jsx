// history/SaveHistory.js

import { saveToHistory } from './HistoryManager';

/**
 * Save a new cipher record to history
 * @param {Object} record - The record to save
 * @returns {Object} The saved record
 */
export default function saveHistory(record) {
  // Ensure the record has the correct field names
  const formattedRecord = {
    cipherType: record.cipherType,
    plainText: record.plainText || record.text || '',
    key: record.key || 'N/A',
    result: record.result || '',
    mode: record.mode || 'Encode'
  };
  
  return saveToHistory(formattedRecord);
}