<?php
ini_set("date.timezone", "America/Denver");
require_once 'RC_Config.php';
$config = new RC_Config();
$pdo = new PDO("mysql:host=".$config->host.";dbname=".$config->db.";charset=utf8", $config->user, $config->password);

try {
	$counter_date = Date("Y-m-d");
	$counter_time = Date("G:i:s");
	$is_new = $_GET["is_new"] === "true" ? 1 : 0;
	$sql = "INSERT INTO counts (counter_date, counter_time, new) ";
	$sql .= "VALUES (?, ?, ?)";
	$stmt = $pdo->prepare($sql);
	if (!$stmt->execute(array($counter_date, $counter_time, $is_new))) {
		throw new Exception("Problem adding count");
	}
	$status = "Success";
} catch (Exception $e) {
	$status = "Fail";
	$message = $e->getMessage();
	$results = null;
}

echo json_encode(array("status" => $status, "message" => $message, "results" => $results, "test" => $is_new));
?>