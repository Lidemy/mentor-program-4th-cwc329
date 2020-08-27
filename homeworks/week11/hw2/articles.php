<?php  
  require_once('conn.php');
  require_once('utils.php');

  $isSingleArticle = false;

  $articlePerPage = 5;
  $page = 1;
  
  $totalArticlesSql = "SELECT * FROM cwc329_articles WHERE is_deleted=0";
  $totalArticlesStmt = $conn->prepare($totalArticlesSql);
  $totalArticlesStmt->execute();
  $totalArticlesResult = $totalArticlesStmt->get_result();
  $totalArticles = $totalArticlesResult->num_rows;
  $totalPages = ceil($totalArticles / $articlePerPage);

  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }

  $offset = ($page - 1) * $articlePerPage;
  $limitSql = sprintf(" LIMIT %s OFFSET %s", $articlePerPage, $offset);

  $pageTitle = "Blog - Article";
  $sql = sprintf("SELECT A.*, AC.category, AC.is_deleted AS ac_is_deleted,U.nickname FROM %s AS A LEFT JOIN %s AS AC ON A.categories_id=AC.id LEFT JOIN %s AS U ON A.author_id=U.id WHERE A.is_deleted=0", $articleTable, $categoryTable, $userTable);
  $orderSql = " ORDER BY A.id DESC";
  
  $isLogin = false;
  $userType = 0;

  if (!empty($_SESSION['id'])) {
    $userId = $_SESSION['id'];
    $userData = getUserData($userId);
    $userType = $userData['userType'];
    $isLogin = true;
  }
  
  if(!empty($_GET['id'])) {
    $articleId = $_GET['id'];
    $sql = $sql . " AND A.id = ?" . $orderSql;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $articleId);
    $isSingleArticle = true;
  } else {
    $sql = $sql . $orderSql . $limitSql;
    $stmt = $conn->prepare($sql);
  }
  
  $stmt->execute();
  $result = $stmt->get_result();
  $articlesNum = $result->num_rows;
  if ($isSingleArticle) {
    $row = $result->fetch_assoc();
    $pageTitle = $pageTitle . " - " . htmlEscape($row['title']);
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><? echo htmlEscape($pageTitle); ?></title>
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
          if($isLogin) { ?>
          <li>Hi~ <? echo htmlEscape($userData['nickname']); ?></li>
            <? if($userType == 99 || $userType == 98) {
        ?>
          <li><a href="add_article.php">新增文章</a></li>
          <li><a href="admin_articles.php">管理後台</a></li>
        <?php } ?>
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
  <?php
    if($isSingleArticle ) {
      if ($row['is_deleted'] == 0) {
  ?>
      <div class="main__card">
        <div class="main__card__top">
          <div class="main__card__top__title"><a href="articles.php?id=<? echo $row['id']; ?>"><? echo htmlEscape($row['title']); ?></a></div>
          <div class="main__card__top__actions"  >
            <?php if($userType == 99 || $userType == 98) { ?>
              <a class="main__card__top__editBtn" href="add_article.php?id=<? echo $row['id']; ?>">編輯</a>
              <?php if($userType == 99) { ?>
                <a class="main__card__top__deleteBtn" href="./handlers/delete_article.php?id=<? echo $row['id']; ?>">刪除</a>
            <?php }}?>
          </div>
        </div>
        <div class="main__card__articleInfo">
          <? echo '&#128395;&nbsp;' . htmlEscape($row['nickname']); ?>
          <? echo '&nbsp;&#128345;&nbsp;' . $row['created_at'];?>
          <?php if ($row['ac_is_deleted'] == 0) { ?>
            <a href="categories_list.php#catId<? echo $row['categories_id']; ?>"><? echo '&nbsp;&#128193;&nbsp;' . htmlEscape($row['category']); ?></a>
          <? } else {?>
            <a href="categories_list.php#catId0">&nbsp;&#128193;&nbsp;未分類</a>
          <? } ?>
        </div>
        <div class="main__card__articleContent expand"><? echo $row['article']; ?></div>
      </div>
    <?
      } else { ?>       
        <div class="main__card__top">
          <div class="main__card__top__title">此文章已被刪除！</div>
        </div> 
      <? } ?>
    <? } else { 
      while($row = $result->fetch_assoc()) {
    ?>
      <div class="main__card">
        <div class="main__card__top">
          <div class="main__card__top__title"><a href="articles.php?id=<? echo $row['id']; ?>"><? echo htmlEscape($row['title']); ?></a></div>
          <div class="main__card__top__actions"  >
            <?php if($userType == 99 || $userType == 98) { ?>
              <a class="main__card__top__editBtn" href="add_article.php?id=<? echo $row['id']; ?>">編輯</a>
              <?php if($userType == 99) { ?>
                <a class="main__card__top__deleteBtn" href="./handlers/delete_article.php?id=<? echo $row['id']; ?>">刪除</a>
            <?php }}?>
          </div>
        </div>
        <div class="main__card__articleInfo">
          <? echo '&#128395;&nbsp;' . htmlEscape($row['nickname']); ?>
          <? echo '&nbsp;&#128345;&nbsp;' . $row['created_at'];?>
          <?php if ($row['ac_is_deleted'] == 0) { ?>
            <a href="categories_list.php#catId<? echo $row['categories_id']; ?>"><? echo '&nbsp;&#128193;&nbsp;' . htmlEscape($row['category']); ?></a>
          <? } else {?>
            <a href="categories_list.php#catId0">&nbsp;&#128193;&nbsp;未分類</a>
          <? } ?>
        </div>
        <div class="main__card__articleContent"><? echo $row['article']; ?></div>
        <div class="main__card__readmoreBtn">READ MORE</div>
      </div>
    <? } ?>
      <div class="main__pageControls">
        <div class="main__pageControls__left">
          <?php if ($page > 1) { ?>
            <div class="main__pageControls__first btn"><a href="articles.php?page=1">第一頁</a></div>
            <div class="main__pageControls__previous btn"><a href="articles.php?page=<? echo ($page - 1); ?>">上一頁</a></div>
          <? } ?>
        </div>
        <div class="main__pageControls__current">第 <? echo $page . ' / ' . $totalPages; ?> 頁</div>
        <div class="main__pageControls__right">
          <?php if ($page < $totalPages) { ?>
            <div class="main__pageControls__next btn"><a href="articles.php?page=<? echo ($page + 1); ?>">下一頁</a></div>
            <div class="main__pageControls__last btn"><a href="articles.php?page=<? echo ($totalPages); ?>">最後一頁</a></div>
          <?php } ?>
        </div>
      </div>
    <? } ?>
  </main>
  <footer class="footer">
    <div class="footer__content">
      Copyright © 2020 cwc329's Blog All Rights Reserved.</div>
  </footer>
  <script src="./js/main.js"></script>
</body>
</html>