export default function ColumnarTransDecode(ciphertext, keyword) {
  if (!ciphertext || !keyword) return '';
  
  // Remove spaces and convert to uppercase
  const text = ciphertext.replace(/\s/g, '').toUpperCase();
  const key = keyword.toUpperCase();
  
  const cols = key.length;
  const rows = Math.ceil(text.length / cols);
  
  // Pad text if needed
  let paddedText = text;
  const padding = rows * cols - text.length;
  for (let i = 0; i < padding; i++) {
    paddedText += 'X';
  }
  
  // Get column order based on keyword
  const colOrder = key.split('').map((char, index) => ({
    char: char,
    index: index
  }));
  colOrder.sort((a, b) => a.char.localeCompare(b.char));
  
  // Create grid and fill columns in order
  const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
  let idx = 0;
  
  for (const item of colOrder) {
    for (let row = 0; row < rows; row++) {
      if (idx < paddedText.length) {
        grid[row][item.index] = paddedText[idx++];
      }
    }
  }
  
  // Read row by row
  let result = '';
  for (let row = 0; row < rows; row++) {
    result += grid[row].join('');
  }
  
  return result;
}