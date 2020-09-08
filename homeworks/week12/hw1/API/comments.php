<?php
  require_once('utils.php');
  $method = $_SERVER['REQUEST_METHOD'];
  $commentId = Null;
  $userId = Null;
  $isLogin = false;
  if (!empty($_GET['id'])) {
    $commentId = $_GET['id'];
  }
  if (!empty($_SESSION['id']) && verifyUser($_SESSION['id'])) {
    $userId = intval($_SESSION['id']);
    $isLogin = true;
  }
  switch ($method) {
    case "GET":
      echo getComments($commentId);
      break;
    case "POST":
      if ($isLogin) {
        if ($commentId) {
          echo editComment($commentId);
        } else {
          echo addComment();
        }
      }
      break;
    case "DELETE":
      echo deleteComment($commentId);
      break;
  }

  function getComments($commentId) {
    global $commentTable, $userTable;
    if ($commentId) {
      $commentId = intval($commentId);
      $sql = sprintf("SELECT C.*, U.username, U.nickname, U.groupNo FROM %s AS C LEFT JOIN %s AS U ON C.user_id=U.id WHERE C.id = ? AND is_deleted = 0", $commentTable, $userTable);
      $result = prepareStatement($sql, 'i', $commentId);
    } else {
      $limit = 20;
      $offset = 0;
      if (!empty($_GET['limit'])) {
        $limit = intval($_GET['limit']);
      }
      if (!empty($_GET['offset'])) {
        $offset = $_GET['offset'];
      }
      $sql = sprintf("SELECT C.*, U.username, U.nickname, U.groupNo FROM %s AS C LEFT JOIN %s AS U ON C.user_id=U.id WHERE is_deleted = 0 order by id desc LIMIT ?,?", $commentTable, $userTable);
      $result = prepareStatement($sql, 'ii', $offset, $limit);
    }
    $comments = array();
    while ($row = $result->fetch_assoc()) {
      array_push($comments, $row);
    }
    $comments = json_encode($comments);
    header('Content-type:application/json;charset=utf-8');
    return $comments;
  }

  function addComment() {
    global $commentTable, $userTable, $userId;
    $comment = $_POST['comment'];
    if ($userId != $_POST['userId'] || getUserData($userId)['userType'] == 1) {
      return;
    }
    $sql = sprintf("INSERT INTO %s (comment, user_id) VALUES (?, ?)", $commentTable);
    $result = prepareStatement($sql, 'si', $comment, $userId);
  }

  function editComment($commentId) {
    global $commentTable, $userTable, $userId;
    $userData = getUserData($userId);
    $userType = $userData['userType'];
    $comment = $_POST['comment'];
    $postId = intval($commentId);
    if (!((verifyUser($userId) && $userId == $_POST['userId']) || $user_type == 99 || $user_type == 98)) {
      return;
    }
    $sql = sprintf("UPDATE %s SET comment = ? WHERE id = ?", $commentTable);
    $result = prepareStatement($sql, 'si', $comment, $postId);
  }

  function deleteComment($commentId) {
    global $commentTable, $userTable, $userId;
    $userData = getUserData($userId);
    $userType = $userData['userType'];
    $postId = intval($commentId);
    $postData = json_decode(getComments($postId));
    if (!((verifyUser($userId) && $userId == $postData[0]->user_id) || $user_type == 99)) {
      return/* 'you shall not pass'*/;
    }
    $sql = sprintf("UPDATE %s SET is_deleted = 1 WHERE id = ?", $commentTable);
    $result = prepareStatement($sql, 'i', $postId);
  }
?>