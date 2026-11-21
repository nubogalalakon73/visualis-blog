<?php
/**
 * Single post.
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
	<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post' ); ?>>
		<header class="single-header wrap">
			<div class="single-header__top">
				<?php visualis_tag_pills( 3 ); ?>
				<span class="single-header__read"><?php echo esc_html( visualis_reading_label() ); ?></span>
			</div>

			<h1 class="single-title"><?php the_title(); ?></h1>

			<?php $visualis_standfirst = visualis_standfirst( 42 ); ?>
			<?php if ( $visualis_standfirst ) : ?>
				<p class="single-standfirst"><?php echo esc_html( $visualis_standfirst ); ?></p>
			<?php endif; ?>

			<div class="single-byline">
				<?php echo wp_kses_post( get_avatar( get_the_author_meta( 'ID' ), 56, '', '', array( 'class' => 'single-byline__avatar' ) ) ); ?>
				<div class="single-byline__text">
					<span class="label"><?php esc_html_e( 'Written by', 'visualis-journal' ); ?></span>
					<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><?php echo esc_html( get_the_author() ); ?></a>
					<span class="single-byline__date">
						<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
					</span>
				</div>
			</div>
		</header>

		<div class="single-cover wrap">
			<?php visualis_post_cover( 'hero' ); ?>
		</div>

		<div class="wrap single-layout">
			<div class="prose single-content">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'visualis-journal' ),
						'after'  => '</div>',
					)
				);
				?>
			</div>

			<footer class="single-footer">
				<?php if ( get_the_tags() ) : ?>
					<div class="single-tags">
						<span class="label"><?php esc_html_e( 'Filed under', 'visualis-journal' ); ?></span>
						<?php visualis_tag_pills( 10 ); ?>
					</div>
				<?php endif; ?>

				<div class="author-box">
					<?php echo wp_kses_post( get_avatar( get_the_author_meta( 'ID' ), 88, '', '', array( 'class' => 'author-box__avatar' ) ) ); ?>
					<div>
						<p class="label"><?php esc_html_e( 'About the author', 'visualis-journal' ); ?></p>
						<h2 class="author-box__name"><?php echo esc_html( get_the_author() ); ?></h2>
						<p class="author-box__bio">
							<?php
							$visualis_bio = get_the_author_meta( 'description' );
							echo esc_html( $visualis_bio ? $visualis_bio : __( 'Writes about design, systems, and the work behind the work.', 'visualis-journal' ) );
							?>
						</p>
						<a class="text-link" href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><?php esc_html_e( 'More by this author', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
					</div>
				</div>

				<?php
				the_post_navigation(
					array(
						'prev_text' => '<span class="label">' . esc_html__( 'Previous essay', 'visualis-journal' ) . '</span><span class="post-nav__title">%title</span>',
						'next_text' => '<span class="label">' . esc_html__( 'Next essay', 'visualis-journal' ) . '</span><span class="post-nav__title">%title</span>',
					)
				);
				?>

				<?php edit_post_link( __( 'Edit this essay', 'visualis-journal' ), '<p class="edit-link">', '</p>' ); ?>
			</footer>
		</div>
	</article>

	<?php
	$visualis_tags = get_the_tags();

	if ( $visualis_tags ) :
		$visualis_related = new WP_Query(
			array(
				'posts_per_page'      => 3,
				'post__not_in'        => array( get_the_ID() ),
				'ignore_sticky_posts' => true,
				'tag__in'             => wp_list_pluck( $visualis_tags, 'term_id' ),
			)
		);

		if ( $visualis_related->have_posts() ) :
			?>
			<section class="section wrap related-posts">
				<header class="section-head">
					<div>
						<p class="label"><?php esc_html_e( 'Keep reading', 'visualis-journal' ); ?></p>
						<h2><?php esc_html_e( 'Related essays', 'visualis-journal' ); ?></h2>
					</div>
				</header>
				<div class="post-grid">
					<?php
					while ( $visualis_related->have_posts() ) :
						$visualis_related->the_post();
						get_template_part( 'template-parts/content', 'card' );
					endwhile;
					?>
				</div>
			</section>
			<?php
		endif;

		wp_reset_postdata();
	endif;
endwhile;
?>

</main>

<?php
get_footer();
