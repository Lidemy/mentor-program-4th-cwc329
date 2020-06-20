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
  const arr = [];
  for (let i = 1; i < input.length; i += 1) {
    arr.push(input[i].split(' '));
  }
  for (let i = 0; i < arr.length; i += 1) {
    const a = arr[i][0];
    const b = arr[i][1];
    const k = Number(arr[i][2]);
    if (a === b) {
      console.log('DRAW');
    } else if (k === 1) {
      if ((a.length > b.length) || (a.length === b.length && a > b)) {
        console.log('A');
      } else {
        console.log('B');
      }
    } else if (k === -1) {
      if ((a.length < b.length) || (a.length === b.length && a < b)) {
        console.log('A');
      } else {
        console.log('B');
      }
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
