<?php
  require_once('utils.php');

  function getAllComments() {
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

echo getAllComments();
?>