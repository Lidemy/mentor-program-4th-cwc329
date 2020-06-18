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
  const temparr = input[0].split(' ');
  const n = Number(temparr[0]);
  const w = Number(temparr[1]);
  const T = [];
  for (let i = 1; i <= n; i += 1) {
    T.push(input[i].split(' ').map(Number));
  }
  const COMB = [];
  for (let i = 0; i <= n; i += 1) {
    COMB.push(Array(w + 1).fill(0));
  }
  for (let i = 0; i < T.length; i += 1) {
    const iw = T[i][0];
    const iv = T[i][1];
    for (let j = 1; j <= w; j += 1) {
      if (j < iw) {
        COMB[i + 1][j] = COMB[i][j];
      }
      if (j >= iw) {
        const nv = iv + COMB[i][j - iw];
        if (nv > COMB[i][j]) {
          COMB[i + 1][j] = nv;
        } else {
          COMB[i + 1][j] = COMB[i][j];
        }
      }
    }
  }
  console.log(COMB[n][w]);
}

rl.on('close', () => {
  solve(lines);
});
