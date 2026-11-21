<?php
/**
 * Fallback template.
 *
 * @package Visualis_Journal
 */

get_header();
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'The journal', 'visualis-journal' ); ?></p>
		<h1 class="page-title">
			<?php
			if ( is_search() ) {
				/* translators: %s: search query. */
				printf( esc_html__( 'Search: %s', 'visualis-journal' ), esc_html( get_search_query() ) );
			} elseif ( is_archive() ) {
				echo wp_kses_post( get_the_archive_title() );
			} else {
				esc_html_e( 'Latest essays', 'visualis-journal' );
			}
			?>
		</h1>
		<?php if ( is_archive() ) : ?>
			<div class="page-hero__intro"><?php the_archive_description(); ?></div>
		<?php endif; ?>
		<div class="page-hero__rule" aria-hidden="true"></div>
	</header>

	<div class="section wrap">
		<?php get_template_part( 'template-parts/loop' ); ?>
	</div>
</main>

<?php
get_footer();
