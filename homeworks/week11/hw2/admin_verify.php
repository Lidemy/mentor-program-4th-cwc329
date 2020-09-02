<?php
  if (empty($_SESSION['id'])) {
    die("請先登入");
  }
  
  $userData = getUserData($_SESSION['id']);
  $userType = $userData['userType'];
  if (!($userType == 99 || $userType == 98)) {
    die("權限不足");
  }
?>