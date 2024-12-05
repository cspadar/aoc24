import { readFile } from 'fs/promises';

const input = await readFile('input.txt', 'utf8');
const lines = input.split('\n');

const rules = lines.filter((l) => l.includes('|')).map((r) => r.split('|'));
const updates = lines.filter((l) => l.includes(',')).map((u) => u.split(','));

let part1Total = 0;
let part2Total = 0;

const hasUpdateError = (update) =>
  rules.some((rule) => {
    const [x, y] = rule;
    const xIndex = update.indexOf(x);
    const yIndex = update.indexOf(y);
    // both found and Y is "earlier" in update --> error
    return yIndex > -1 && xIndex > yIndex;
  });

for (const update of updates) {
  if (!hasUpdateError(update)) {
    const middle = update[Math.round(update.length / 2) - 1];
    part1Total += Number(middle);
  }
}

console.log('Part 1 solution: ', part1Total);