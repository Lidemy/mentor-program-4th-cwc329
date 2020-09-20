<?php
  require_once('utils.php');
  $method = $_SERVER['REQUEST_METHOD'];
  $sessionName = session_name();
  $data = array();
  $data['name'] = $sessionName;
  header('Content-type:application/json;charset=utf-8');

  function login($username, $password) {
    global $unAndPdRegex, $data, $userTable;
    header('Content-type:application/json;charset=utf-8');
    if (!(preg_match($unAndPdRegex, $username) && preg_match($unAndPdRegex, $password))) {
      return json_encode($data);
    }
    $sql = sprintf("SELECT * FROM %s WHERE username=?", $userTable);
    $result = prepareStatement($sql, 's', $username);
    $row = $result->fetch_assoc();
    if(!password_verify($password, $row['password'])) {
      return json_encode($data);
    }
    $_SESSION['id'] = $row['id'];
    $sessionId = session_id();
    $data['id'] = $sessionId;
    $data['userId'] = $_SESSION['id'];
    $data = json_encode($data);
    return $data;
  }

  function logout() {
    global $data;
    session_destroy();
    return json_encode($data);
  }

  function checkStatus() {
    $result['result'] = 1;
    if (empty($_SESSION['id'])) {
      $result['result'] = 0;
      return json_encode($result);
    }
    $result['userId'] = $_SESSION['id'];
    return json_encode($result);
  }

  switch ($method) {
    case 'POST':
      if (!empty($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        echo login($username, $password);
      } else {
        echo logout();
      }
      break;
    default:
      echo checkStatus();
      break;
  }
?>