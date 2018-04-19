<?php
ob_start('ob_gzhandler');
require_once 'config.php';

// Check [page] param
switch ($_SETTING['page'])
{	
	default:
		// Check file actualization
		require_once $_SETTING['baseDIR'] . 'LoadFile.php';
		//LoadFile::load($_SETTING['baseDIR'] . "js/analytics.js", 86400, 'https://www.google-analytics.com/analytics.js');
		LoadFile::load($_SETTING['baseDIR'] . "js/webfont.js", 86400, 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
		LoadFile::load($_SETTING['baseDIR'] . "js/googlemap.js", 86400, 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCgsKdTjc3viLK5QR62l8xJMDiGYqjjr80');
		?>
		<!DOCTYPE html>
		<html lang="cs">
			<head>
				<?php require_once $_SETTING['baseDIR'] . 'modules/head.php'; ?>
			</head>
			<body>	
				<?php // include $_SETTING['baseDIR'] . 'modules/header@v1.php'; ?>
				<?php include $_SETTING['baseDIR'] . 'modules/header@v4.php'; ?>
				<?php // include $_SETTING['baseDIR'] . 'modules/header@v3.php'; ?>
				<?php // include $_SETTING['baseDIR'] . 'modules/header@v4.php'; ?>
				<?php // include $_SETTING['baseDIR'] . 'modules/header@v5.php'; ?>

				<?php include $_SETTING['baseDIR'] . 'modules/content@v1.php'; ?>

				<?php // include $_SETTING['baseDIR'] . 'modules/footer@v1.php'; ?>
				<?php // include $_SETTING['baseDIR'] . 'modules/footer@v2.php'; ?>
				<?php //include $_SETTING['baseDIR'] . 'modules/contacts@v2.php'; ?>
			</body>
		</html>
		<?php
		break;
}// end switch	