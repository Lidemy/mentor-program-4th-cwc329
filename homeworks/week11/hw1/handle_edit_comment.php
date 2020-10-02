<?php
  require_once('conn.php');
  require_once('utils.php');
  $user_type = getUserData($_SESSION['id'])['userType'];
  if (!((verifyUser($_SESSION['id']) && $_SESSION['id'] == $_POST['user_id']) || $user_type == 99 || $user_type == 98)) {
    session_destroy();
    header('Location: index.php?err=1');
    die();
  }
  if (empty($_POST['comment']) || strlen(trim($_POST['comment'])) === 0) {
    header('Location: index.php?err=5');
    die();
  }
  $sql = "UPDATE " . $commentTable . " SET comment=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $_POST['comment'], $_POST['post_id']);
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