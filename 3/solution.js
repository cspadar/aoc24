import { readFile } from 'fs/promises';

// Provided by ChatGPT, NGL :-)
const REGEX_PATTERN = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;

const COMMAND_ENABLE = `do()`;
const COMMAND_DISABLE = `don't()`;

const input = await readFile('input.txt', 'utf8');

const instructions = input.match(REGEX_PATTERN);

let total = 0;
let shouldMultiply = true;

instructions.forEach((instruction) => {
  if ([COMMAND_ENABLE, COMMAND_DISABLE].includes(instruction)) {
    shouldMultiply = instruction === COMMAND_ENABLE;
    return;
  }

  // multiply instruction
  if (shouldMultiply) {
    const parameters = instruction.substring(4, instruction.length - 1);
    const [x, y] = parameters.split(',').map(Number);
    total += x * y;
  }
});

console.log(`Result of the multiplications: ${total}`);