<?php
  require_once('conn.php');
  require_once('utils.php');
  $_POST['password'] = hashPd($_POST['password']);
  $sql = "INSERT INTO cwc329_users (username, nickname, password) VALUE ('" . $_POST['username'] . "', '" . $_POST['nickname'] . "', '" . $_POST['password'] . "')";
  $conn->query($sql);
  if (!empty($conn->error)) {
    if ($conn->errno === 1062) {
      //die($conn->error);
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