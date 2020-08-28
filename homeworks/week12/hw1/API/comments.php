<?php
  require_once('utils.php');
  $method = $_SERVER['REQUEST_METHOD'];
  $id = Null;
  if (!empty($_GET['id'])) {
    $id = $_GET['id'];
  }
  switch ($method) {
    case "GET":
      echo getComments();
      break;
    case "POST":
      if ($id) {
        editComment($id);
      } else {
        addComment();
      }
      break;
    case "DELETE":
      deleteComment($id);
      break;
  }

  function getComments() {
    global $commentTable;
    $sql = sprintf("SELECT * FROM %s WHERE is_deleted = ? order by id desc", $commentTable);
    $result = prepareStatement($sql, 's', '0');
    $comments = array();
    while ($row = $result->fetch_assoc()) {
      array_push($comments, $row);
    }
    $comments = json_encode($comments);
    header('Content-type:application/json;charset=utf-8');
    return $comments;
  }

  function addComment() {
    global $commentTable;
    global $userTable;
    $comment = $_POST['comment'];
    $userId = intval($_POST['userId']);
    $sql = sprintf("INSERT INTO %s (comment, user_id) VALUES (?, ?)", $commentTable);
    echo $sql . '<br>';
    $result = prepareStatement($sql, 'si', $comment, $userId);
  }

  function editComment($id) {
    global $commentTable;
    global $userTable;
    $comment = $_POST['comment'];
    $postId = intval($id);
    $sql = sprintf("UPDATE %s SET comment = ? WHERE id = ?", $commentTable);
    $result = prepareStatement($sql, 'si', $comment, $postId);
  }

  function deleteComment($id) {
    global $commentTable;
    global $userTable;
    $postId = intval($id);
    $sql = sprintf("UPDATE %s SET is_deleted = 1 WHERE id = ?", $commentTable);
    $result = prepareStatement($sql, 'i', $postId);
  }
?>