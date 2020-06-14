function reverse(str) {
  let result = '';
  let temp=str.split('');
  for (let i = str.length -1; i >= 0; i--){
      result+=temp[i]
  }
  console.log(result)
}

reverse('hello, world!!');
