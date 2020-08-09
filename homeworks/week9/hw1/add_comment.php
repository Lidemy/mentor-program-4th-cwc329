<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $id = $_SESSION['id'];
  if (!$id) {
    die('請先<a href="login.php">登入</a>再留言');
  }
  $nickname = getUserData($id)['nickname'];
  $comment = htmlEscape($_POST['comment']);
  $sql = sprintf("INSERT INTO cwc329_comments (nickname, comment) VALUE ('%s', '%s')", $nickname, $comment);
  $conn->query($sql);
  if (!empty($conn->error)) {
    echo $conn->error;
    die();
  }
  header('Location: index.php');
?>