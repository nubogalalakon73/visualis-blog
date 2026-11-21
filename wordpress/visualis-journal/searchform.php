<?php
/**
 * Search form.
 *
 * @package Visualis_Journal
 */

$visualis_search_id = wp_unique_id( 'search-field-' );
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="<?php echo esc_attr( $visualis_search_id ); ?>"><?php esc_html_e( 'Search the journal', 'visualis-journal' ); ?></label>
	<div class="search-form__row">
		<input
			type="search"
			id="<?php echo esc_attr( $visualis_search_id ); ?>"
			class="search-field"
			name="s"
			value="<?php echo esc_attr( get_search_query() ); ?>"
			placeholder="<?php esc_attr_e( 'Search essays, tags, notes…', 'visualis-journal' ); ?>"
		>
		<button type="submit" class="btn btn--small btn--primary"><?php esc_html_e( 'Search', 'visualis-journal' ); ?></button>
	</div>
</form>
