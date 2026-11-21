<?php
/**
 * Download plugin compatibility.
 *
 * @package Visualis_Journal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Post types the library should read from.
 *
 * @return array
 */
function visualis_download_post_types() {
	/**
	 * Filter the download post types the library lists.
	 *
	 * @param array $types Post type slugs.
	 */
	return (array) apply_filters( 'visualis_download_post_types', array( 'dlm_download', 'download' ) );
}

/**
 * Whether a supported download plugin is active.
 *
 * @return bool
 */
function visualis_has_download_plugin() {
	foreach ( visualis_download_post_types() as $type ) {
		if ( post_type_exists( $type ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Query library downloads.
 *
 * @param int $limit Number of downloads.
 * @return WP_Query
 */
function visualis_get_downloads( $limit = 12 ) {
	$types = array_values( array_filter( visualis_download_post_types(), 'post_type_exists' ) );

	if ( empty( $types ) ) {
		return new WP_Query(
			array(
				'post_type'      => 'post',
				'post__in'       => array( 0 ),
				'posts_per_page' => 1,
			)
		);
	}

	return new WP_Query(
		array(
			'post_type'           => $types,
			'posts_per_page'      => $limit,
			'post_status'         => 'publish',
			'ignore_sticky_posts' => true,
			'orderby'             => array(
				'menu_order' => 'ASC',
				'date'       => 'DESC',
			),
		)
	);
}

/**
 * Label for a download card.
 *
 * @param int|null $post_id Optional post ID.
 * @return string
 */
function visualis_download_label( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();

	foreach ( array( 'dlm_download_category', 'download_category' ) as $taxonomy ) {
		$terms = get_the_terms( $post_id, $taxonomy );
		if ( $terms && ! is_wp_error( $terms ) ) {
			return $terms[0]->name;
		}
	}

	return __( 'Member file', 'visualis-journal' );
}
