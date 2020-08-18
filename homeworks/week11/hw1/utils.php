<?php
  require_once('conn.php');

  $unAndPdRegex = '/^[0-9a-zA-Z]+$/';

  function htmlEscape($str) {
    $result = htmlspecialchars($str,ENT_QUOTES);
    return $result;
  }

  function verifyUser($id) {
    global $conn;
    $result = $conn->query("SELECT username FROM cwc329_users WHERE id=" . $id);
    if($result->num_rows === 0) {
      return false;
    }
    return true;
  }

  function getUserData($id) {
    global $conn;
    $sql = ("SELECT * FROM cwc329_users WHERE id=?");
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

?>