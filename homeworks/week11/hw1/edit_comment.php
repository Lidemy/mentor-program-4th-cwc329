<?php
  require_once('conn.php');
  require_once('utils.php');
  $isLogin = false;
  $id = NULL;
  $userData = NULL;
  $errMsg = NULL;
  if(!empty($_GET['err'])) {
    if ($_GET['err'] === '5') {
      $errMsg = '&gt; Error: invalid inputs.';
    }
  }
  if(!empty($_SESSION['id'])) {
    if(verifyUser($_SESSION['id'])) {
      $id = $_SESSION['id'];
      $isLogin = true;
      $userData = getUserData($id);
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bulletin V1.1.0 - Edit</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div class="warningLine">Warning: This is a demo website.<br>For your own sake, please do not use your real-life account and password!!!</div>
  <main class="board">
    <section class="board__sec1">
      <h1 class="board__title"><a href="index.php">Bulletin</a></h1>
      <?php 
        if($errMsg) {
          echo '<div class="warningLine">' . $errMsg . '</div>';
        }
      ?>
      <?php if(!$isLogin){ ?>
        <div class="board__actions">
          <a id="loginBtn" class="board__loginBtn" href="login.php">&gt; Log In</a>
          <a id="regBtn" class="board__registerBtn" href="register.php">&gt; Register</a>
        </div>
      <?php } else { ?>
        <div class="board__actions">
          <a id="logoutBtn" class="board__logoutBtn" href="logout.php">&gt; Log Out</a>
        </div>
      <?php } ?>
    </section>
    <?php if(!$isLogin){ ?>
      <div class="board__pleaseLogin">
        <a href="login.php">&gt; Log in to edit comment</a> 
      </div>
    <?php } else { ?>
      <div class="board__editComment">
        <form class="c" method="POST" action="handle_edit_comment.php">
          <div class="board__addComment__form__info">mtr04 &gt; group<?php echo $userData['groupNo'];?> &gt; <?php echo htmlEscape($userData['nickname']); ?> &gt;</div>
          <textarea class="board__addComment__form__comment" name="comment" rows="1" autofocus required><?php
  $sql = "SELECT comment FROM " . $commentTable . " WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_POST['post_id']);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  echo htmlEscape($row['comment']);
?></textarea>
          <input type="hidden" name="user_id" value=<?php echo $_POST['user_id']; ?> />
          <input type="hidden" name="post_id" value=<?php echo $_POST['post_id']; ?> />
          <div><input class="board__addComment__form__submit" type="submit" value="&gt; return" /></div>
        </form>
      </div>
    <?php } ?>
  </main>
  <script src="./main.js"></script>
</body>
</html>