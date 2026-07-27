export default function ColumnarTransEncode(plaintext, keyword) {
  if (!plaintext || !keyword) return { result: "", grid: [], colOrder: [] };

  // Remove spaces and convert to uppercase
  const text = plaintext.replace(/\s/g, "").toUpperCase();
  const key = keyword.toUpperCase();

  const cols = key.length;
  const rows = Math.ceil(text.length / cols);

  // Pad text if needed
  let paddedText = text;
  const padding = rows * cols - text.length;
  for (let i = 0; i < padding; i++) {
    paddedText += "X";
  }

  // Create grid
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(paddedText.slice(i * cols, (i + 1) * cols).split(""));
  }

  // Get column order based on keyword
  const colOrder = key.split("").map((char, index) => ({
    char: char,
    index: index,
  }));
  colOrder.sort((a, b) => a.char.localeCompare(b.char));

  // Read columns in order
  let result = "";
  for (const item of colOrder) {
    for (let row = 0; row < rows; row++) {
      result += grid[row][item.index];
    }
  }

  return { result, grid, colOrder };
}