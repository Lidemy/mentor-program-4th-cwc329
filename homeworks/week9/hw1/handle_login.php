<?php
  session_start();
  require_once('conn.php');
  $password = base64_encode($_POST['password']);
  $username = $_POST['username'];
  $sql = sprintf("SELECT * FROM cwc329_users WHERE username='%s' and password='%s'", $username, $password);
  $result = $conn->query($sql);
  if ($conn->affected_rows === 0) {
    header('Location: login.php?err=1');
    die();
  }
  $row = $result->fetch_assoc();
  $_SESSION['id'] = $row['id'];
  header('Location: index.php');
?>