# hw3：Hoisting

## Question

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

## Answer
輸出為：
```js
undefined
5
6
20
1
10
100
```
執行順序：
1. 宣告 global variable a 並賦值為 1。
2. 宣告 function `fn`。
3. 執行 function `fn()`。
4. 執行 `console.log()`，參數為 a。先找尋 `fn` 中是否有宣告 a，有，不過是在 `console.log()`，將宣告提升至最前面。a 有宣告但無賦值 => 輸出 `undefined`。
5. a 已宣告，重新賦值為 5。
6. 執行 `console.log()`，參數為 a => 輸出 `5`。
7. a 重新賦值為 6。
8. 執行 `fn2()`，找尋 fn2 宣告在執行之後，將宣告提升至執行前。
9. 執行 `console.log()`，參數為 a。找尋 `fn2` 中有沒有 a，發現沒有，再往上一層找尋有沒有 a，`fn` 中有 a，在 `fn2` 使用這個 a，值為 6 => 輸出 `6`。
10. 將 `fn` 中的 a 重新賦值為 20。
11. 將 b 賦值 100，找尋 `fn2` 中有沒有 b，沒有，往上找 `fn`，也沒有，往上找，global 也沒有，故在 global 中宣告 global variable b，並且賦值為 100。
12. `fn2` 執行完畢。
13. 執行 `console.log()`，參數為 a => 輸出 `20`。
14. `fn` 執行完畢。
15. 執行 `console.log()`，參數為 a ，global variable a 值為 1 => 輸出 `1`。
16. a 重新賦值為 10。
17. 執行 `console.log()`，參數為 a ，global variable a 值為 1 => 輸出 `10`。
18. 執行 `console.log()`，參數為 b ，global variable b 值為 100 => 輸出 `100`。
