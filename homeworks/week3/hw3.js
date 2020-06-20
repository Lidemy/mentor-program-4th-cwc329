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
  const num = [];
  for (let i = 1; i < input.length; i += 1) {
    num.push(Number(input[i]));
  }
  for (let i = 0; i < num.length; i += 1) {
    const temp = num[i];
    let isP = true;
    if (temp === 1) {
      console.log('Composite');
      isP = false;
    }
    for (let j = 2; j <= temp / 2; j += 1) {
      if (temp % j === 0) {
        console.log('Composite');
        isP = false;
        break;
      }
    }
    if (isP === true) {
      console.log('Prime');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
