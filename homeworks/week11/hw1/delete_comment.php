<?php
  require_once('conn.php');
  require_once('utils.php');
  $session_id = $_SESSION['id'];
  $user_type = getUserData($session_id)['userType'];
  $user_id = $_POST['user_id'];
  $post_id = $_POST['post_id'];
  if ((!verifyUser($session_id) || $session_id != $user_id) && $user_type != 99) {
    session_destroy();
    header('Location: index.php?err=1');
    die();
  }
  $sql = "UPDATE " . $commentTable . " SET is_deleted=1 WHERE id=?";
  echo $sql . '<br>';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $post_id);
  $stmt->execute();
  header('Location: index.php');
?>