# hw2：Event Loop + Scope

## Question

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

## Answer
輸出為：
```js
i: 0
i: 1
i: 2
i: 3
i: 4
0
//<至少 1 秒後>
1 <-錯誤
5
//<至少 2 秒後>
2 <-錯誤
5
//<至少 3 秒後>
3 <-錯誤
5
//<至少 4 秒後>
4 <-錯誤
5
```
執行順序：
1. 開始執行環境，在 stack 中排入 `main()`。
2. 執行迴圈，宣告 i 並且賦值為 0。
3. 檢查 i 是否小於 5，是，進入迴圈。
4. 執行 `console.log()` => 輸出 `0`。
5. 執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
6. 將 i + 1，i 之值變為 1，檢查是否小於 5，是，進入迴圈。
7. 執行 `console.log()` => 輸出 `1`。
8. 執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
9. 將 i + 1，i 之值變為 2，檢查是否小於 5，是，進入迴圈。
10. 執行 `console.log()` => 輸出 `2`。
11. 執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
12. 將 i + 1，i 之值變為 3，檢查是否小於 5，是，進入迴圈。
13. 執行 `console.log()` => 輸出 `3`。
14. 執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
15. 將 i + 1，i 之值變為 4，檢查是否小於 5，是，進入迴圈。
16. 執行 `console.log()` => 輸出 `4`。
17. 執行 `setTimeout()`，在達到條件後，將其 callback `console.log()` 排入 queue。
18. 將 i + 1，i 之值變為 5，檢查是否小於 5，否，跳出迴圈。  
======錯誤分隔線======
19. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `0`。
20. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `1`。
21. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `2`。
22. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `3`。
23. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `4`。  
======錯誤分隔線======  

這邊會錯誤是因為變數的作用域，在迴圈中使用 `var` 宣告 i，使得 i 成為全域變數，callback function 在執行的時候取得的 i 值就會是 i 最後賦值的結果 5。所以正確的執行應該如下：  

19. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `5`。  
20. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `5`。  
21. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `5`。  
22. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `5`。  
23. stack 清空，從 quene 中排入第一個 `console.log()` 執行 => 輸出 `5`。    