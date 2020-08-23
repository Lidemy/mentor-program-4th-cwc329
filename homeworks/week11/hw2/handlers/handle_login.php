<?php
  require_once('../conn.php');
  require_once('../utils.php');

  if(!empty($_SESSION['id'])) {
    header('Location: ../index.php');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  if (!(preg_match($unAndPdRegex, $username) && preg_match($unAndPdRegex, $_POST['password']))) {
    header('Location: ../login.php?err=3');
    die();
  }
  $sql = "SELECT * FROM " . $userTable . " WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s',  $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if(!empty($row['password']) && password_verify($password, $row['password'])) {
    echo 'true<br>';
    $_SESSION['id'] = $row['id'];
  } else {
    echo 'false<br>';
    header('Location: ../login.php?err=1');
    die();
  }
  header('Location: ../index.php');
?>