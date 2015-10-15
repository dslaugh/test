	<?php
		echo 'hello';
		$url = 'http://www.davidslaugh.com/api/v1/counts';
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_VERBOSE, 1);
		curl_setopt($curl, CURLOPT_HEADER, 1);
		$response = curl_exec($curl);
		var_dump($response);
	?>