<?php
/**
 * Site header.
 *
 * @package Visualis_Journal
 */

$visualis_login_redirect = is_singular() ? get_permalink() : home_url( '/' );
$visualis_login_redirect = $visualis_login_redirect ? $visualis_login_redirect : home_url( '/' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'visualis-journal' ); ?></a>

<header class="site-header" id="masthead">
	<div class="wrap site-header__inner">
		<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<span class="brand__mark" aria-hidden="true">V</span>
				<span class="brand__text">
					<span class="brand__name"><?php bloginfo( 'name' ); ?></span>
					<span class="brand__tag"><?php esc_html_e( 'Design journal', 'visualis-journal' ); ?></span>
				</span>
			<?php endif; ?>
		</a>

		<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
			<span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span></span>
			<span class="nav-toggle__label"><?php esc_html_e( 'Menu', 'visualis-journal' ); ?></span>
		</button>

		<nav class="primary-nav" id="site-navigation" aria-label="<?php esc_attr_e( 'Primary menu', 'visualis-journal' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'nav-list',
					'menu_id'        => 'primary-menu',
					'fallback_cb'    => 'visualis_primary_menu_fallback',
					'depth'          => 1,
				)
			);
			?>
		</nav>

		<div class="header-actions">
			<?php if ( visualis_is_member() ) : ?>
				<a class="member-chip" href="<?php echo esc_url( visualis_account_url() ); ?>">
					<span class="member-chip__dot" aria-hidden="true"></span>
					<span><?php echo esc_html( visualis_membership_label() ); ?></span>
				</a>
			<?php else : ?>
				<?php if ( is_user_logged_in() ) : ?>
					<a class="header-login" href="<?php echo esc_url( visualis_account_url() ); ?>"><?php esc_html_e( 'Account', 'visualis-journal' ); ?></a>
				<?php else : ?>
					<a class="header-login" href="<?php echo esc_url( wp_login_url( $visualis_login_redirect ) ); ?>"><?php esc_html_e( 'Log in', 'visualis-journal' ); ?></a>
				<?php endif; ?>
				<a class="btn btn--small btn--primary" href="<?php echo esc_url( visualis_membership_url() ); ?>"><?php esc_html_e( 'Become a member', 'visualis-journal' ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</header>
