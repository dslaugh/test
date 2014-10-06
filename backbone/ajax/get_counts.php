<?php
require_once 'RC_Config.php';
$config = new RC_Config();
$pdo = new PDO("mysql:host=".$config->host.";dbname=".$config->db.";charset=utf8", $config->user, $config->password);

try {
	if (strtolower($_GET["count_date"]) == "yesterday") {
		$timestamp = mktime(0,0,0,Date("m"), Date("d")-1, Date("Y"));
		$the_date = Date("Y-m-d", $timestamp);
	} else {
		$the_date = Date("Y-m-d");
	}

	$sql = "SELECT * FROM counts WHERE counter_date = ? ORDER BY counter_date, counter_time";
	$stmt = $pdo->prepare($sql);

	if (!$stmt->execute(array($the_date))) {
		throw new Exception("Error executing SQL");
	}
	
	$message = "Success";
	$results = $stmt->fetchAll();
} catch (Exception $e) {
	$status = "Fail";
	$message = $e->getMessage();
	$results = null;
}

echo json_encode(array("status" => $status, "message" => $message, "results" => $results));
?>