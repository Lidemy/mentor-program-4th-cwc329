<?php
  require_once('conn.php');
  require_once('utils.php');
  require_once('admin_verify.php');

  $sql = sprintf("SELECT * FROM %s WHERE NOT id=0", $categoryTable);
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Admin - Categories</title>
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
        <li>Hi~ <? echo $userData['nickname']; ?></li>
        <li><a href="add_article.php">新增文章</a></li>
        <li><a href="admin_articles.php">管理後台</a></li>
        <li><a href="./handlers/logout.php">登出</a></li>
      </ul>
    </section>
  </nav>
  <div class="banner">
    <h2 class="banner__title">分類管理</h2>
    <p class="banner__desc"><a href="admin_articles.php">文章管理</a></p>
  </div>
  <main class="main">
    <div class="main__card">
      <div class="main__card__top">
        <div class="main__card__top__title">新增分類</div>
        <div class="main__card__top__actions"  >          
          <?php if($userType == 99 || $userType == 98) { ?>
            <a class="main__card__top__addBtn btn" href="add_category.php">新增</a>
          <?php }?>
        </div>
      </div>
    </div>
    <?php while($row = $result->fetch_assoc()) { ?>
      <div class="main__card">
        <div class="main__card__top">
          <div class="main__card__top__title"><? echo $row['category']; ?></div>
          <div class="main__card__top__actions"  >          
            <?php if($userType == 99 || $userType == 98) { ?>
              <a class="main__card__top__editBtn" href="add_category.php?id=<? echo $row['id']; ?>">編輯</a>
              <?php if($userType == 99) { ?>
                <a class="main__card__top__deleteBtn" href="./handlers/delete_category.php?id=<? echo $row['id']; ?>">刪除</a>
            <?php }}?>
          </div>
        </div>
      </div>
    <? } ?>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.
    </div>
  </footer>
</body>
</html>