<?php
  require_once('conn.php');
  require_once('utils.php');
  $sql = "INSERT INTO " . $userTable . " (nickname, groupNo, username, password) VALUES(?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $nickname = trim($_POST['nickname']);
  $username = trim($_POST['username']);
  $group = $_POST['group'];
  if (!(preg_match($unAndPdRegex, $username) && preg_match($unAndPdRegex, $_POST['password']) && preg_match("/^[1-6]$/", $group))) {
    header('Location: register.php?err=3');
    die();
  }
  $group = intval($_POST['group']);
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $stmt->bind_param('siss',$nickname, $group, $username, $password);
  $stmt->execute();
  if (!empty($stmt->error)) {
    if ($stmt->errno === 1062) {
      if (strpos($stmt->error, 'nickname')) {
        header('Location: register.php?err=1');
      } else {
        header('Location: register.php?err=2');
      }
    }
    die('code:' . $conn->errno);
  }
  $sql2 = "SELECT id FROM " . $userTable . " WHERE username=?";
  $stmt2 = $conn->prepare($sql2);
  $stmt2->bind_param('s', $username);
  $stmt2->execute();
  $result = $stmt2->get_result()->fetch_assoc();
  $userId = $result['id'];
  $_SESSION['id'] = $userId;
  header('Location: index.php');
?>