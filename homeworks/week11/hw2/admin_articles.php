<?php
  require_once('conn.php');
  require_once('utils.php');
  require_once('admin_verify.php');

  $sql = sprintf("SELECT A.*, AC.category, U.nickname FROM %s AS A LEFT JOIN %s AS AC ON A.categories_id=AC.id LEFT JOIN %s AS U ON A.author_id=U.id ORDER BY A.id DESC", $articleTable, $categoryTable, $userTable);
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Admin - Articles</title>
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
    <h2 class="banner__title">文章管理</h2>
    <p class="banner__desc"><a href="admin_categories.php">分類管理</a></p>
  </div>
  <main class="main">
    <?php while($row = $result->fetch_assoc()) { ?>
      <div class="main__card">
        <div class="main__card__top">
          <div class="main__card__top__title"><a href="articles.php?id=<? echo $row['id']; ?>"><? echo $row['title']; ?></a></div>
          <div class="main__card__top__actions"  >          
            <?php if($userType == 99 || $userType == 98) { ?>
              <a class="main__card__top__editBtn" href="add_article.php?id=<? echo $row['id']; ?>">編輯</a>
              <?php if($userType == 99) { ?>
                <a class="main__card__top__deleteBtn" href="./handlers/delete_article.php?id=<? echo $row['id']; ?>">刪除</a>
            <?php }}?>
          </div>
        </div>
        <? echo '&#128395;&nbsp;' . $row['nickname']; ?>
        <? echo '&nbsp;&#128345;&nbsp;' . $row['created_at'];?>
        <a href="categories_list.php#catId<? echo $row['categories_id']; ?>"><? echo '&nbsp;&#128193;&nbsp;' . $row['category']; ?></a>
      </div>
    <? } ?>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.</div>
  </footer>
  <script src="main.js"></script>
</body>
</html>