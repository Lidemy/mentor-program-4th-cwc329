<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bulletin V1.1.0 - Register</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
<div class="warningLine">Warning: This is a demo website.<br>For your own sake, please do not use your real-life account and password!!!</div>
  <main>
    <section class="board__sec1">
        <h1 class="board__title"><a href="index.php">Bulletin</a></h1>
        <div class="board__loginandReg">
          <a id="loginBtn" class="board__loginBtn" href="login.php">&gt; Log In</a>
        </div>
    </section>
    <h2> &gt; Register</h2>
    <form class="register__form" method="POST" action="handle_register.php">
      <div>group&nbsp;&nbsp;&nbsp;: <input type="text" class="register__form__group" name="group" autofocus required />[1-6]</div>
      <div>nickname: <input type="text" class="register__form__nickname" name="nickname" required /></div>
      <div>username: <input type="text" class="register__form__username" name="username" required />[0-9a-zA-Z]+</div>
      <div>password: <input type="password" class="register__form__username" name="password" required />[0-9a-zA-Z]+</div>
      <div><input class="register__form__submit" type="submit" value="&gt; return" /></div>
    </form>
    <?php
      if(!empty($_GET['err'])) {
        if($_GET['err'] === '1') {
          $msg = '&gt; Error: this nickname has been taken.';
        } else if ($_GET['err'] === '2') {
          $msg = '&gt; Error: this username has been taken.';
        } else if ($_GET['err'] === '3') {
          $msg = '&gt; Error: invalid inputs.';
        }
        echo '<div class="warningLine">' . $msg . '</div>';
      }
    ?>
  </main>
</body>