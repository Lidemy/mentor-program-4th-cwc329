function capitalize(str) {
    if (str[0]>='a' && str[0]<='z'){
        let temp=str.split('')
        temp[0]=String.fromCharCode(str.charCodeAt(0)-32)
        str=temp.join('')
    }
    return str
}

console.log(capitalize(',hello'));
