<?php
/**
 * Search results.
 *
 * @package Visualis_Journal
 */

get_header();
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'Search', 'visualis-journal' ); ?></p>
		<h1 class="page-title">
			<?php
			/* translators: %s: search query. */
			printf( esc_html__( 'Results for “%s”', 'visualis-journal' ), esc_html( get_search_query() ) );
			?>
		</h1>
		<div class="page-hero__search"><?php get_search_form(); ?></div>
		<div class="page-hero__rule" aria-hidden="true"></div>
	</header>

	<div class="section wrap">
		<?php get_template_part( 'template-parts/loop' ); ?>
	</div>
</main>

<?php
get_footer();
