<?php
  require_once('conn.php');
  require_once('utils.php');
    
  $isLogin = false;
  $errMsg = NULL;

  if (!empty($_SESSION['id'])) {
    $isLogin = true;
  }

  if ($isLogin) {
    header('Location: index.php');
    die();
  }

  if (!empty($_GET['err'])) {
    if ($_GET['err'] == '1') {
      $errMsg = '帳號或密碼錯誤';
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Login</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <section class="nav__left">
      <h1 class="nav__title">
        <a href="index.php">cwc329's Blog</a>
      </h1>
      <ul>
        <li><a href="articles.php">文章列表</a></li>
        <li><a href="categories_list.php">分類專區</a></li>
        <li><a href="about_me.php">關於我</a></li>
      </ul>
    </section>
    <section class="nav__right">
      <ul>
      <?php
          if($isLogin) {
            if($userType == 99 || $userType == 98) {
        ?>
          <li><a href="add_article.php">新增文章</a></li>
        <?php if ($userType == 99) { ?>
          <li><a href="admin_articles.php">管理後台</a></li>
        <?php }} ?>
          <li><a href="./handlers/logout.php">登出</a></li>
        <?php } else {?>
          <li><a href="login.php">登入</a></li>
        <?php }?>
      </ul>
    </section>
  </nav>
  <div class="banner">
    <h2 class="banner__title">隨便寫寫</h2>
    <p class="banner__desc">無病呻吟</p>
  </div>
  <main class="main">
    <div class="main__card">
      <form class="main__loginForm" method="POST" action="./handlers/handle_login.php">
        <div class="errMsg"><? echo $errMsg ?></div>
        <div><input type="text" name="username" placeholder="帳號" autofocus /></div>
        <div><input type="password" name="password" placeholder="密碼" /></div>
        <div><input type="submit" value="登入" /></div>
      </form>
    </div>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.</div>
  </footer>
  <script src="main.js"></script>
</body>
</html>