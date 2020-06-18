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
    let sum = 0;
    const temp = num[i];
    for (let j = 1; j <= temp; j += 1) {
      if (temp % j === 0) {
        sum += 1;
      }
    }
    if (temp === 1 || sum > 2) {
      console.log('Composite');
    } else {
      console.log('Prime');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
