<?php
/**
 * 404 page.
 *
 * @package Visualis_Journal
 */

get_header();
?>

<main id="content">
	<section class="error-page wrap">
		<p class="label"><?php esc_html_e( 'Error 404', 'visualis-journal' ); ?></p>
		<div class="error-page__number" aria-hidden="true">404</div>
		<h1><?php esc_html_e( 'This page left the grid.', 'visualis-journal' ); ?></h1>
		<p class="error-page__intro"><?php esc_html_e( 'The link may be old, or the essay may have moved. Try a search, or head back to the journal.', 'visualis-journal' ); ?></p>
		<div class="error-page__actions">
			<a class="btn btn--primary btn--large" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to the journal', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
		</div>
		<div class="error-page__search"><?php get_search_form(); ?></div>
	</section>
</main>

<?php
get_footer();
