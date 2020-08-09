
<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $id = Null;
  $nickname = Null;
  if (!empty($_SESSION['id'])) {
    $id = $_SESSION['id'];
    $nickname = getUserData($id)['nickname'];
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css" />
  <title>簡易留言板</title>
</head>
<body>
  <div class="warningLine">Warning: 此為測試用留言板，請勿使用您常用與真實的帳號密碼，以免資料外洩！！！</div>
  <main class="board">
    <h1>留言板</h1>
    <div class="logInAndReg">
      <?php if(!$id){ ?>
        <a href="register.php">註冊</a> <a href="login.php">登入</a>
      <?php } else { ?>
        <p> Hi~ <?php echo $nickname . '！ 今天是 ' . date('Y-m-d'); ?><br>
        <a href="logout.php">登出</a>
      <?php } ?>
    </div>
    <div class="board__adding">
      <?php if(!$id){ ?>
        <h2>留言請先登入</h2>
      <?php } else { ?>
        <form class="board__adding__form" method="POST" action="add_comment.php">
          <div class="board__adding__form__nickname">暱稱：<?php echo $nickname; ?></div>
          <div class="board__adding__form__comment">留言：<textarea name="comment" row="6" required></textarea></div>
          <div class="board__adding__form__submit"><input type="submit" value="送出" /></div>
        </form>
      <?php } ?>
    </div>
    <?php 
      $result = $conn->query('select * from cwc329_comments order by `created_at` ASC');
      $floor = 1;
      while ($row = $result->fetch_assoc()) { ?>
    <div class="board__card">
      <div class="board__card__photo"></div>
      <div class="board__card__comment">
        <div class="board__card__comment__info">
          <?php echo $floor . '樓' . ' '; ?>
          <span><?php echo $row['nickname']; ?></span><br> <?php echo $row['created_at'] ?>
        </div>
        <div class="board__card__comment__content">
          <?php echo $row['comment'] ?>
        </div>
      </div>
    </div>
    <?php 
    $floor ++;
    } 
  ?>
  </main>
</body>
</html>