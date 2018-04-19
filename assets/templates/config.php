<?php
session_start();

/* $_SETTING = array(
  "baseDIR" => realpath(__DIR__) . "/",
  "baseURL" => full_url($_SERVER),
  "originURL" => url_origin($_SERVER)
  ); */

$_SETTING = array(
	"baseDIR" => realpath(__DIR__) . "/",
	"baseURL" => 'http://localhost/BP_OCElan_redesign/public/',
	"originURL" => 'http://localhost/BP_OCElan_redesign/public',
	"page" => ''
);

/*$_SETTING = array(
	"baseDIR" => realpath(__DIR__) . "/",
	"baseURL" => 'http://bpromotiondemo.eu/forum_karlin/',
	"originURL" => 'http://bpromotiondemo.eu/forum_karlin',
	"page" => ''
);*/

/*$_SETTING = array(
	"baseDIR" => realpath(__DIR__) . "/",
	"baseURL" => 'http://forumkarlin.savills.cz/',
	"originURL" => 'http://forumkarlin.savills.cz',
	"page" => ''
);*/

if (isset($_GET['page']))
{
	$_SETTING['page'] = $_GET['page'];
}// end if

function url_origin($s, $use_forwarded_host = false)
{
	$ssl = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on' );
	$sp = strtolower($s['SERVER_PROTOCOL']);
	$protocol = substr($sp, 0, strpos($sp, '/')) . ( ( $ssl ) ? 's' : '' );
	$port = $s['SERVER_PORT'];
	$port = ( (!$ssl && $port == '80' ) || ( $ssl && $port == '443' ) ) ? '' : ':' . $port;
	$host = ( $use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST']) ) ? $s['HTTP_X_FORWARDED_HOST'] : ( isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null );
	$host = isset($host) ? $host : $s['SERVER_NAME'] . $port;
	return $protocol . '://' . $host;
}

// end function

function full_url($s, $use_forwarded_host = false)
{
	return url_origin($s, $use_forwarded_host) . $s['REQUEST_URI'];
}

// end function
/*
// Check logged user or redirect to login page
if (!isset($_SESSION['logged_user']) && $_SETTING['page'] !== "login")
{
	header("location:" . $_SETTING['baseURL'] . 'login');
	exit();
}// end if
*/
// Submited login form
$_POST_FILTER = array(
	"form" => filter_input(INPUT_POST, "login_form"),
	"submit" => filter_input(INPUT_POST, "login_submit"),
	"password" => filter_input(INPUT_POST, "login_password"),
	"hdn_pass" => "forum",
	"error" => FALSE
);

if ($_POST_FILTER['form'] === "1")
{
	if ($_POST_FILTER['password'] === $_POST_FILTER['hdn_pass'])
	{
		$_SESSION['logged_user'] = "1";
		header("location:" . $_SETTING['baseURL']);
		exit();
	} else {
		$_POST_FILTER['error'] = TRUE;
	}// end if
}// end if