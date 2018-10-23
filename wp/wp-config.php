<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'qm_staging');

/** MySQL database username */
define('DB_USER', 'quantimodo');

/** MySQL database password */
define('DB_PASSWORD', 'caf4a081d8e0773617886cc54b801cbec3ace4c455917c9c');

/** MySQL hostname */
define('DB_HOST', '169.61.123.133');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '9Wn[06>UVyCfU[ =v1oUF~(nB#0X&b5_y|=|4RJASSwPLV OywSh#4(M./~[HYZ5');
define('SECURE_AUTH_KEY',  'X$(etUGYvw}1=0}2hj96>*y5y(&]YAV>VyP*~)+veymR/-anN=Pls@~6eK~5J57$');
define('LOGGED_IN_KEY',    '@]]G/tV5cP#CU[GS?S`klZ;- !=[+x@jsD_rX+>i57nDx+C5M2CsAj]FD4PnYmXU');
define('NONCE_KEY',        '>%AK?13|{A8& 5o -4!oV_ag3zJy<HZ _>{Rn}&(?N|H~+Fsx1Fs3E{h_8rl$H+2');
define('AUTH_SALT',        '$:{!A{%JFrtrW8orv[)jP4NgK;>s#I5W=N~+3gL<Uq&QwX(d_.[x;=V=Ca|$wYRA');
define('SECURE_AUTH_SALT', ';Zu5qu|Qh!2yjp#bd[H9!bgq%lEn?}u>83AD>dg5E4Eedyq?_HJLf#XvY:UwFKOU');
define('LOGGED_IN_SALT',   '+[>0Z$~p6#ps,B757[G+I6`6m<3M^FODnPFq5?;(nTlFi2V3nt-aC^t-e8bdRI~O');
define('NONCE_SALT',       ',C*R}04Wcnhi;YR1UWTN_{F]qb:H:%CkLse&mIiI$u;`vbi+Nr/Px/8gi7Y-iFFl');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

$hostname = $_SERVER['HTTP_HOST'];
if(isset($_SERVER['HTTP_X_FORWARDED_HOST']) && !empty($_SERVER['HTTP_X_FORWARDED_HOST'])) {
    $hostname = $_SERVER['HTTP_X_FORWARDED_HOST'];
}

$protocol = isset($_SERVER['HTTPS'])
&& ($_SERVER['HTTPS'] == 'on'
    || $_SERVER['HTTPS'] == 1)
|| isset($_SERVER['HTTP_X_FORWARDED_PROTO'])
&& $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'
    ? 'https://'
    : 'http://';

$siteUrl = $protocol . rtrim($hostname, '/');
$path = str_replace('/index.php', '', $_SERVER["DOCUMENT_URI"]);
if(!empty($path)){
    $arr = explode("/wp-", $path);
    $path = $arr[0];
    $siteUrl .= $path;
}

define('WP_HOME', $siteUrl);
define('WP_SITEURL', $siteUrl);

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
