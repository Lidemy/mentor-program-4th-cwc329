<?php
  require_once('conn.php');
  require_once('utils.php');
  require_once('admin_verify.php');

  $isEditing = false;
  $editCatId = Null;
  $editCatSql = NULL;
  if (!empty($_GET['id'])) {
    $editCatId = $_GET['id'];
    $isEditing = true;
    $editCatSql = sprintf("SELECT * FROM %s WHERE id = ?", $categoryTable);
    $editStmt = $conn->prepare($editCatSql);
    $editStmt->bind_param('s', $editCatId);
    $editStmt->execute();
    $editCat = $editStmt->get_result()->fetch_assoc();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Category Edit</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
  <link rel="stylesheet" href="style.css">
  <script src="//cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></script>
</head>
<body>
  <nav>
    <section class="nav__left">
      <h1 class="nav__title">
        <a href="index.php">cwc329's Blog</a>
      </h1>
      <ul>
        <li><a href="article_list.php">文章列表</a></li>
        <li><a href="categories_list.php">分類專區</a></li>
        <li><a href="about_me.php">關於我</a></li>
      </ul>
    </section>
    <section class="nav__right">
      <ul>
        <li><a href="add_article.php">新增文章</a></li>
        <li><a href="admin_articles.php">管理後台</a></li>
        <li><a href="./handlers/logout.php">登出</a></li>
      </ul>
    </section>
  </nav>
  <div class="banner">
    <h2 class="banner__title">隨便寫寫</h2>
    <p class="banner__desc">無病呻吟</p>
  </div>
  <main class="main">
    <form method="POST" action="./handlers/handle_add_category.php" class="addCat__form">
      <div>Category Name: <input id="cat" type="text" name="category" placeholder="請輸入分類名稱" value="<? if($editCatId) {echo $editCat['category'];} ?>" autofocus></div>
      <input type="hidden" name="category_id" value="<? if($editCatId) {echo $editCat['id'];} ?>" />
      <div><input type="submit" value="送出" class="addCat__form__submitBtn" />
    </form>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.</div>
  </footer>
</body>
</html>