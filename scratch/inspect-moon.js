const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/moon.png');

try {
  const buffer = fs.readFileSync(filePath);
  // PNG dimensions are at offset 16 (width) and 20 (height) in big-endian 32-bit integers
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  console.log(`Dimensions: ${width}x${height}`);
} catch (err) {
  console.error('Error reading file:', err);
}
