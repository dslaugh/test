<?php
echo json_encode(array('status' => 'success', 'post_vars' => $_POST, 'get_vars' => $_GET));
die();
?>