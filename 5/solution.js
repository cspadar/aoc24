import { readFile } from 'fs/promises';

const input = await readFile('input.txt', 'utf8');
const lines = input.split('\n');

const rules = lines.filter((l) => l.includes('|')).map((r) => r.split('|'));
const updates = lines.filter((l) => l.includes(',')).map((u) => u.split(','));

let part1Total = 0;
let part2Total = 0;

const reorderUpdate = (oldUpdate) => {
  const reorderedUpdate = [];

  for (const oldItem of oldUpdate) {
    const relevantRules = rules.filter((r) => r[0] === oldItem);
    const relevantNewItems = reorderedUpdate.filter((newEl) => relevantRules.map((rr) => rr[1]).includes(newEl));
    if (relevantNewItems.length) {
      // Insert it before the "earliest" relevant element
      const smallestIndex = reorderedUpdate.findIndex((n) => relevantNewItems.includes(n));
      reorderedUpdate.splice(smallestIndex, 0, oldItem);
    } else {
      // No relevant items
      reorderedUpdate.push(oldItem);
    }
  }

  return reorderedUpdate;
};

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
  } else {
    const reorderedUpdate = reorderUpdate(update);
    const middle = reorderedUpdate[Math.round(update.length / 2) - 1];
    part2Total += Number(middle);
  }
}

console.log('Part 1 solution: ', part1Total);
console.log('Part 2 solution: ', part2Total);
