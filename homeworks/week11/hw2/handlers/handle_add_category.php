<?php
  require_once('../conn.php');
  require_once('../utils.php');
  require_once('../admin_verify.php');
  
  if (empty($_POST['category'])) {
    header('Location: ../add_category.php');
    die();
  }

  $isEditing = false;
  $category = $_POST['category'];
  if (!empty($_POST['category_id'])) {
    $isEditing = true;
    $catId = $_POST['category_id'];
  }

  echo '<br>';
  if (!$isEditing) {
    $sql = sprintf("INSERT INTO %s (category) VALUES (?)", $categoryTable);
    echo $sql;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $category);
    $stmt->execute();
  } else {
    $sql = sprintf("UPDATE %s SET category=? WHERE id=?", $categoryTable);
    echo $sql;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $category, $catId);
    $stmt->execute();
  }
  if (!empty($stmt->error)) {
    var_dump($stmt->error);
  }
  header('Location: ../admin_categories.php');
?>