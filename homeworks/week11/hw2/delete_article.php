<?php
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_SESSION['id'])) {
    header('Location: login.php');
    die();
  }
  
  $userType = getUserData($_SESSION['id'])['userType'];
  if (!($userType == 99 || $userType == 98)) {
    header('Location: index.php');
    die();
  }

  if(empty($_GET['id'])) {
    header('Location: index.php');
    die();
  }

  $sql = sprintf("UPDATE %s SET is_deleted=1 WHERE id = ?", $articleTable);
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_GET['id']);
  $result = $stmt->execute();
  var_dump($result);
  header('Location: ' . $_SERVER["HTTP_REFERER"]);
?>