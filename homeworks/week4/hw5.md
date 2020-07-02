## 請以自己的話解釋 API 是什麼

API 是兩個不同的單位要交換資訊時使用的傳輸介面，以 HTTP API 為例，API 使用者大部分使用的目的是要取得對方資料庫的資料。  
要取得資料當然可以透過直接進入資料庫撈取，不過這樣對於資料提供方有資安疑慮，於是提供方會給要求方一個窗口與方法，只要要求方將特定資訊需求以約定好的方法帶給窗口，提供方就會依照要求把透過窗口將資料回傳。如此一來，提供方可以避免外人進入自家的資料庫，而且只要有標準化流程就可以規模化，如此在未來如果有相同需求的其他人出現，就可以用同一套方法提供資料。例如銀行的金流 API，僅讓要求方可以得到他們必須的資訊，其餘的個資以及帳戶資料就可以好好保存，同時也可以在 API 規定要求方必須加上安全驗證。  
對於要求方，API 也是一個方便的東西。如果沒有 API，或者 API 設計不好，可能會發生使用者僅要求少許資料，卻換來海量資料，並且資料的規格散亂不一，這樣在資料處理上就很花時間，也可能處理到最後發現沒有需要的資料。例如圖書館藏書資料庫，雖然較無安全疑慮，但是如果讀者每次要撈一本書，伺服器就直接倒整個資料庫給使用者，這樣也會非常困擾。  
以上是我對於 API 是什麼以及為何要用 API 的想法。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹

* 504 Gateway Timeout
  伺服器回傳 response 的時間逾時。
* 505 HTTP Version Not Supported
  請求使用的 HTTP 版本不被伺服器支援。
* 429 Too Many Requests
  使用者在短時間內發送太多請求。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


『中午吃啥』餐廳平台  
Base URL: https://the-most-difficult-question.com  

| 說明  | Method  | path  | 參數  | 範例   |
|---  |---      |---    |    ---|---     |
| 回傳所有餐廳資料 | GET | /restaurants | _limit:限制回傳資料數量 | /restaurants?_limit=106 |
| 查詢餐廳 | GET | /restaurants | name: 餐廳名稱 <br> id: 餐廳 ID | /restaurants?name=NTUST <br> restaurants?id=118 |
| 新增餐廳 | POST | /restaurants | name: 餐廳名稱 <br> address: 地址| 
| 更改餐廳資訊 | PATCH | /restaurants/:id | 無 |
| 刪除餐廳資訊 | DELETE | /restautants/:id | 無 | /restaurants/112





