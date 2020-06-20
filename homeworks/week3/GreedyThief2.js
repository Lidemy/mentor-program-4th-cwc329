/* eslint linebreak-style: ["error", "windows"] */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function MV(N, iv, iw, W) {
  if (N === 0) {
    return 0;
  }
  const itemw = iw[N - 1];
  const itemv = iv[N - 1];
  const bv = MV(N - 1, iv, iw, W);
  if (itemw > W) {
    return bv;
  }
  const nv = itemv + MV(N - 1, iv, iw, W - itemw);
  if (nv > bv) {
    return nv;
  }
  return bv;
}

function solve(input) {
  const temparr = input[0].split(' ');
  const N = Number(temparr[0]);
  const W = Number(temparr[1]);
  const iv = [];
  const iw = [];
  for (let i = 1; i <= N; i += 1) {
    iw.push(lines[i].split(' ').map(Number)[0]);
  }
  for (let i = 1; i <= N; i += 1) {
    iv.push(lines[i].split(' ').map(Number)[1]);
  }
  console.log(MV(N, iv, iw, W));
}

rl.on('close', () => {
  solve(lines);
});
