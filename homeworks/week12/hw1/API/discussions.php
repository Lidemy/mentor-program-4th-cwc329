<?php
  require_once('utils.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  $method = $_SERVER['REQUEST_METHOD'];
  switch ($method) {
    case 'GET':
      $arr['discussions'] = json_decode(getDiscussions());
      $arr['minId'] = json_decode(getMinId())->minId;
      echo json_encode($arr);
      break;
    case 'POST':
      echo addDiscussions();
      break;
  }

  function getDiscussions() {
    global $discussionTable;
    $before = NAN;
    $discussions = array();
    if (empty($_GET['siteKey'])) {
      $discussions['err'] = 'invalid inputs';
      return json_encode($discussions);
    }
    if (!empty($_GET['before'])) {
      $before = intval($_GET['before']);
    }
    if (is_nan($before)) {
      $sql = sprintf("SELECT * FROM %s WHERE site_key = ? ORDER BY id DESC LIMIT 0,5", $discussionTable);
      $result = prepareStatement($sql, 's', $_GET['siteKey']);
    } else {
      $sql = sprintf("SELECT * FROM %s WHERE id < ? AND site_key = ? ORDER BY id DESC LIMIT 0,5", $discussionTable);
      $result = prepareStatement($sql, 'is', $before, $_GET['siteKey']);
    }
    while ($row = $result->fetch_assoc()) {
      array_push($discussions, $row);
    }
    return json_encode($discussions);
  }

  function addDiscussions() {
    global $discussionTable;
    $result = array();
    if (empty($_POST['nickname']) || empty($_POST['comment']) || empty($_POST['siteKey'])) {
      $result['err'] = 'invalid inputs';
      return json_encode($result);
    }
    $sql = sprintf("INSERT INTO %s (nickname, comment, site_key) VALUES(?, ?, ?)", $discussionTable);
    $sqlResult = prepareStatement($sql, 'sss', $_POST['nickname'], $_POST['comment'], $_POST['siteKey']);
    if (empty($sqlResult->error)) {
      $result['err'] = null;
      $getNewestDiscusSql = sprintf("SELECT * FROM %s WHERE site_key = ? ORDER BY id DESC LIMIT 0,1", $discussionTable);
      $discusResult = prepareStatement($getNewestDiscusSql, 's', $_POST['siteKey']);
      $discusRow = $discusResult->fetch_assoc();
      $arr = array();
      array_push($arr, $discusRow);
      $result['discussions'] = $arr;
    } else {
      $result['err'] = $sqlResult->error;
    }
    return json_encode($result);
  }

  function getMinId() {
    global $discussionTable;
    if (empty($_GET['siteKey'])) {
      $arr['err'] = 'invalid inputs';
      return json_encode($arr);
    }
    $sql = sprintf("SELECT MIN(id) as minId FROM %s WHERE site_key = ?", $discussionTable);
    $result = prepareStatement($sql, 's', $_GET['siteKey']);
    $row = $result->fetch_assoc();
    return json_encode($row);
  }
?>