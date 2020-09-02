<?php
  require_once('../conn.php');
  require_once('../utils.php');
  require_once('../admin_verify.php');

  if(empty($_GET['id'])) {
    header('Location:' . $_SERVER["HTTP_REFERER"]);
    die();
  }

  $sql = sprintf("UPDATE %s SET is_deleted=1 WHERE id = ?", $categoryTable);
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_GET['id']);
  $result = $stmt->execute();
  var_dump($result);
  header('Location: ' . $_SERVER["HTTP_REFERER"]);
?>