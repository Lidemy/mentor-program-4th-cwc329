<?php
  require_once('conn.php');

  $unAndPdRegex = '/^[0-9a-zA-Z]+$/';

  function htmlEscape($str) {
    $result = htmlspecialchars($str,ENT_QUOTES);
    return $result;
  }

  function verifyUser($id) {
    global $conn;
    global $userTable;
    $sql = sprintf("SELECT username FROM %s WHERE id = ?", $userTable);
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
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

  function prepareStatement($sql, $type=NULL, ...$params) {
    global $conn;
    $stmt = $conn->prepare($sql);
    if ($type) {
      $stmt->bind_param($type, ...$params);
    }
    $stmt->execute();
    if (!empty($stmt->error)) {
      return $stmt->error;
    }
    return ($stmt->get_result());
  }
?>