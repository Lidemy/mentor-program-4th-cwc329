<?php
  require_once('conn.php');
  require_once('utils.php');
  if(!verifyUser($_SESSION['id'])) {
    session_destroy();
    header('Location: index.php?err=1');
    die();
  }
  if(getUserData($_SESSION['id'])['userType'] == 1) {
    header('Location: index.php?err=2');
    die();
  }
  if (empty($_POST['comment']) || strlen(trim($_POST['comment'])) === 0) {
    header('Location: index.php?err=5');
    die();
  }
  $sql = "INSERT INTO " . $commentTable . " (user_id, comment) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is', $_SESSION['id'], $_POST['comment']);
  $result = $stmt->execute();
  if(!$result) {
    session_destroy();
    header('Location: index.php?err=1');
    die();
  } else {
    header('Location: index.php');
    die();
  }
?>