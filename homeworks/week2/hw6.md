``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 1 行，設定變數 i 為 0。
2. 檢查 i 是否小於陣列 arr 的長度。如果是，繼續執行，進入迴圈；如果不是則跳出迴圈，並且跳到第 4 步。
3. 執行第 2 行，檢查 arr 的第 i 個元素是否小於等於0。如果是， 'invalid' 並結束function；如果不是，將 i 加 1 後回到第 2 步
4. 執行第 4 行，設定變數 i 為 2 。
5. 檢查 i 是否小於陣列 arr 的長度。如果是，繼續執行，進入迴圈；如果不是則跳出迴圈，並且跳到第 7 步。
6. 執行第 5 行，檢查 arr 的第 i 個元素是否不等於 arr 的第 i-1 與第 i-2 個元素之和。如果不等於，回傳 'invalid' 並結束function；如果相等，將 i 加 1 後回到第 5 步。
7. 回傳 'valid' 並且結束function。

## 猜猜function功能
這個function會判斷陣列的數字排列是否是費氏數列。