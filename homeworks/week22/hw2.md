## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. `useState()`  
  用來設定 component 的 state 回傳一個陣列，第一項為 state 的值，第二項為用來改變 state 的 funciton。可以接收一個參數，為 state 的初始值。  

2. `useEffect(()=>{}, [])`  
  指定在 component mount 之後或者 unmount 之前要做什麼處理，可以傳入兩個參數，第一個是一個 callback funciton，第二個是 dependency array。callback funciton 裡面的會執行當 component mount 之後會做的事，而 callback function 可以回傳一個 function，這個 function 會在 component unmount 之前被執行。

3. `useContext()`  
  接收上層 component 提供的 context，可以傳進一個參數，此參數為要使用的 context object，便可以在其下層的 component 中使用 context，不必再經過層層的傳遞。

4. `useReducer()`  
  與 useState 的替代方案，與 Redux 有關，適合運用在 state 有較複雜的邏輯運算以及 state 之間有依賴關係。

5. `useCallback(()=>{})`  
  會回傳一個 memoized 的 callback，因為 memoized，所以可以避免不必要的 re-render。

6. `useMemo()`  
  回傳一個 memoized 的值，同樣可以避免不必要的 re-render。

7. `useRef()`  
  回傳一個 ref object，object 裡面的 .current 為傳入的參數，這個 object 會在 component 的生命週期中持續存在。

8. `useImperativeHandle()`  
  會搭配 ref 一起使用，這個 hook 可以向父 component 暴露一個 ref，並且可以讓父 comopnent 使用。

9. `useLayoutEffect()`  
  與 `useEffect` 類似，官方文件建議的使用時機為 `useEffect` 使用上有問題的時候再考慮使用 `useLayoutEffect`。

10. `useDebugValue()`  
  在需要 debug 的使用，可以在 react 的 devtool 中顯示出自定義的標籤，當要看自定義的 hook 中是否有問題的時候很好用。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
  class component 的生命週期有三個階段：mounting、updating、unmounting。有些 method 只會在某個特定的週期被呼叫，有些則是在兩個週期都會被呼叫。
  + `contructor(props)`  
    當 component mounting 時被第一個呼叫，設定 component 的 state 與取用 props。可以傳入一個參數，此參數為父層 component 傳下來的 props，如果要取用 props，除了要傳入參數外，還要在 `contructor` 中呼叫 `super(props)`。在 `contructor` 透過指定 `this.state` object 初始化 state 的值。

  + `static getDerivedStateFromProps(props, state)`  
    當 mounting、updating 時，在 `contructor` 之前呼叫，為較少只用的方法。

  + `render()`  
    當 mounting、updating 時，在 `static getDerivedStateFromProps` 之後呼叫。

  + `componentDidMount()`  
    當 mounting 時，在 `render` 之後呼叫，通常會在裡面做 side-effect，例如：call API。

  + `shouldComponentUpdate(nextProps, nextState)`  
    當 updating 時，在 `static getDerivedStateFromProps` 之後呼叫，可以接收兩個參數，分別為新的 props 與 state，可以在裡面比對並且由回傳值決定是否 re-render component，回傳值預設為 true 代表要 re-render。

  + `getSnapshotBeforeUpdate(prevProps, prevState)`  
    當 updating 時，在 `render` 之後呼叫，經由傳入的參數 prevPropps 與 prevState 可以抓取 component 的舊資訊，處理後回傳，而這些回傳值可以在 `componentDidUpdate` 中以參數的方式取用。
  
  + `componentDidUpdate(prevProps, prevState, snapshot)`  
    當 updating 時，在 `render` 後呼叫，通常會在這邊做一些 side-effect 處理。

  + `componentWillUnmount()`  
    當 unmounting 時執行，會在這裡面執行清除訂閱、取消計時器以及發 request。

錯誤處理
  + `static getDerivedStateFromError(error)`  
    當下層 component 丟出錯誤，這個 method 可以接收錯誤並且回傳一個值更新 state。

  + `componentDidCatch(error, info)`  
    當接收到下層 component 丟出的錯誤之後，可以接收錯誤以及錯誤資訊並且處理。


## 請問 class component 與 function component 的差別是什麼？

在 react 推出 hooks 之前，兩者最大的差別在於，class component 可以使用 state，而 function component 不行。  
不過在 hooks 出現之後，function component 也可以用 state，兩者最大的不同就在於 class 與 function 的差別。我認為 class 它就像是一直在那邊的東西，即便因為 state 或者 props 改變而要 re-render，它的「本體」還是一直存在，所以在使用 class 的時候才會重視 lifecycle，因為即便 re-render 也比較像是 component 內部進行改變，並不是又有一個新的 component，所以才會重視要在哪個 lifecycle 的哪個階段做什麼事情。  
而 function 則不太一樣，它每次 re-render 會重新執行一次，每執行一次就像是一個新的 component，所以 function 沒有 lifecycle 的問題，因為每一次 re-render 都會重新執行 function，這讓 function 在使用 hooks 的時候注重的是在 function 執行的時候會怎麼去呼叫各個 hooks，以及其他與 function 有關的特性。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

controlled component 與 uncontrolled component 在 react 處理表單資料時會出現，尤其是要如何取得與設定 input tags 的值。  
controlled component 值得顯示與更新都是經由 state，也就是先由 state 設定 input 的值，並且設定好處理值變化的事件處理器，值變化的時候更新 state，最後再把值與事件處理器傳入 input tag 中。這樣子 input tag 中的值都是由 state 所控制的，這樣的做法如果值或者事件處理器其中之一沒有傳入，就會讓 input 的失去部分甚至全部功能。如果沒有傳入 state 的值但是有事件處理器，在想要使用 state 預設值的狀況下，會造成畫面上的 input 是空的，但是實際上是有值；而如果沒有傳入事件處理器但是有傳入值，會讓使用者無法更改 input，因為這個 input 的值是被 state 控制的，但是沒有去改變 state，所以這個 input 的值就不會被改變。如果兩個都沒有傳入，就會變成 untrolled component。  
uncontrolled component 其值不被 state 控制，所以其真正的值存在於 DOM 之上，也就是存在於使用者看到的畫面之上，而 state 中雖然也有一個一樣的值，但是這只是把畫面上的值反映在 state 中。這點與 controlled component 不同，因為 controlled component 的值真正存在於 state 中，畫面上的充其量不過是其映射。而 uncontrolled component 在使用上是在 component 中用 ref 從 DOM 中取得 input 的資料，這點的好處是可以讓 react 與舊的 JS 語法共存，但是缺點就是 uncontrolled component 只能一次性的取得 input 的值。通常都會建議使用 controlled component，不過有一個例外：file 類別的 input 只會使用 uncontorlled component，因為這個 input 的值無法由 react 產生，只能由使用者決定。
