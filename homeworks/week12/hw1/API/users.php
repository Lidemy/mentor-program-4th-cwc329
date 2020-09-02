<?php
  require_once('utils.php');
  $method = $_SERVER['REQUEST_METHOD'];
  $id = Null;
  if (!empty($_GET['id'])) {
    $id = $_GET['id'];
  }
  switch ($method) {
    case "GET":
      echo getUser($id);
      break;
    case "POST":
      if ($id) {
        $nickname = $_POST['nickname'];
        changeProfile($id);
      } else {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $nickname = $_POST['nickname'];
        register($username, $password, $nickname);
      }
      break;
    case "DELETE":
  }

  function getUser($id) {
    global $userTable;
    $userId = intval($id);
    $sql = sprintf("SELECT * FROM %s WHERE id = ?", $userTable);
    $result = prepareStatement($sql, 'i', $userId);
    $userData = array();
    while ($row = $result->fetch_assoc()) {
      array_push($userData, $row);
    }
    $userData = json_encode($userData);
    header('Content-type:application/json;charset=utf-8');
    return $userData;
  }

  function register($username, $password, $nickname) {

  }
?>