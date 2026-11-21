<?php
/**
 * Visualis Journal functions and definitions.
 *
 * @package Visualis_Journal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'VISUALIS_VERSION', '1.0.0' );
define( 'VISUALIS_DIR', get_template_directory() );
define( 'VISUALIS_URI', get_template_directory_uri() );

require_once VISUALIS_DIR . '/inc/template-tags.php';
require_once VISUALIS_DIR . '/inc/membership.php';
require_once VISUALIS_DIR . '/inc/downloads.php';
require_once VISUALIS_DIR . '/inc/customizer.php';

/**
 * Theme setup.
 */
function visualis_setup() {
	load_theme_textdomain( 'visualis-journal', VISUALIS_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 96,
			'width'       => 280,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	add_editor_style( 'assets/css/editor.css' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary menu', 'visualis-journal' ),
			'footer'  => __( 'Footer menu', 'visualis-journal' ),
		)
	);

	add_image_size( 'visualis-cover', 1400, 900, true );
	add_image_size( 'visualis-card', 760, 520, true );
}
add_action( 'after_setup_theme', 'visualis_setup' );

/**
 * Front-end assets.
 */
function visualis_assets() {
	$version = wp_get_theme()->get( 'Version' );
	$fonts   = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Newsreader:ital,opsz,wght@1,6..72,300..600&family=Space+Grotesk:wght@400;500;600;700&display=swap';

	wp_enqueue_style( 'visualis-fonts', $fonts, array(), null );
	wp_enqueue_style( 'visualis-style', get_stylesheet_uri(), array( 'visualis-fonts' ), $version );
	wp_enqueue_script( 'visualis-nav', VISUALIS_URI . '/assets/js/nav.js', array(), $version, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'visualis_assets' );

/**
 * Load the same fonts inside the block editor.
 */
function visualis_editor_assets() {
	$fonts = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Newsreader:ital,opsz,wght@1,6..72,300..600&family=Space+Grotesk:wght@400;500;600;700&display=swap';
	wp_enqueue_style( 'visualis-editor-fonts', $fonts, array(), null );
}
add_action( 'enqueue_block_editor_assets', 'visualis_editor_assets' );

/**
 * Preconnect to Google Fonts.
 *
 * @param array  $urls          Resource hint URLs.
 * @param string $relation_type Relation type.
 * @return array
 */
function visualis_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}

	return $urls;
}
add_filter( 'wp_resource_hints', 'visualis_resource_hints', 10, 2 );

/**
 * Footer widget area.
 */
function visualis_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Footer', 'visualis-journal' ),
			'id'            => 'footer-1',
			'description'   => __( 'Optional footer column. The footer navigation and search still appear.', 'visualis-journal' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widget-title label">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'visualis_widgets_init' );

/**
 * Excerpt length.
 *
 * @return int
 */
function visualis_excerpt_length() {
	return 32;
}
add_filter( 'excerpt_length', 'visualis_excerpt_length' );

/**
 * Excerpt ellipsis.
 *
 * @return string
 */
function visualis_excerpt_more() {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'visualis_excerpt_more' );

/**
 * Body classes.
 *
 * @param array $classes Existing classes.
 * @return array
 */
function visualis_body_classes( $classes ) {
	$classes[] = 'visualis-theme';

	if ( is_singular() && ! is_front_page() ) {
		$classes[] = 'is-reading';
	}

	return $classes;
}
add_filter( 'body_class', 'visualis_body_classes' );

/**
 * Fallback menu when no primary menu is assigned.
 */
function visualis_primary_menu_fallback() {
	$items = array(
		array(
			'label' => __( 'Journal', 'visualis-journal' ),
			'url'   => visualis_journal_url(),
		),
		array(
			'label' => __( 'Tags', 'visualis-journal' ),
			'url'   => visualis_page_url_by_template( 'page-tags.php' ),
		),
		array(
			'label' => __( 'Library', 'visualis-journal' ),
			'url'   => visualis_library_url(),
		),
		array(
			'label' => __( 'Studio', 'visualis-journal' ),
			'url'   => visualis_studio_url(),
		),
	);

	echo '<ul class="nav-list">';
	foreach ( $items as $item ) {
		if ( empty( $item['url'] ) ) {
			continue;
		}
		printf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( $item['url'] ),
			esc_html( $item['label'] )
		);
	}
	echo '</ul>';
}

/**
 * Fallback footer menu.
 */
function visualis_footer_menu_fallback() {
	$items = array(
		array(
			'label' => __( 'Journal', 'visualis-journal' ),
			'url'   => visualis_journal_url(),
		),
		array(
			'label' => __( 'Tags', 'visualis-journal' ),
			'url'   => visualis_page_url_by_template( 'page-tags.php' ),
		),
		array(
			'label' => __( 'Library', 'visualis-journal' ),
			'url'   => visualis_library_url(),
		),
		array(
			'label' => __( 'Studio', 'visualis-journal' ),
			'url'   => visualis_studio_url(),
		),
	);

	echo '<ul class="footer-list">';
	foreach ( $items as $item ) {
		if ( empty( $item['url'] ) ) {
			continue;
		}
		printf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( $item['url'] ),
			esc_html( $item['label'] )
		);
	}
	echo '</ul>';
}

/**
 * Add a pingback header on singular pages.
 */
function visualis_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'visualis_pingback_header' );
