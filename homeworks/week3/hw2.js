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
  const line = input[0];
  const arr = line.split(' ');
  for (let i = Number(arr[0]); i <= Number(arr[1]); i += 1) {
    let sum = 0;
    const I = i.toString();
    for (let j = 0; j < I.length; j += 1) {
      sum += I[j] ** I.length;
    }
    if (sum === i) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
