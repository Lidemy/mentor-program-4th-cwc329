<?php
  require_once('../conn.php');
  require_once('../utils.php');
  require_once('../admin_verify.php');

  $isEditing = false;
  $article = $_POST['article'];
  $title = $_POST['title'];
  $catId = intval($_POST['category']);
  $authorId = intval($_POST['author_id']);
  if (!empty($_POST['article_id'])) {
    $isEditing = true;
    $articleId = $_POST['article_id'];
  }

  echo '<br>';
  if (!$isEditing) {
    $sql = "INSERT INTO " . $articleTable . " (title, article, categories_id, author_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssii', $title, $article, $catId, $authorId);
    $stmt->execute();
  } else {
    $sql = "UPDATE " . $articleTable . " SET title=?, article=?, categories_id=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssis', $title, $article, $catId, $articleId);
    $stmt->execute();
  }
  if (!empty($stmt->error)) {
    var_dump($stmt->error);
  }
  header('Location: ../index.php');
?>