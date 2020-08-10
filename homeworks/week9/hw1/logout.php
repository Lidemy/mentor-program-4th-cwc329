<?php
  session_start();
  session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css" />
    <title>登出頁面</title>
</head>
<body>
  <div class="warningLine">Warning: 此為測試用留言板，請勿使用您常用與真實的帳號密碼，以免資料外洩！！！</div>
  <main class="board">
      <h1>登出</h1>
      <p>您已成功登出，請<a href="index.php">按此</a>回到首頁。</p>
    </div>
  </main>
</body>
</html>