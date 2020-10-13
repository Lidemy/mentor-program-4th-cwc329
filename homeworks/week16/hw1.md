# hw1：Event Loop

## Question

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
console.log(1);
setTimeout(() => {
  console.log(2)
}, 0);
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0);
console.log(5);
```

## Answer
輸出順序為：
```js
1
3
5
2
4
```

JS 是單執行緒程式，簡單來說就是它一次只能處理一件事情，無法一心多用。  
JS 執行 function 如果是同步，那個就會依照呼叫的順序將 function 排入 stack 並且依序執行，並且上一個尚未執行完成，下一個不會開始執行。  
但是如果 function 有 callback，也會排入 stack，但是其 callback 並不會跟著排入 stack 等待，而是會被排入 queue 中等待時機執行。所謂時機就是當 stack 裡沒有要執行的事件之後，就會檢查 queue 的事件，並且依照先進先出的方式排入 stack 中執行。  
依照這樣來看，這題的執行順序會是：
1. 開始執行環境，在 stack 中排入 `main()`。
2. 在 stack 中排入`console.log()`，執行 `console.log()` => 輸出 `1`。
3. 在 stack 中排入`setTimeout()`，執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
4. 在 stack 中排入`console.log()`，執行 `console.log()` => 輸出 `3`。
5. 在 stack 中排入`setTimeout()`，執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
6. 在 stack 中排入`console.log()`，執行 `console.log()` => 輸出 `5`。
7. stack 清空，排入 queue 中的第一個 `console.log()` => 輸出 `2`。
8. stack 清空，排入 queue 中的第一個 `console.log()` => 輸出 `4`。
