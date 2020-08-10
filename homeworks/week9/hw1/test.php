
  <?php
  require_once('conn.php');
  $result = $conn->query('select * from huli_users');
  $res = '';
  $row = $result->fetch_assoc();
  /*
  while ($row = $result->fetch_assoc()) {
    $res = $res . '{"id":"' . $row["id"]. '","username":"' . $row["username"] . '"},';
  }
  */
  //$res = '[' . $res . ']';
  $res = $res . '{"id":' . $row["id"]. ',"username":"' . $row["username"] . '"}';
  echo $res;
  print_r($row);
?>