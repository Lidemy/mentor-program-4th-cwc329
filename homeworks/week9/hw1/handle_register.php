<?php
  require_once('conn.php');
  require_once('utils.php');
  $password = hashPd($_POST['password']);
  $nickname = htmlEscape($_POST['nickname']);
  $username = htmlEscape($_POST['username']);
  $sql = sprintf("INSERT INTO cwc329_users (username, nickname, password) VALUE ('%s', '%s', '%s')", $username, $nickname, $password);
  $conn->query($sql);
  if (!empty($conn->error)) {
    if ($conn->errno === 1062) {
      if (strpos($conn->error, 'nickname')) {
        header('Location: register.php?err=1');
      } else {
        header('Location: register.php?err=2');
      }
    }
    die('code:' . $conn->errno);
  }
  header('Location: index.php');
?>