## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. <details></details>
2. <summary></summary>
3. <del></del>

`<details>` 還有 `<summary>` 可以和在一起講，這是可以收納展開內容的語法。
使用方式如下：
```html
<details>
    <summary>我是摘要，收起來只會顯示我。<summary>
    我是內文，展開來才可以看到我。
</details>
```

用 `<details>` 把要收起來的東西包起來，並且用 `<summary>` 當做標題或者摘要。

`<del>`就比較簡單一些，可以在 html 上做出文字刪除線的效果。
```html
<p>我跳進來啦～我又跳出去啦～打我啊<del>笨蛋</del>～</p>
```


## 請問什麼是盒模型（box modal）

盒模型是用來描述 html 元素大小的方式，一個元素基本上可以分成四層，由內而外分別為：content、padding、border、margin，在 CSS 中元素預設的 box model 是 content-box。  
從這種方式來看，元素就像是一個有四層的盒子，每一層都可以調整它自己的大小，盒模型在 CSS 控制元素大小是很重要的。一個元素的被設定的 box-model 代表當在設定元素寬高的時候，實際上就是在決定其 box-model 的寬高。以預設的 content-box 而言，設定這個元素的寬高為 100px * 100px 代表 content 區域的寬高各為 100px，而外層的 padding、border、margin 不論設定多少都不會影響到 content 的寬高，整個元素的寬高基本上就是 content、padding、border、margin 層層累加而成。  
而如果把元素設成 border-box，寬高維持 100px * 100px 的話，會變成元素的寬高會100px * 100px 作為 border 的範圍寬高，這個時候 padding、content 的大小基本上不會影響 border 100px * 100px 這個大小。例外就是讓 padding-box 大小超過 100px *100px，例如先設定 `border: solid 10px`，然後設定 `padding: 100px`這個時候整個 border-box 就會被撐大，變成 220px * 220px，而且 content-box 會變成 0 * 0。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

block 元素可以自成一行，並且 block 元素之間不會佔用同一行，如果在 block 元素中用 block 元素會造成換行。而 block 元素除了內容之外也可以設定寬高，在預設的定位方式之下設定 block 的寬高會影響到其他元素的位置。block 元素即便沒有內容，只要有寬高都會造成版面上的視覺效果。  
而 inline 顧名思義，元素在同一行之間，使用 inline 元素不會自動換行，如果標籤沒有內容在網頁上也看不出來。inline 元素無法自由設定寬高，同時其 margin-top、margin-bottom，對其他元素也沒有位置上的影響。
inline-block 元素，就像前兩個摻在一起做撒尿牛丸。從字面上來看，就是行中的 block。它可以像 block 一樣調整寬高，這樣也會影響其他元素，這也代表其可以設定自己的 margin。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

static 是預設的定位方式，這樣設定的時候，元素們會依照順序排列，而且正常狀況下彼此不會相互干擾，就像排隊的人龍。
relative 定位方式在沒有特別調整參數的情況下，與 static 幾乎沒有區別。但是 relative 元素可以調整其 top、right 等方位，可以使其顯示位置與其他元素重疊。在調整這些參數的同時，基本上不會影響到其他元素的位置。
fixed 會讓元素定位在瀏覽畫面的某一個定點，比如說讓元素不論畫面如何捲動，永遠在畫面右下角出現。
absolute 是透過設定定位方式，讓這個元素出現在特定位置，其定位目標是其上第一個非 static 定位的元素。如果其上沒有非 static 定位的元素，就會以 `<body>` 為定為目標。