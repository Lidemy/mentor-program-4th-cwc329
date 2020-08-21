<?php
  require_once('conn.php');
  require_once('utils.php');
  
  if (empty($_SESSION['id'])) {
    header('Location: login.php');
    die();
  }
  
  if (empty($_POST['title']) || empty($_POST['article'])) {
    header('Location: add_article.php');
    die();
  }

  $userType = getUserData($_SESSION['id'])['userType'];
  if ($userType != 99 && $userType != 98) {
    header('Location: login.php');
    die();
  }

  $isEditing = false;
  $article = $_POST['article'];
  $title = $_POST['title'];
  $catId = intval($_POST['category']);
  if (!empty($_POST['article_id'])) {
    $isEditing = true;
    $articleId = $_POST['article_id'];
  }

  echo '<br>';
  if (!$isEditing) {
    $sql = "INSERT INTO " . $articleTable . " (title, article, categories_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $title, $article, $catId);
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
  header('Location: index.php');
?>