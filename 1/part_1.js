import fs from 'fs';

fs.readFile('input.txt', 'utf8', (_err, data) => {
  const leftArray = [];
  const rightArray = [];

  const lines = data.split('\n');

  for (const line of lines) {
    if (line === '') continue;
    const [left, right] = line.trim().split(/\s+/).map(Number);
    leftArray.push(left);
    rightArray.push(right);
  }

  leftArray.sort();
  rightArray.sort();

  const totalDistance = leftArray.reduce(
    (sum, currentValue, index) => sum + Math.abs(currentValue - rightArray[index]),
    0
  );

  console.log(`Total distance: ${totalDistance}`);
});