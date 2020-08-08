<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css" />
    <title>帳號註冊</title>
</head>
<body>
  <div class="warningLine">Warning: 此為測試用留言板，請勿使用您常用與真實的帳號密碼，以免資料外洩！！！</div>
  <main class="board">
    <div class="logInAndReg">
      <a href="index.php">回留言板</a><br>
      <a href="login.php">登入</a>
      </div>
      <div class="board__reg">
        <h1>註冊</h1>
          <?php
            if (!empty($_GET['err'])) {
              if ($_GET['err'] === '1') {
                $msg = '錯誤：暱稱已有人使用！';
              } else if ($_GET['err'] === '2') {
                $msg = '錯誤：帳號已有人使用！';
              }
              echo "<h2 class='errorMsg'>" . $msg . "</h2>";
            }
          ?>
        <form class="board__reg__form" method="POST" action="handle_register.php">
          <div class="board__reg__form__nickname">暱稱：<input type="text" name="nickname" placeholder="您的暱稱" required /></div>
          <div class="board__reg__form__username">帳號：<input type="text" name="username" placeholder="您的帳號" required /></div>
          <div class="board__reg__form__password">密碼：<input type="password" name="password" placeholder="您的密碼" required /></div>
          <div class="board__reg__form__submit"><input type="submit" value="送出" /></div>
        </form>
    </div>
  </main>
</body>
</html>