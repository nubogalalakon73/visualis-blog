<?php
/**
 * Customizer settings.
 *
 * @package Visualis_Journal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register theme settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer instance.
 */
function visualis_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'visualis_settings',
		array(
			'title'       => __( 'Visualis settings', 'visualis-journal' ),
			'description' => __( 'Hero copy, membership link, and footer note.', 'visualis-journal' ),
			'priority'    => 30,
		)
	);

	$settings = array(
		'visualis_hero_kicker'  => array(
			'label'   => __( 'Hero kicker', 'visualis-journal' ),
			'default' => __( 'Visualis Journal — Vol. 04', 'visualis-journal' ),
			'type'    => 'text',
		),
		'visualis_hero_title'   => array(
			'label'   => __( 'Hero headline', 'visualis-journal' ),
			'default' => __( 'Design notes for people who make things.', 'visualis-journal' ),
			'type'    => 'text',
		),
		'visualis_hero_intro'   => array(
			'label'   => __( 'Hero introduction', 'visualis-journal' ),
			'default' => __( 'An independent editorial studio in Jakarta writing about layout, type, colour, and the decisions behind the work.', 'visualis-journal' ),
			'type'    => 'textarea',
		),
		'visualis_membership_url' => array(
			'label'       => __( 'Membership / join URL', 'visualis-journal' ),
			'description' => __( 'Leave empty to use the URL from Paid Memberships Pro or MemberPress.', 'visualis-journal' ),
			'default'     => '',
			'type'        => 'url',
		),
		'visualis_footer_text'  => array(
			'label'   => __( 'Footer note', 'visualis-journal' ),
			'default' => __( 'Independent design writing from Jakarta. Published slowly, on purpose.', 'visualis-journal' ),
			'type'    => 'textarea',
		),
	);

	foreach ( $settings as $id => $setting ) {
		$sanitize = 'url' === $setting['type'] ? 'esc_url_raw' : ( 'textarea' === $setting['type'] ? 'sanitize_textarea_field' : 'sanitize_text_field' );

		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $setting['default'],
				'sanitize_callback' => $sanitize,
				'transport'         => 'refresh',
			)
		);

		$wp_customize->add_control(
			$id,
			array(
				'label'   => $setting['label'],
				'section' => 'visualis_settings',
				'type'    => $setting['type'],
			)
		);
	}
}
add_action( 'customize_register', 'visualis_customize_register' );
