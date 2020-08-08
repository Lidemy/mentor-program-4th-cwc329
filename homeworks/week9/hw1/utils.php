<?php
  require_once('conn.php');
  
  function getUserData($id) {
    global $conn;
    $sql = sprintf("SELECT * FROM cwc329_users WHERE id='%s'", $id);
    return $conn->query($sql)->fetch_assoc();
  }

  function encodeV1($str) {
    return base64_encode($str);
  }
  
  function hashPd($str) {
    return hash('sha256', $str);
  }
?>