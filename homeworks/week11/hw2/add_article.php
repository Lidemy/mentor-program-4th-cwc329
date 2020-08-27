<?php
  require_once('conn.php');
  require_once('utils.php');
  require_once('admin_verify.php');

  $isEditing = false;
  $editArticleId = Null;
  $editArticleSql = NULL;
  if (!empty($_GET['id'])) {
    $editArticleId = $_GET['id'];
    $isEditing = true;
    $editArticleSql = sprintf("SELECT * FROM %s WHERE id = ?", $articleTable);
    $editStmt = $conn->prepare($editArticleSql);
    $editStmt->bind_param('s', $editArticleId);
    $editStmt->execute();
    $editArticle = $editStmt->get_result()->fetch_assoc();
  }
  $catSql = sprintf("SELECT * FROM %s WHERE is_deleted = 0 AND NOT id = 0", $categoryTable);
  $catStmt = $conn->prepare($catSql);
  $catStmt->execute();
  $catResult = $catStmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Write An Article</title>
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
    <form method="POST" action="./handlers/handle_add_article.php" class="addArticle__form">
      <div>Title: <input id="articleTitle" type="text" name="title" placeholder="請輸入文章標題" value="<? if($editArticleId) {echo htmlEscape($editArticle['title']);} ?>" autofocus></div>
      <div>
        Caterogy: 
        <select name="category" placeholder="請選擇文章分類">
          <option value="" <? if(!$isEditing){echo " selected";} ?>>選擇文章分類</option>
          <?php while($cat = $catResult->fetch_assoc()) { ?>
            <option value="<? echo $cat['id']; ?>" <? if($isEditing && $editArticle['categories_id'] == $cat['id']){echo " selected";} ?>><? echo htmlEscape($cat['category']); ?></option>
          <?php } ?>
        </select></div>
      <div>Article: <textarea id="articleEditor" name="article" ><?php if($editArticleId) {echo $editArticle['article'];} ?></textarea></div>
      <input type="hidden" name="article_id" value="<? if($editArticleId) {echo $editArticle['id'];} ?>" />
      <input type="hidden" name="author_id" value="<? if($editArticleId) {echo $editArticle['author_id'];} else {echo $_SESSION['id'];} ?>" />
      <div><input type="submit" value="發布文章" class="addArticle__form__submitBtn" />
    </form>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.</div>
  </footer>
  <script>
    CKEDITOR.replace('articleEditor'/*,{removePlugins: 'sourcearea',}*/);
  </script>
</body>