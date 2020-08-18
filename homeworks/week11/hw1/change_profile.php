<?php
  require_once('conn.php');
  require_once('utils.php');
  if(!verifyUser($_SESSION['id'])) {
    session_destroy();
    header('Location: index.php?err=1');
    die();
  }
  if(empty($_POST['nickname']) || strlen(trim($_POST['nickname'])) === 0) {
    header('Location: index.php?err=5');
    die();
  }
  $id = $_SESSION['id'];
  $newNickname = $_POST['nickname'];
  $sql = "UPDATE " . $userTable . " SET nickname=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $newNickname, $id);
  $result = $stmt->execute();
  var_dump($result);
  header('Location: index.php');
?>