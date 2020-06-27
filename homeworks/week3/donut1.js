const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const w = input[0].length;
  const h = input.length;
  let finished = false;
  let dis = [];
  for (let i = 0; i < h; i += 1) {
    dis[i] = [];
  }
  let start = findStart(input);
  let end = findEnd(input);
  let startX = start[0];
  let startY = start[1];
  let endX = end[0];
  let endY = end[1];
  dis[startY][startX] = 0;
  let queue = [{x: startX, y: startY}];
  let dir = [
    {dx: 1, dy: 0},
    {dx: -1, dy: 0},
    {dx: 0, dy: 1},
    {dx: 0, dy: -1}
  ]
  while(queue.length && finished === false) {
    let {x, y} = queue.shift()
    for(let d of dir) {
      let newX = x + d.dx
      let newY = y + d.dy
      if (input[newY][newX] !== '.') {
        if (input[newY][newX] >= 'A' && input[newY][newX] <= 'Z') {
          console.log('touchPort',newX,newY,input[newY][newX]);
          let temp = findPort(input,newX,newY);
          console.log('temp=',temp);
          if (temp === undefined) continue;
          portX = temp[0];
          portY = temp[1];
          if (dis[y][x] + 1 >= dis[portY][portX] && dis[portY][portX] !== undefined) continue
          queue.push({x: portX, y: portY});
          dis[portY][portX] = dis[y][x] + 1;
          continue;
        } else continue;
      }
      if (dis[y][x] + 1 >= dis[newY][newX] && dis[newY][newX] !== undefined) continue
      dis[newY][newX] = dis[y][x] + 1;
      console.log('nweX,Y=',newX,newY)
      queue.push({x: newX, y: newY});
    }
  }
  console.log(dis);
  console.log(dis[end[1]][end[0]]);
}


/*
0
37
96
133
*/
function findStart(arr) {
  let h = arr.length;
  let w = arr[0].length;
  let result = [];
  for (let i = 0; i < h; i += 1) {
    let find1 = [
      {dx: 1, dy: 0},
      {dx: -1, dy: 0},
      {dx: 0, dy: 1},
      {dx: 0, dy: -1},
    ]
    let find2 = [
      {dx: 2, dy: 0},
      {dx: -2, dy: 0},
      {dx: 0, dy: 2},
      {dx: 0, dy: -2},
    ]
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === 'A') {
        for (let d of find1) {
          let newX = j + d.dx;
          let newY = i + d.dy;
          if (newX >= w || newX < 0 || newY >= h || newY < 0 || arr[newY][newX] !== 'A') continue;
          if (arr[newY][newX] === 'A') {
            for (let t of find1) {
              let dotX = j + t.dx;
              let dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY]
            }
            for (let s of find2) {
              let dotX = j + s.dx;
              let dotY = i + s.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY]
            }
          }
        }
      }
    }
  }
}

function findPort(arr,X,Y) {
  let h = arr.length;
  let w = arr[0].length;
  console.log('fiidPort X,Y=',X,Y)
  let al1 = arr[Y][X];
  let al2 = null
  let result = [];
  let find1 = [
    {dx: 1, dy: 0},
    {dx: -1, dy: 0},
    {dx: 0, dy: 1},
    {dx: 0, dy: -1},
  ]
  let find2 = [
    {dx: 2, dy: 0},
    {dx: -2, dy: 0},
    {dx: 0, dy: 2},
    {dx: 0, dy: -2},
  ]
  for (let d of find1) {
    let newX = X + d.dx;
    let newY = Y + d.dy;
    if (arr[newY][newX] >= 'A' && arr[newY][newX] <= 'Z') {
      al2 = arr[newY][newX];
      break;
    }
  }
  console.log('al1,al2=',al1,al2)
  if ((al1 === 'A' && al2 ==='A') || (al1 === 'Z' && al2 ==='Z')) return;
  for (let i = 0; i < h; i += 1){
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === al1 && !(i === Y && j === X)) {
        for (let d of find1) {
          let newX = j + d.dx;
          let newY = i + d.dy;
          if (newX >= w || newX < 0 || newY >= h || newY < 0 || arr[newY][newX] === '.' || arr[newY][newX] === ' ') continue;
          if (arr[newY][newX] === al2) {
            for (let s of find1) {
              let dotX = j + s.dx;
              let dotY = i + s.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 ||  arr[newY][newX] === ' ') continue;
              if (arr[dotY][dotX] === '.') {
                console.log('port found');
                console.log([dotX, dotY]);
                return [dotX, dotY];
              }
            }
            for (let t of find2) {
              let dotX = j + t.dx;
              let dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 ||  arr[newY][newX] === ' ') continue;
              if (arr[dotY][dotX] === '.') {
                console.log('port found');
                console.log([dotX, dotY]);
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
  let h = arr.length;
  let w = arr[0].length;
  let result = [];
  for (let i = 0; i < h; i += 1) {
    let find1 = [
      {dx: 1, dy: 0},
      {dx: -1, dy: 0},
      {dx: 0, dy: 1},
      {dx: 0, dy: -1},
    ]
    let find2 = [
      {dx: 2, dy: 0},
      {dx: -2, dy: 0},
      {dx: 0, dy: 2},
      {dx: 0, dy: -2},
    ]
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === 'Z') {
        for (let d of find1) {
          let newX = j + d.dx;
          let newY = i + d.dy;
          if (newX >= w || newX < 0 || newY >= h || newY < 0 || arr[newY][newX] !== 'Z') continue;
          if (arr[newY][newX] === 'Z') {
            for (let t of find1) {
              let dotX = j + t.dx;
              let dotY = i + t.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY]
            }
            for (let s of find2) {
              let dotX = j + s.dx;
              let dotY = i + s.dy;
              if (dotX >= w || dotX < 0 || dotY >= h || dotY < 0 || arr[dotY][dotX] !== '.') continue;
              return [dotX, dotY]
            }
          }
        }
      }
    }
  }
}
rl.on('close', () => {
  solve(lines);
});
