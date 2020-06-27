/* eslint no-continue: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint object-curly-spacing: 0 */
/* eslint consistent-return: 0 */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function findStart(arr) {
  const h = arr.length;
  const w = arr[0].length;
  for (let i = 0; i < h; i += 1) {
    const find1 = [
      {dx: 1, dy: 0},
      {dx: -1, dy: 0},
      {dx: 0, dy: 1},
      {dx: 0, dy: -1},
    ];
    const find2 = [
      {dx: 2, dy: 0},
      {dx: -2, dy: 0},
      {dx: 0, dy: 2},
      {dx: 0, dy: -2},
    ];
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === 'A') {
        for (const d of find1) {
          const newX = j + d.dx;
          const newY = i + d.dy;
          if (newX >= w || newX < 0 || newY >= h || newY < 0 || arr[newY][newX] !== 'A') continue;
          if (arr[newY][newX] === 'A') {
            for (const t of find1) {
              const dotX = j + t.dx;
              const dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY];
            }
            for (const s of find2) {
              const dotX = j + s.dx;
              const dotY = i + s.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY];
            }
          }
        }
      }
    }
  }
}

function findPort(arr, X, Y) {
  const h = arr.length;
  const w = arr[0].length;
  const al1 = arr[Y][X];
  let al2 = null;
  const find1 = [
    {dx: 1, dy: 0},
    {dx: -1, dy: 0},
    {dx: 0, dy: 1},
    {dx: 0, dy: -1},
  ];
  const find2 = [
    {dx: 2, dy: 0},
    {dx: -2, dy: 0},
    {dx: 0, dy: 2},
    {dx: 0, dy: -2},
  ];
  for (const d of find1) {
    const newX = X + d.dx;
    const newY = Y + d.dy;
    if (arr[newY][newX] >= 'A' && arr[newY][newX] <= 'Z') {
      al2 = arr[newY][newX];
      break;
    }
  }
  if ((al1 === 'A' && al2 === 'A') || (al1 === 'Z' && al2 === 'Z')) return;
  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === al1 && !(i === Y && j === X)) {
        for (const d of find1) {
          const newX = j + d.dx;
          const newY = i + d.dy;
          if (newX >= w || newX < 0 || newY >= h || newY < 0 || arr[newY][newX] === '.' || arr[newY][newX] === ' ') continue;
          if (arr[newY][newX] === al2) {
            for (const s of find1) {
              const dotX = j + s.dx;
              const dotY = i + s.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[newY][newX] === ' ') continue;
              if (arr[dotY][dotX] === '.') {
                return [dotX, dotY];
              }
            }
            for (const t of find2) {
              const dotX = j + t.dx;
              const dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[newY][newX] === ' ') continue;
              if (arr[dotY][dotX] === '.') {
                return [dotX, dotY];
              }
            }
          }
        }
      }
    }
  }
}

function findEnd(arr) {
  const h = arr.length;
  const w = arr[0].length;
  for (let i = 0; i < h; i += 1) {
    const find1 = [
      {dx: 1, dy: 0},
      {dx: -1, dy: 0},
      {dx: 0, dy: 1},
      {dx: 0, dy: -1},
    ];
    const find2 = [
      {dx: 2, dy: 0},
      {dx: -2, dy: 0},
      {dx: 0, dy: 2},
      {dx: 0, dy: -2},
    ];
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === 'Z') {
        for (const d of find1) {
          const newX = j + d.dx;
          const newY = i + d.dy;
          if (newX >= w || newX < 0 || newY >= h || newY < 0 || arr[newY][newX] !== 'Z') continue;
          if (arr[newY][newX] === 'Z') {
            for (const t of find1) {
              const dotX = j + t.dx;
              const dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY];
            }
            for (const s of find2) {
              const dotX = j + s.dx;
              const dotY = i + s.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY];
            }
          }
        }
      }
    }
  }
}

function solve(input) {
  const h = input.length;
  const finished = false;
  const dis = [];
  for (let i = 0; i < h; i += 1) {
    dis[i] = [];
  }
  const start = findStart(input);
  const end = findEnd(input);
  const startX = start[0];
  const startY = start[1];
  dis[startY][startX] = 0;
  const queue = [{x: startX, y: startY}];
  const dir = [
    {dx: 1, dy: 0},
    {dx: -1, dy: 0},
    {dx: 0, dy: 1},
    {dx: 0, dy: -1},
  ];
  while (queue.length && finished === false) {
    const {x, y} = queue.shift();
    for (const d of dir) {
      const newX = x + d.dx;
      const newY = y + d.dy;
      if (input[newY][newX] !== '.') {
        if (input[newY][newX] >= 'A' && input[newY][newX] <= 'Z') {
          const temp = findPort(input, newX, newY);
          if (temp === undefined) continue;
          const portX = temp[0];
          const portY = temp[1];
          if (dis[y][x] + 1 >= dis[portY][portX] && dis[portY][portX] !== undefined) continue;
          queue.push({x: portX, y: portY});
          dis[portY][portX] = dis[y][x] + 1;
          continue;
        } else continue;
      }
      if (dis[y][x] + 1 >= dis[newY][newX] && dis[newY][newX] !== undefined) continue;
      dis[newY][newX] = dis[y][x] + 1;
      queue.push({x: newX, y: newY});
    }
  }
  console.log(dis[end[1]][end[0]]);
}


rl.on('close', () => {
  solve(lines);
});
