## 交作業流程
1. 開新branch
   git branch <branch>

2. 在新branch上相對應的資料夾寫作業
   ex: 修改hw1.js ...etc

3. 新branch上完成作業

4. 把寫作業的branch push到github
   git push origin <branch>

5. 成功push branch之後，在github網頁點選pull request
   點選compare and pull request，
   相當於在線上請求把寫作業branch merge到線上的master
   有任何問題可以在訊息欄留言

6. 複製pull request的聯結，然後到lidemy學習系統網站
   在「作業列表」新增作業、貼上pull request的網址

7. 作業如果通過且批改完，助教會將寫作業的branch merge到github的master

8. 在github上merge之後，在本地先選取master branch，
   git pull origin master，將遠端的master同步到本地的master

9. 同步master之後，把本地寫作業的branch刪掉
   git branch -d <branch>


PS: 人人都可以code review，可以從作業系統連過去看，並且在下方加評語

