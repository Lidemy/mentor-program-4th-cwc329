# hw4：What is this?

## Question

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

## Answer
輸出為：
```js
2
2
undefined
```

執行順序：
1. 宣告 obj。
2. 宣告 obj2，並將其賦值為 obj.inner。
3. 宣告 hello，並將其賦值為 obj.inner.hello。
4. 執行 `obj.inner.hello()`。
5. 執行 `console.log()`，參數為 this.value。找尋 this 指涉的對象，依照呼叫 function 的方式而定，因為以 `obj.inner.hello()` 呼叫這個 function，this 指涉的是當下的 instance，也就是 obj.inner，所以 this.value 之值為 2 => 輸出 `2`。
6. 執行 `obj2.hello()`。
7. 執行 `console.log()`，參數為 this.value。找尋 this 指涉的對象，依照呼叫 function 的方式而定，因為以 `obj2.hello()` 呼叫這個 function，this 指涉的是當下的 instance，也就是 obj2，而 obj2 的又是 obj.inner，所以 this.value 之值為 2 => 輸出 `2`。
8. 執行 `hello()`。
9. 執行 `console.log()`，參數為 this.value。找尋 this 指涉的對象，依照呼叫 function 的方式而定，因為以 `hello()` 呼叫，再加上並沒有 `use strice`，所以 this 在 Node.js 會指涉到 `global`，而在瀏覽器會指涉到 `window`。而這兩個物件裡面都沒有 value 這個 key，所以 value 沒有被定義值 => 輸出 `undefined`。