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
    }else{
      $errMsg = '&gt; Error: something went wrong.<br>You were forced logged out.';
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
  <title>Bulletin V1.1.0</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
<div class="warningLine">Warning: This is a demo website.<br>For your own sake, please do not use your real-life account and password!!!</div>
  <main class="board">
    <section class="board__sec1">
      <h1 class="board__title"><a href="index.php">Bulletin</a></h1>
      <?php if(!$isLogin){ ?>
        <div class="board__actions">
          <a id="loginBtn" class="board__loginBtn" href="login.php">&gt; Log In</a>
          <a id="regBtn" class="board__registerBtn" href="register.php">&gt; Register</a>
        </div>
      <?php } else { ?>
        <div class="board__actions">
          <?php if ($userData['userType'] == 99) { ?>
            <a id="adminBtn" class="board__adminBtn" href="admin.php">&gt; Admin</a>
          <?php } ?>
          <span id="editNicknameBtn" class="board__editNicknameBtn">&gt; Edit Nickname</span>
          <a id="logoutBtn" class="board__logoutBtn" href="logout.php">&gt; Log Out</a>
        </div>
      <?php } ?>
    </section>
      <?php 
        if($errMsg) {
          echo '<div class="warningLine">' . $errMsg . '</div>';
        }
      ?>
      <?php if(!$isLogin){ ?>
        <div class="board__pleaseLogin">
          <a href="login.php">&gt; Log in to post comment</a> 
        </div>
      <?php } else if($userData['userType'] == 1) { ?>
        <div class="board__pleaseLogin">
          You Are Banned From Commenting!
        </div>
      <?php } else { ?>
        <div class="board__editNickname hide">
          <form class="board__editNickname__form" method="POST" action="change_profile.php">
            <div class="board__editNickname__form__">New Nickname &gt;</div>
            <div><input type="text" class="board__editNickname__form__input" name="nickname" required/></div>
            <div><input class="board__editNickname__form__submit" type="submit" value="&gt; return" /></div>
          </form>
        </div>
        <div class="board__addComment">
          <form class="c" method="POST" action="add_comment.php">
            <div class="board__addComment__form__info">mtr04 &gt; group<?php echo $userData['groupNo'];?> &gt; <?php echo htmlEscape($userData['nickname']); ?> &gt;</div>
            <textarea rows="1" class="board__addComment__form__comment" name="comment" autofocus required></textarea>
            <div><input class="board__addComment__form__submit" type="submit" value="&gt; return" /></div>
          </form>
        </div>
      <?php } ?>
    <secion class="board__sec2">
      <div class="board__bulletin">
        <?php
          $sql = "select C.*, U.username, U.nickname, U.groupNo from " . $commentTable . " as C left join " . $userTable . " as U on C.user_id=U.id order by C.id DESC";
          $stmt = $conn->prepare($sql);
          $stmt->execute();
          $commentsResult = $stmt->get_result();
          while($row = $commentsResult->fetch_assoc()) {
            if ($row['is_deleted'] == 0) {
        ?>
          <div class="board__bulletin__card">
            <div class="board__bulletin__card__top">
              <div class="board__bulletin__card__nickname"><?php echo 'mtr04 &gt; group' . htmlEscape($row['groupNo']) . ' &gt; ' . htmlEscape($row['nickname']) . ' &gt;'; ?></div>
              <?php
                if($id) {
                  if ($row['user_id'] == $id || $userData['userType'] == 99 || $userData['userType'] == 98) {
              ?>
              <div class="board__bulletin__card__actions">
                <form class="board__bulletin__card__editCommentform" method="POST" action="edit_comment.php">
                  <input type="hidden" name="user_id" value=<?php echo $row['user_id']; ?> />
                  <input type="hidden" name="post_id" value=<?php echo $row['id']; ?> />
                  <input type="submit" value="&gt; Edit" />
                </form>
              <?php
                }
                if ($row['user_id'] == $id || $userData['userType'] == 99) {
              ?>
                &nbsp;
                <form class="board__bulletin__card__deleteCommentform" method="POST" action="delete_comment.php">
                <input type="hidden" name="user_id" value=<?php echo $row['user_id']; ?> />
                  <input type="hidden" name="post_id" value=<?php echo $row['id']; ?> />
                  <input type="submit" value="&gt; Delete" />
                </form>
                <?php }} ?>
              </div>
            </div>
            <p class="board__bulletin__card__comment">
              <?php echo nl2br(htmlEscape($row['comment'])); ?>
            </p>
            <div class="board__bulletin__card__time">
              <?php echo htmlEscape($row['created_at']); ?>
            </div>
          </div>
        <?php }} ?>
      </div>
    </section>
  </main>
  <script src="./main.js"></script>
</body>
</html>
