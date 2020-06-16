//start [0,0]

function solve(arr){
  var w = 10
  var h = 10
  var W = w+2
  var H = h+2
  let step = 0
  let quene = []
  let visited = [];
  let dots = [];
  for (let i = 0; i < arr.length;i++){
      arr[i] = '#'+arr[i]+'#'
  }
  arr.reverse().push('#'.repeat(w+2))
  arr.reverse().push('#'.repeat(w+2))
  for (let x = 0; x < arr.length; x++){
      for (let y = 0; y < arr[x].length; y++){
        if (arr[x][y]==='.'){
            dots.push(x*H+y)
        }
      }
  }
  let start = dots[0];
  let end = dots[dots.length-1]
  quene.push(start)
  while (quene.includes(end)===false){
    let temp = []
    while (quene.length !==0){
        temp.push(quene.shift())
    }
    while (temp.length !== 0){
      let s = temp[0]
        if (dots.includes(s-W)  && !(visited.includes(s-W)) && !(quene.includes(s-W))){
            quene.push(s-W);
        }
        
        if (dots.includes(s+W)  && !(visited.includes(s+W)) && !(quene.includes(s+W))){
            quene.push(s+W);
        }
        
        if (dots.includes(s+1)  && !(visited.includes(s+1))&& !(quene.includes(s+1))){
            quene.push(s+1);
        }
        
        if (dots.includes(s-1)  && !(visited.includes((s-1)))&& !(quene.includes(s-1))){
            quene.push(s-1);
        }

        
        visited.push(temp.shift())
    }
        step++
        
    
    
  }

  console.log(step)
  
} 

solve([
	'..########',
	'#........#',
	'###..#..##',
	'#....#..##',
	'#..###...#',
	'#.#..#...#',
	'#.#....#.#',
	'#.####...#',
	'#.....#..#',
	'########..'
])

