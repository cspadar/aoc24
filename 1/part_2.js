import fs from 'fs';

fs.readFile('input.txt', 'utf8', (_err, data) => {
  const leftArray = [];
  const rightMap = new Map();

  const lines = data.split('\n');

  for (const line of lines) {
    if (line === '') continue;
    const [left, right] = line.trim().split(/\s+/).map(Number);
    leftArray.push(left);
    rightMap.set(right, (rightMap.get(right) || 0) + 1);
  }

  const simScore = leftArray.reduce(
    (acc, currentValue) => acc + currentValue * (rightMap.get(currentValue) || 0),
    0
  );

  console.log(`Similarity score: ${simScore}`);
});