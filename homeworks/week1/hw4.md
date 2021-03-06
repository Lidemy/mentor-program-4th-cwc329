## 跟你朋友介紹 Git

### 前置準備

要使用git做版本控制，我就先預設菜哥已經有而且會使用git-bash，如果他不會請他去問h0w哥。  

接下來，為了方便管理，前置作業可以先把所有笑話都集中在某個資料夾中。  

然後，打開git-bash，來到放滿笑話的資料夾，開始使用git。  

### 創世紀

第一步，就是要創世紀，建立git版本控制。要輸入的指令是：  
```
git init
```  

輸入完會發現好像沒事發生，但是如果是git-bash，可以看到在輸入指令上一行的檔案位置，多出了`(master)`。  

有`(master)`表示我們已經在這個資料夾建立了一個git版本控制，而`master`代表現在所在的branch。(branch我們晚點會再回來說)  

如果不確定可以用一個很好用的指令檢查：  
```
git status
```  

如果沒有建立成功，輸入指令會出現錯誤訊息。  

這樣還沒結束，我們要把想要控制的檔案加入才行，不然git只會控制一個空空的版本，這邊的指令是：  
```
git add <file>
```  

這邊如果認真的學cmd就會發現，如果有幾百的檔案不就要輸入幾百次？這邊有一個快速的指令：  
```
git add .
```  
這樣就可以一次把資料夾所有東西都加入版本控制。  

但是這邊可能又會有個問題，資料夾中可能有一些珍藏punchline影片，不想要或不需要加入版本控制，這樣不就會全部都加進去了嗎？這時候就要在add之前先建立一個 `.gitignore` 的檔案，然後把不要版本控制的檔案與資料夾名稱放進檔案中。這樣git就不會把這些東西加入版本控制。這樣就可以放心的 `git add .` 。  

到這邊就創建好git版本控制了。


### チェンジ・ザ・ワールド (Change the World)

建立好世界後就要知道怎麼改變它，假設菜哥今天在open mic表演一個小菜的笑話，覺得效果不好，於是回家把這笑話改良。當他改好儲存檔案之後，要做什麼呢？  

首先這時後如果用 `git status` 檢查，會看到訊息顯示小菜笑話被修改過，但是這不代表版本就更新了，要更新版本就要用這個指令：  
```
git commit
```  

這個指令可以再複和上一些東西，讓功能更多更方便，例如：  
```
git commit -am 'commit message'
```  
上面的指令可以一次commit所有在上一個commit後改變的檔案，並且可以在後面加上這次版本改變的訊息，例如修改了什麼。  

那如果菜哥苦心孤詣又想了一個新笑話素材，他把新素材建成新檔案存在資料夾中，這個時候用 `git commit` 可能沒辦法直接更新版本，必須要先用 `git add <file>` ，才能把新的檔案加入版本控制。  

如果想要看看以前的版本紀錄，可以用下方指令：  
```
git log
```  
這會顯示所有版本紀錄以及commit message，可以知道有哪些版本。

### 可能世界

菜哥除了修改舊笑話也要創作新笑話，甚至要為了不同表演場次更改笑話內容和順序，假設他在高雄和台北兩場表演時間很近，必須要同時準備，那這個時候要怎麼讓他可以更有效率呢？  

這時候之前提到的 `branch` 就可以登場了。他可以用不同branch來為不同場次表演個別準備，又不用擔心會相互影響。那branch要怎麼用，就又要輸入新指令了：  
```
git branch <branch>
```

如果要位台北場新增branch，可以輸入 `git branch Taipei` ，輸入完後可以輸入 `git branch -v` 看看是否有新的branch。  

新增完成了那要怎麼在新的branch下創作呢？當然要先切換到新的branch下，這邊的指令是：  
```
git switch <branch>
```  

輸入之後會跳出訊息顯示已經切換到哪個branch，而且上方的檔案位置後面的()中間會變成現在所在的branch名稱。當菜哥修好自己的笑話，一樣可以用 `git commit` 更新版本，而這個時候更新就是在新的branch下更新新版本。  

用branch就可以很輕鬆的同時準備很多場表演，也可以同時開發新笑話。  

菜哥結束這一季的巡迴演出，他想要把之前所有演出的笑話以及創做好的笑話結合起來，那又該怎麼做呢？這時候也有個好用的指令可以用：  
```
git merge <branch>
```

當菜哥想要把其他branch結合回到最一開始的master，首先他要先回到master底下，然後輸入 `git merge <branch>` 就可以把其他分支合併回master底下。如此他的笑話開發就又變得簡潔，為下一季做準備。

### 推與拉

菜哥是個樂於散播歡樂散播愛的男人，所以他想把自己寫的笑話專案分享到網路上。而且同時他也是個交遊廣闊的男人，會與很多人一起表演、寫笑話，那他就可以用一個叫做 `github` 的網站來跟大家一起散播歡樂散播愛。  

那我們假設菜哥已經創建自己的github帳號，那他要怎麼把東西上傳到呢？相信菜哥已經知道command line是個好東西，打開了git-bash準備就緒。那他該打的指令是：  
```
git push origin <branch>
```

這樣他就可以把這個branch推到github上，把自己的笑話分享給大家。  

而如果菜哥和h0w哥一起創作笑話，他們約定用github做為共同創作平台，那菜哥要怎麼把h0w哥更新完的笑話拉到自己的電腦上呢？這時候就用下列指令：  
```
git pull origin <branch>
```
這樣就可以把這個branch拉到他的電腦，那等菜哥改完了，就可以再用 `git push` 把東西在推回github。  

散播歡樂散播愛就是這麼簡單的事情。
