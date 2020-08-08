<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $id = $_SESSION['id'];
  $nickname = getUserData($id)['nickname'];
  $comment = htmlspecialchars($_POST['comment']);
  $sql = sprintf("INSERT INTO cwc329_comments (nickname, comment) VALUE ('%s', '%s')", $nickname, $comment);
  $conn->query($sql);
  if (!empty($conn->error)) {
    echo $conn->error;
    die();
  } 
  header('Location: index.php');
?>