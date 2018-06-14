<?php
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') $_SERVER['HTTPS']='on';  // Pass https through load balancer
require '../slim/vendor/autoload.php';
session_write_close(); // Close session WordPress opened
\Quantimodo\Api\Model\AppMode::setIsApiRequest(true);  // Not sure why this doesn't work sometimes?
$app = new Quantimodo\Api\Application();
$appDebug = getenv('APP_DEBUG') && getenv('APP_DEBUG') != "false";
if(!empty(getenv('BUGSNAG_DISABLED'))){$GLOBALS['bugsnagDisabled'] = 1;}
$bugsnagDisabled = isset($GLOBALS['bugsnagDisabled']) && $GLOBALS['bugsnagDisabled'];
$app->config('debug', $appDebug && !$bugsnagDisabled);
$app->run();