/* eslint linebreak-style: ["error", "windows"] */

function add(a, b) {
  const A = a.toString(2).padStart(32, '0').split('').reverse();
  const B = b.toString(2).padStart(32, '0').split('').reverse();
  const result = [];
  let adddigit = 0;
  while (A.length > 0) {
    if (A[0] === '1' && B[0] === '1') {
      if (adddigit === 0) {
        adddigit = 1;
        result.push('0');
      } else {
        result.push('1');
      }
    } else if ((A[0] === '0' && B[0] === '1') || (A[0] === '1' && B[0] === '0')) {
      if (adddigit === 1) {
        result.push('0');
      } else {
        result.push('1');
      }
    } else {
      if (adddigit === 1) {
        result.push('1');
        adddigit = 0;
      }
      result.push('0');
    }
    A.shift();
    B.shift();
  }
  return (parseInt(result.reverse().join(''), 2));
}

console.log(add(123, 456));
