<?php
  require_once('conn.php');
  require_once('utils.php');
  $isLogin = false;
  $id = NULL;
  $userData = NULL;
  $errMsg = NULL;
  $UserTypes = Array('normal'=>0,'banned'=>1,'editor'=>98,'admin'=>99);
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
  if (!$id || $userData['userType'] != 99) {
    header('Location: index.php');
    die();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bulletin V1.1.0 - Admin</title>
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
    <h2>Bulletin User Management</h2>
    <table class="admin__userTypeTable">
      <thead>
        <tr>
          <th colspan="2">UserTypes</th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <th>Type</th>
            <th>No.</th>
          </tr>
          <?php foreach($UserTypes as $key=>$value) { ?>
            <tr>
            <td><? echo $key; ?></td>
            <td><? echo $value; ?></td>
          </tr>
          <?php } ?>
        </tbody>
    </table>
    <div class="inline_block id"><? echo 'id' ?></div>
          <div class="inline_block username"><? echo 'username' ?></div>
          <div class="inline_block nickname"><? echo 'nickname' ?></div>
          <div class="inline_block groupNo"><? echo 'groupNo' ?></div>
          <div class="inline_block userType"><? echo 'userType' ?></div>
    <?php
      $sql = "SELECT * FROM " . $userTable;
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result();
      while ($row = $result->fetch_assoc()) {
    ?>
      <form class="admin__changeUserProfile" method="POST" action="admin__change__profile.php">
        <div class="admin__changeUserProfile__userProfile">
          <div class="inline_block id"><? echo $row['id']; ?><input type="hidden" name="id" value=<? echo $row['id']; ?>></div>
          <div class="inline_block username"><? echo htmlEscape($row['username']); ?></div>
          <div class="inline_block nickname"><? echo htmlEscape($row['nickname']); ?></div>
          <div class="inline_block groupNo">
            <select name="groupNo">
              <?php
                for ($i=1; $i<=6; $i++) {
                  echo '<option value=' . $i .' ' ;
                  if ($row['groupNo'] == $i) {
                    echo 'selected';
                  }
                  echo '/>' . $i . '</option>';
                }
              ?>
            </select>
          </div>
          <div class="inline_block userType">
            <select name="userType">
              <?php
                foreach ($UserTypes as $key=>$value) {
                  echo '<option value=' . $value .' ' ;
                  if ($row['userType'] == $value) {
                    echo 'selected';
                  }
                  echo '/>' . $value . '</option>';
                }
              ?>
            </select>
          </div>
          <div class="inline_block"><input type="submit" value="&gt; change"></div>
        </div>
      </form>
    <?php } ?>
  </main>
  <script src="./main.js"></script>
</body>
</html>