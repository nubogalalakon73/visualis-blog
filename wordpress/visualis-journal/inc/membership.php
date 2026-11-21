<?php
/**
 * Membership plugin compatibility.
 *
 * The theme only decides what to show. File and page protection must be
 * configured inside the membership plugin itself.
 *
 * @package Visualis_Journal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether the current visitor should be treated as a member.
 *
 * Supports Paid Memberships Pro and MemberPress. With no membership plugin
 * active, any logged-in user is treated as a member.
 *
 * @return bool
 */
function visualis_is_member() {
	$is_member = is_user_logged_in();

	if ( function_exists( 'pmpro_hasMembershipLevel' ) ) {
		$level_check = pmpro_hasMembershipLevel();
		// PMPro can return an error string for invalid arguments; only true counts.
		$is_member = ( true === $level_check || 1 === $level_check );
	} elseif ( class_exists( 'MeprUser' ) && is_user_logged_in() ) {
		$mepr_user = new MeprUser( get_current_user_id() );
		if ( method_exists( $mepr_user, 'is_active' ) ) {
			$is_member = (bool) $mepr_user->is_active();
		}
	}

	// Let administrators preview the member state.
	if ( current_user_can( 'manage_options' ) ) {
		$is_member = true;
	}

	/**
	 * Filter the membership state used by the theme.
	 *
	 * @param bool $is_member Whether the visitor is a member.
	 */
	return (bool) apply_filters( 'visualis_is_member', $is_member );
}

/**
 * Human label for the visitor's membership.
 *
 * @return string
 */
function visualis_membership_label() {
	if ( function_exists( 'pmpro_getMembershipLevelForUser' ) && is_user_logged_in() ) {
		$level = pmpro_getMembershipLevelForUser( get_current_user_id() );
		if ( is_object( $level ) && ! empty( $level->name ) ) {
			return $level->name;
		}
	}

	if ( class_exists( 'MeprUser' ) && is_user_logged_in() ) {
		$mepr_user = new MeprUser( get_current_user_id() );
		if ( method_exists( $mepr_user, 'get_active_subscription_titles' ) ) {
			$titles = $mepr_user->get_active_subscription_titles( ', ' );
			if ( ! empty( $titles ) ) {
				return wp_strip_all_tags( $titles );
			}
		}
	}

	return __( 'Active member', 'visualis-journal' );
}

/**
 * Join / upgrade URL, preferring an explicit Customizer value.
 *
 * @return string
 */
function visualis_membership_url() {
	$custom = get_theme_mod( 'visualis_membership_url' );

	if ( $custom ) {
		return $custom;
	}

	if ( function_exists( 'pmpro_url' ) ) {
		$levels = pmpro_url( 'levels' );
		if ( $levels ) {
			return $levels;
		}
	}

	if ( class_exists( 'MeprOptions' ) ) {
		$options = MeprOptions::fetch();
		if ( ! empty( $options->account_page_id ) ) {
			return get_permalink( $options->account_page_id );
		}
	}

	return wp_login_url();
}

/**
 * Account URL for signed-in members.
 *
 * @return string
 */
function visualis_account_url() {
	if ( function_exists( 'pmpro_url' ) ) {
		$account = pmpro_url( 'account' );
		if ( $account ) {
			return $account;
		}
	}

	if ( class_exists( 'MeprOptions' ) ) {
		$options = MeprOptions::fetch();
		if ( ! empty( $options->account_page_id ) ) {
			return get_permalink( $options->account_page_id );
		}
	}

	return get_edit_user_link( get_current_user_id() );
}
