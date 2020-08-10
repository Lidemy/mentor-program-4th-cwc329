<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $password = encodeV1($_POST['password']);
  $username = htmlEscape($_POST['username']);
  $sql = sprintf("SELECT * FROM cwc329_users WHERE username='%s'", $username);
  $result = $conn->query($sql);
  if ($conn->affected_rows === 0) {
    header('Location: login.php?err=1');
    die();
  }
  $row = $result->fetch_assoc();
  if ($row['id'] > 11) {
    $password = hashPd($_POST['password']);
  }
  if ($password !== $row['password']) {
    header('Location: login.php?err=1');
    die();
  }
  $_SESSION['id'] = $row['id'];
  header('Location: index.php');
?>