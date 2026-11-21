<?php
/**
 * Standard page.
 *
 * @package Visualis_Journal
 */

get_header();
?>

<main id="content">

<?php
while ( have_posts() ) :
	the_post();
	?>
	<article id="post-<?php the_ID(); ?>" <?php post_class( 'static-page' ); ?>>
		<header class="page-hero wrap">
			<p class="label"><?php esc_html_e( 'Page', 'visualis-journal' ); ?></p>
			<h1 class="page-title"><?php the_title(); ?></h1>
			<div class="page-hero__rule" aria-hidden="true"></div>
		</header>

		<div class="wrap page-content prose">
			<?php
			the_content();

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'visualis-journal' ),
					'after'  => '</div>',
				)
			);

			edit_post_link( __( 'Edit this page', 'visualis-journal' ), '<p class="edit-link">', '</p>' );
			?>
		</div>
	</article>
	<?php
endwhile;
?>

</main>

<?php
get_footer();
