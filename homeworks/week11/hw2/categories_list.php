<?php
  require_once('conn.php');
  require_once('utils.php');

  $isLogin = false;
  $userType = 0;

  if (!empty($_SESSION['id'])) {
    $userId = $_SESSION['id'];
    $userData = getUserData($userId);
    $userType = $userData['userType'];
    $isLogin = true;
  }

  $catSql = sprintf("SELECT * FROM %s WHERE is_deleted=0 AND NOT id = 0 ORDER BY id DESC", $categoryTable);
  $catStmt = $conn->prepare($catSql);
  $catStmt->execute();
  $result = $catStmt->get_result();
  $catgories = Array();
  while ($row = $result->fetch_assoc()) {
    $catId = $row['id'];
    $catgories[$catId] = $row['category'];
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Categories</title>
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
          <li>Hi~ <? echo $userData['nickname']; ?></li>
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
    foreach ($catgories as $key => $value) {
      $articlesSql = sprintf("SELECT A.*, AC.category, U.nickname FROM %s AS A LEFT JOIN %s AS AC ON A.categories_id = AC.id LEFT JOIN %s AS U ON A.author_id = U.id WHERE A.categories_id = %u ORDER BY A.id DESC", $articleTable, $categoryTable, $userTable, $key);
      $articlesStmt = $conn->prepare($articlesSql);
      $articlesStmt->execute();
      $result = $articlesStmt->get_result();
  ?>
    <div class="main__card" id="catId<? echo $key; ?>">
      <div class="main__card__top">
        <div class="main__card__top__title" ><? echo $value; ?></div>
        <div class="main__card__top__actions"></div>
      </div>
      <div class="main__card__articleInfo"><? echo "總共有 " . $result->num_rows . " 篇文章"; ?></div>
      <div class="main__card__categoriesContent expand">
        <? while ($row = $result->fetch_assoc()) {?>
          <div>
            <a href="articles.php?id=<? echo $row['id']; ?>"><? echo $row['title']; ?></a>
            <span><? echo '&#128395;&nbsp;' . $row['nickname']; ?><? echo '&nbsp;&#128345;&nbsp;' . $row['created_at'];?></sapn>
        </div>
        <? } ?>
      </div>
    </div>
    <? } ?>
    <div class="main__card" id="catId0">
      <?php
        $sql = sprintf("SELECT A.*, AC.category, U.nickname FROM %s AS A LEFT JOIN %s AS AC ON A.categories_id = AC.id LEFT JOIN %s AS U ON A.author_id = U.id WHERE (A.categories_id = 0 OR AC.is_deleted = 1) AND A.is_deleted = 0 ORDER BY A.id DESC", $articleTable, $categoryTable, $userTable);;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
      ?>
      <div class="main__card__top">
        <div class="main__card__top__title" >未分類</div>
        <div class="main__card__top__actions"></div>
      </div>
      <div class="main__card__articleInfo"><? echo "總共有 " . $result->num_rows . " 篇文章"; ?></div>
      <div class="main__card__categoriesContent expand">
          <?php while($row = $result->fetch_assoc()) { ?>
            <div>
              <a href="articles.php?id=<? echo $row['id']; ?>"><? echo $row['title']; ?></a>
              <span><? echo '&#128395;&nbsp;' . $row['nickname']; ?><? echo '&nbsp;&#128345;&nbsp;' . $row['created_at'];?></sapn>
            </div>
          <? } ?>
      </div>
    </div>
  </main>
</body>
</html>