<?php  
  require_once('conn.php');
  require_once('utils.php');
  
  $isLogin = false;
  $userType = 0;

  if (!empty($_SESSION['id'])) {
    $userId = $_SESSION['id'];
    $userType = getUserData($userId)['userType'];
    $isLogin = true;
  }

  $limit = 5;
  $sql = "SELECT A.*, AC.category FROM " . $articleTable . " as A LEFT JOIN " . $categoryTable . " as AC ON A.categories_id=AC.id ORDER BY A.id DESC LIMIT ?" ;
    
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $limit);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog</title>
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
          <li><a href="admin_articles.php">管理後台</a></li>
        <?php } ?>
          <li><a href="logout.php">登出</a></li>
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
    <?php 
      while($row = $result->fetch_assoc()) { 
        if ($row['is_deleted'] == 0) {
    ?>
      <div class="main__card">
        <div class="main__card__top">
          <div class="main__card__top__title"><a href="articles.php?id=<? echo $row['id']; ?>"><? echo $row['title']; ?></a></div>
          <div class="main__card__top__actions"  >
            <?php if($userType == 99 || $userType == 98) { ?>
              <a class="main__card__top__editBtn" href="add_article.php?id=<? echo $row['id']; ?>">編輯</a>
              <?php if($userType == 99) { ?>
                <a class="main__card__top__deleteBtn" href="delete_article.php?id=<? echo $row['id']; ?>">刪除</a>
            <?php }}?>
          </div>
        </div>
        <div class="main__card__articleInfo"><? echo $row['created_at'] . ' ' . $row['category']; ?></div>
        <div class="main__card__articleContent"><? echo $row['article']; ?></div>
        <div class="main__card__readmoreBtn">READ MORE</div>
      </div>
    <? }} ?>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.</div>
  </footer>
  <script src="main.js"></script>
</body>
</html>