function search(arr,n){
    let start = 0
    let end = arr.length;
    let flag = true
    while(flag === true){
        let com = Math.floor((start+end)/2);
        if (n === arr[com]){
            return com;
        }else if(n > arr[com]){
            start = com;
        }else if(n < arr[com]){
            end = com;
        }
        if (end - start <=1){
            flag = false
        }
    }
    return -1
}

console.log(search([1,2,3,4,5,6],6 ))