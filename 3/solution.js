import { readFile } from 'fs/promises';

const REGEX_PATTERN = /mul\(\d+,\d+\)/g; // Provided by ChatGPT, NGL :-)

const input = await readFile('input.txt', 'utf8');

const mulInstructions = input.match(REGEX_PATTERN);
const mulParameters = mulInstructions.map((ins) => ins.substring(4, ins.length - 1));

let total = 0;

mulParameters.forEach((parameter) => {
  const [x, y] = parameter.split(',').map(Number);
  total += x * y;
});

console.log(`Result of the multiplications: ${total}`);