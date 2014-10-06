<?php
require_once 'RC_Config.php';
$config = new RC_Config();
$pdo = new PDO("mysql:host=".$config->host.";dbname=".$config->db.";charset=utf8", $config->user, $config->password);

try {
	$id = $_GET["id"];
	$is_new = $_GET["is_new"] === "1" ? 0 : 1;
	$sql = "UPDATE counts SET new = ? WHERE id = ? ";
	$stmt = $pdo->prepare($sql);
	if (!$stmt->execute(array($is_new, $id))) {
		throw new Exception("Problem adding count");
	}
	$status = "Success";
} catch (Exception $e) {
	$status = "Fail";
	$message = $e->getMessage();
	$results = null;
}

echo json_encode(array("status" => $status, "message" => $message, "results" => $results, "test" => $_GET["is_new"]));
?>