<?php
  require_once('conn.php');
  require_once('utils.php');

  $getCommentsSql = sprintf("SELECT * FROM %s WHERE is_deleted = 0", $commentTable);
  $stmt = $conn->prepare($getCommentsSql);
  
?>