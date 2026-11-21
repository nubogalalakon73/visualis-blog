<?php
/**
 * Blog index.
 *
 * @package Visualis_Journal
 */

get_header();

$visualis_posts_page = (int) get_option( 'page_for_posts' );
$visualis_title      = $visualis_posts_page ? get_the_title( $visualis_posts_page ) : __( 'The Journal', 'visualis-journal' );
$visualis_intro      = $visualis_posts_page ? get_post_field( 'post_excerpt', $visualis_posts_page ) : __( 'Essays on layout, type, colour, and the decisions behind the work.', 'visualis-journal' );
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'The journal', 'visualis-journal' ); ?></p>
		<h1 class="page-title"><?php echo esc_html( $visualis_title ); ?></h1>
		<?php if ( $visualis_intro ) : ?>
			<p class="page-hero__intro"><?php echo esc_html( $visualis_intro ); ?></p>
		<?php endif; ?>
		<div class="page-hero__rule" aria-hidden="true"></div>
	</header>

	<div class="section wrap">
		<?php get_template_part( 'template-parts/loop' ); ?>
	</div>
</main>

<?php
get_footer();
