//start [0,0]

function solve(arr){
  var w = 10
  var h = 10
  let step = -1
  let quene = []
  let start = arr[0][0]
  let finish = false
  for (let i = 0; i < arr.length;i++){
    arr[i] = '#'+arr[i]+'#'
  }
  arr.reverse().push('#'.repeat(w+2))
  arr.reverse().push('#'.repeat(w+2))
  for (let i = 0; i < arr.length; i ++){
      arr[i]=arr[i].split('')
  }
  let end = arr[h][w];
  quene.push([1,1])
  while (finish === false){
    let temp = []
    while(quene.length !== 0){
        temp.push(quene.shift())
    }
    while (temp.length !== 0){
        let now = temp.shift()
        let nowx = now[0]
        let nowy = now[1]
        if (nowx === w && nowy === h){
            finish = true
            break
        }
        arr[nowy][nowx] = '@'
        if (arr[nowy+1][nowx] === '.' ){
            quene.push([nowx,nowy+1])
        }
        if (arr[nowy-1][nowx] === '.' ){
            quene.push([nowx,nowy-1])
        }
        if (arr[nowy][nowx+1] === '.' ){
            quene.push([nowx+1,nowy])
        }
        if (arr[nowy][nowx-1] === '.' ){
            quene.push([nowx-1,nowy])
        }
    }
    step++
  }

  console.log(step)
} 

solve([
    '..########',
    '#........#',
    '########.#',
    '#........#',
    '#.########',
    '#........#',
    '########.#',
    '#........#',
    '#.######.#',
    '########..'
])

