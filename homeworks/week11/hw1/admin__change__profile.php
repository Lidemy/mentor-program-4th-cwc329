<?php
  require_once('conn.php');
  require_once('utils.php');
  $id = NULL;
  if(!empty($_SESSION['id'])) {
    if(verifyUser($_SESSION['id'])) {
      $id = $_SESSION['id'];
      $isLogin = true;
      $userData = getUserData($id);
    }
  }
  if (!$id || $userData['userType'] != 99) {
    header('Location: index.php');
    die();
  }
  var_dump($_POST);
  $id = intval($_POST['id']);
  $groupNo = intval($_POST['groupNo']);
  $userType = intval($_POST['userType']);
  $sql = "UPDATE " . $userTable . " SET groupNo=?, userType=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iii', $groupNo, $userType, $id);
  $stmt->execute();
  header('Location: admin.php');
?>