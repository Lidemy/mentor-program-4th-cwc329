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
        changeProfile($id, $_POST);
      } else {
        $nickname = trim($_POST['nickname']);
        $username = trim($_POST['username']);
        $password = $_POST['password'];
        $group = $_POST['group'];
        register($username, $password, $nickname, $group);
      }
      break;
    case "DELETE":
  }

  function getUser($id) {
    global $userTable;
    $userId = intval($id);
    $sql = sprintf("SELECT id, username, nickname, groupNo, userType FROM %s WHERE id = ?", $userTable);
    $result = prepareStatement($sql, 'i', $userId);
    $userData = array();
    while ($row = $result->fetch_assoc()) {
      array_push($userData, $row);
    }
    $userData = json_encode($userData);
    header('Content-type:application/json;charset=utf-8');
    return $userData;
  }

  function register($username, $password, $nickname, $group) {
    global $userTable, $unAndPdRegex;
    if (!(preg_match($unAndPdRegex, $username) && preg_match($unAndPdRegex, $password) && preg_match("/^[1-6]$/", $group))) {
      return;
    }
    $sql = sprintf("INSERT INTO %s (nickname, groupNo, username, password) VALUES(?, ?, ?, ?)", $userTable);
    $group = intval($group);
    $password = password_hash($password, PASSWORD_DEFAULT);
    $result = prepareStatement($sql, 'siss', $nickname, $group, $username, $password);
  }

  function changeProfile($id, $arr) {
    global $userTable;
    $userData = getUserData($_SESSION['id']);
    $userType = $userData['userType'];
    if (!($userType == 99 || $id == $_SESSION['id'])) {
      echo 'you shall not pass';
      return;
    }
    if ($userType != 99) {
      if (!empty($arr['nickname'])) {
        $sql = sprintf("UPDATE %s SET nickname = ? WHERE id = ?", $userTable);
        prepareStatement($sql, 'ss', $arr['nickname'], $id);
      }
    } else {
      $sql = sprintf("UPDATE %s SET ", $userTable);
      $type = '';
      $params = array();
      $i = 0;
      foreach ($arr as $key => $value) {
        if ($i > 0) {
          $sql .= ', ';
        }
        $sql .= $key . ' = ?';
        $type .= 's';
        array_push($params, $value);
        $i ++;
      }
      $sql .= ' WHERE id = ?';
      array_push($params, $id);
      $type .= 's';
      $result = prepareStatement($sql, $type, ...$params);
    }
  }
?>