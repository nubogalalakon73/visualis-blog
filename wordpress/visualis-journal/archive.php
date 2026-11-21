<?php
/**
 * Archive template.
 *
 * @package Visualis_Journal
 */

get_header();
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'Archive', 'visualis-journal' ); ?></p>
		<h1 class="page-title"><?php echo wp_kses_post( get_the_archive_title() ); ?></h1>
		<?php if ( get_the_archive_description() ) : ?>
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
