<?php
  require_once('utils.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  $method = $_SERVER['REQUEST_METHOD'];

  switch ($method) {
    case 'GET':
      echo getTodo();
      break;
    case 'POST':
      if (!$_POST['id']) {
        echo addTodo($_POST['todo']);
      } else {
        echo updateTodo($_POST['id'], $_POST['todo']);
      }
    break;
  }

  function getTodo() {
    global $todoTable;
    $sql = sprintf("SELECT * FROM %s", $todoTable);
    $types = '';
    $id = null;
    if (!empty($_GET['id'])) {
      $sql .= " WHERE id = ?";
      $types .= 's';
      $id = $_GET['id'];
    }
    $sqlResult = prepareStatement($sql, $types, $id);
    $result = array();
    if ($sqlResult->num_rows === 0) {
      $result['err'] = true;
      $result['message'] = 'id not found';
      return json_encode($result);
    }
    while ($sqlRow = $sqlResult->fetch_assoc()) {
      array_push($result, $sqlRow);
    }
    return json_encode($result);
  }

  function addTodo($todo) {
    global $todoTable;
    $token = sha1(mt_rand(1,100000));
    $insertSql = sprintf("INSERT INTO %s (todo, token) VALUES (?, ?)", $todoTable);
    prepareStatement($insertSql, 'ss', $todo, $token);
    $getSql = sprintf("SELECT id FROM %s WHERE token = ?", $todoTable);
    $sqlResult = prepareStatement($getSql, 's', $token);
    $row = $sqlResult->fetch_assoc();
    $result = array();
    array_push($result, $row);
    return json_encode($result);
  }

  function updateTodo($id, $todo) {
    global $todoTable;
    $sql = sprintf("UPDATE %s SET todo=? WHERE id=?", $todoTable);
    prepareStatement($sql, 'ss', $todo, $id);
  }
?>