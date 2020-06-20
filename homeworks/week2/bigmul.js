/* eslint linebreak-style: ["error", "windows"] */
function bigmul(a, b) {
  const A = a.split('').map(Number);
  const B = b.split('').map(Number);
  const M = A.length;
  const N = B.length;
  const temp = [];
  for (let i = 1; i <= M + N; i += 1) {
    temp.push([0]);
  }
  for (let i = M; i > 0; i -= 1) {
    for (let j = N; j > 0; j -= 1) {
      const mul = A[i - 1] * B[j - 1];
      temp[i + j - 1].push(mul % 10);
      temp[i + j - 2].push(Math.floor(mul / 10));
    }
  }
  for (let i = temp.length - 1; i >= 0; i -= 1) {
    let sum = temp[i].reduce((x, y) => x + y);
    temp[i] = sum % 10;
    let j = i - 1;
    while (sum > 0) {
      sum = Math.floor(sum / 10);
      temp[j].push(sum % 10);
      j -= 1;
    }
  }
  if (temp[0] === 0) {
    temp.shift();
  }
  return temp.join('');
}

console.log(bigmul('124902814902890825902840917490127902791247902479027210970941724092174091274902749012740921759037590347438758957283947234273942304239403274093275902375902374092410937290371093719023729103790123', '1239128192048129048129021830918209318239018239018239018249082490182490182903182390128390128903182309812093812093820938190380192381029380192381092380192380123802913810381203'));
