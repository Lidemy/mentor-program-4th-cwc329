<?php
  require_once('conn.php');
  require_once('utils.php');
  $username = $_POST['username'];
  $password = $_POST['password'];
  if (!(preg_match($unAndPdRegex, $username) && preg_match($unAndPdRegex, $_POST['password']))) {
    header('Location: login.php?err=3');
    die();
  }
  $sql = "SELECT * FROM " . $userTable . " WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s',  $username);
  print_r($stmt);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if(password_verify($password, $row['password'])) {
    echo 'true';
  } else {
    header('Location: login.php?err=1');
    die();
  }
  $_SESSION['id'] = $row['id'];
  header('Location: index.php');
  echo '<br>';
?>