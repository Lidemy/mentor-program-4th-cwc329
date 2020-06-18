function join(arr, concatStr) {
  let result = String(arr[0]);
  for (let i = 1; i <arr.length; i++){
      result+=concatStr + arr[i]
  }
  return(result)
}

function repeat(str, times) {
  let result='';
  for (let i = 1; i <= times; i++){
      result += str
  }
  return(result)
}

console.log(join(['!','!','!'], '!'));
console.log(repeat('a', 5));
