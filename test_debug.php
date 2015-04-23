<html>
<head>
	<title>Debug Testing</title>
</head>
<body>
	<?php
		function test($a) {
			$sub = substr($a, 0, 2);
			return $sub;
		}

		$mystring = 'Hello';

		$short = test($mystring);
		echo $short
	?>

</body>
</html>