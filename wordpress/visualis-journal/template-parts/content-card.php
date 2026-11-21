<?php
/**
 * Post card.
 *
 * @package Visualis_Journal
 */

$visualis_featured = ! empty( $args['featured'] );
$visualis_classes  = array( 'post-card' );

if ( $visualis_featured ) {
	$visualis_classes[] = 'post-card--featured';
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( $visualis_classes ); ?>>
	<a class="post-card__cover" href="<?php echo esc_url( get_permalink() ); ?>" aria-hidden="true" tabindex="-1">
		<?php visualis_post_cover( $visualis_featured ? 'hero' : 'card' ); ?>
	</a>

	<div class="post-card__body">
		<div class="post-card__top">
			<?php visualis_tag_pills( 2 ); ?>
			<span class="post-card__read"><?php echo esc_html( visualis_reading_label() ); ?></span>
		</div>

		<h2 class="post-card__title">
			<a href="<?php echo esc_url( get_permalink() ); ?>"><?php the_title(); ?></a>
		</h2>

		<p class="post-card__excerpt"><?php echo esc_html( visualis_standfirst( $visualis_featured ? 38 : 24 ) ); ?></p>

		<div class="post-card__meta">
			<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
			<span class="entry-meta__dot" aria-hidden="true"></span>
			<span><?php echo esc_html( get_the_author() ); ?></span>
		</div>
	</div>
</article>
