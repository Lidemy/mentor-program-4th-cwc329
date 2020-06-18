/* eslint linebreak-style: ["error", "windows"] */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const str = input[0];
  for (let i = 0; i < str.length / 2; i += 1) {
    if (str[i] !== str[str.length - 1 - i]) {
      return (console.log('False'));
    }
  }
  return (console.log('True'));
}

rl.on('close', () => {
  solve(lines);
});
