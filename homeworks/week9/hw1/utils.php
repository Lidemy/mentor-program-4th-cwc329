<?php
  require_once('conn.php');
  
  function getUserData($id) {
    global $conn;
    $sql = sprintf("SELECT * FROM cwc329_users WHERE id='%s'", $id);
    return $conn->query($sql)->fetch_assoc();
  }
?>