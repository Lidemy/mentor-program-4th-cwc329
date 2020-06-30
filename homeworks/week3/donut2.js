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

function innerPortCount(arr) {
  const h = arr.length;
  const w = arr[0].length;
  let count = 0;
  for (let i = 2; i < h - 2; i += 1) {
    for (let j = 2; j < w - 2; j += 1) {
      if (arr[i][j] >= 'A' && arr[i][j] <= 'Z') {
        count += 1;
      }
    }
  }
  return count / 2;
}

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

function findPort(arr, X, Y, floor) {
  const h = arr.length;
  const w = arr[0].length;
  const al1 = arr[Y][X];
  const innerPorts = innerPortCount(arr);
  let al2 = null;
  if (floor === 0) {
    if (X === 1 || X === w - 2 || Y === 1 || Y === h - 2) {
      return;
    }
  }
  if (floor === innerPorts - 1) {
    if (!(X === 1 || X === w - 2 || Y === 1 || Y === h - 2)) {
      return;
    }
  }
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
                if (X === 1 || X === w - 2 || Y === 1 || Y === h - 2) {
                  return [dotX, dotY, floor - 1];
                }
                return [dotX, dotY, floor + 1];
              }
            }
            for (const t of find2) {
              const dotX = j + t.dx;
              const dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[newY][newX] === ' ') continue;
              if (arr[dotY][dotX] === '.') {
                if (X === 1 || X === w - 2 || Y === 1 || Y === h - 2) {
                  return [dotX, dotY, floor - 1];
                }
                return [dotX, dotY, floor + 1];
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
  const dis = [];
  const innerPorts = innerPortCount(input);
  for (let i = 0; i < innerPorts; i += 1) {
    dis[i] = [];
    for (let j = 0; j < h; j += 1) {
      dis[i][j] = [];
    }
  }
  const start = findStart(input);
  const end = findEnd(input);
  const [startX, startY] = start;
  const [endX, endY] = end;
  dis[0][startY][startX] = 0;
  const queue = [{x: startX, y: startY, lev: 0}];
  const dir = [
    {dx: 1, dy: 0},
    {dx: -1, dy: 0},
    {dx: 0, dy: 1},
    {dx: 0, dy: -1},
  ];
  while (queue.length) {
    const {x, y, lev} = queue.shift();
    for (const d of dir) {
      const newX = x + d.dx;
      const newY = y + d.dy;
      if (input[newY][newX] !== '.') {
        if (input[newY][newX] >= 'A' && input[newY][newX] <= 'Z') {
          const temp = findPort(input, newX, newY, lev);
          if (temp === undefined) continue;
          const portX = temp[0];
          const portY = temp[1];
          const portlevel = temp[2];
          if (dis[lev][y][x] + 1 >= dis[portlevel][portY][portX]
            && dis[portlevel][portY][portX] !== undefined) continue;
          queue.push({x: portX, y: portY, lev: portlevel});
          dis[portlevel][portY][portX] = dis[lev][y][x] + 1;
          continue;
        } else continue;
      }
      if (dis[lev][y][x] + 1 >= dis[lev][newY][newX]
        && dis[lev][newY][newX] !== undefined) continue;
      dis[lev][newY][newX] = dis[lev][y][x] + 1;
      queue.push({x: newX, y: newY, lev});
    }
  }
  console.log(dis[0][endY][endX]);
}


rl.on('close', () => {
  solve(lines);
});
