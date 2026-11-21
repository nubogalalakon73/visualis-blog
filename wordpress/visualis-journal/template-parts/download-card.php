<?php
/**
 * Download card.
 *
 * @package Visualis_Journal
 */

$visualis_member = visualis_is_member();
?>

<article id="download-<?php the_ID(); ?>" <?php post_class( 'download-card' ); ?>>
	<div class="download-card__top">
		<span class="download-card__label"><?php echo esc_html( visualis_download_label() ); ?></span>
		<?php if ( ! $visualis_member ) : ?>
			<span class="lock-badge"><span aria-hidden="true">●</span> <?php esc_html_e( 'Members', 'visualis-journal' ); ?></span>
		<?php endif; ?>
	</div>

	<div class="download-card__icon" aria-hidden="true">
		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'visualis-card', array( 'class' => 'download-card__image', 'loading' => 'lazy' ) ); ?>
		<?php else : ?>
			<span>↓</span>
		<?php endif; ?>
	</div>

	<h3 class="download-card__title">
		<a href="<?php echo esc_url( get_permalink() ); ?>"><?php the_title(); ?></a>
	</h3>

	<p class="download-card__excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 22, '…' ) ); ?></p>

	<div class="download-card__foot">
		<span class="label"><?php esc_html_e( 'Working file', 'visualis-journal' ); ?></span>
		<a class="download-card__link" href="<?php echo esc_url( get_permalink() ); ?>">
			<?php esc_html_e( 'Open file', 'visualis-journal' ); ?> <span aria-hidden="true">→</span>
		</a>
	</div>
</article>
