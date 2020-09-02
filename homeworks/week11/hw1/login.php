<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bulletin V1.1.0 - Log In</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div class="warningLine">Warning: This is a demo website.<br>For your own sake, please do not use your real-life account and password!!!</div>
  <main>
    <section class="board__sec1">
        <h1 class="board__title"><a href="index.php">Bulletin</a></h1>
        <div class="board__loginandReg">
          <a id="regBtn" class="board__registerBtn" href="register.php">&gt; Register</a>
        </div>
    </section>
    <h2> &gt; Log In</h2>
    <form class="login__form" method="POST" action="handle_login.php">
      <div>username: <input type="text" class="login__form__username" name="username" autofocus required /></div>
      <div>password: <input type="password" class="login__form__username" name="password" required /></div>
      <div><input class="login__form__submit" type="submit" value="&gt; return" /></div>
    </form>
    <?php
      if(!empty($_GET['err'])) {
        if($_GET['err'] === '1') {
          $msg = '&gt; Error: non-existent username or invalid password.';
        } else if($_GET['err'] === '3') {
          $msg = '&gt; Error: invalid inputs.';
        } else {
          $msg = '&gt; Error: something went wrong. <br>You can click <a href="logout.php">&gt; this first and try to login again.</a>';
        }
        echo '<div class="warningLine">' . $msg . '</div>';
      }
    ?>
  </main>
</body>