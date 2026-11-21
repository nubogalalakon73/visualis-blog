<?php
/**
 * Template Name: Tags Index
 *
 * @package Visualis_Journal
 */

get_header();

if ( have_posts() ) {
	the_post();
}

$visualis_tags = get_tags(
	array(
		'hide_empty' => true,
		'orderby'    => 'name',
		'order'      => 'ASC',
	)
);
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'Index', 'visualis-journal' ); ?></p>
		<h1 class="page-title"><?php the_title(); ?></h1>
		<?php if ( get_the_content() ) : ?>
			<div class="page-hero__intro"><?php the_content(); ?></div>
		<?php else : ?>
			<p class="page-hero__intro"><?php esc_html_e( 'Every thread in the journal, from layout to studio process.', 'visualis-journal' ); ?></p>
		<?php endif; ?>
		<div class="page-hero__rule" aria-hidden="true"></div>
	</header>

	<section class="section wrap">
		<?php if ( $visualis_tags ) : ?>
			<ul class="tag-cloud tag-cloud--index">
				<?php foreach ( $visualis_tags as $visualis_tag ) : ?>
					<li>
						<a class="tag-pill tag-pill--large" href="<?php echo esc_url( get_tag_link( $visualis_tag->term_id ) ); ?>">
							<?php echo esc_html( $visualis_tag->name ); ?>
							<span class="tag-pill__count"><?php echo esc_html( (string) $visualis_tag->count ); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		<?php else : ?>
			<div class="empty-state">
				<h2><?php esc_html_e( 'No tags yet.', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'Tags appear here once essays are published.', 'visualis-journal' ); ?></p>
			</div>
		<?php endif; ?>
	</section>
</main>

<?php
get_footer();
