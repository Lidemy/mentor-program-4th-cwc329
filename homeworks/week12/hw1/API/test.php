<?php
  require_once('utils.php');
  var_dump(prepareStatement("SELECT MIN(id) FROM cwc329.cwc329_discussions WHERE site_key = 'test'")->fetch_assoc()['MIN(id)']);
?>