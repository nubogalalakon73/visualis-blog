<?php
/**
 * Empty state.
 *
 * @package Visualis_Journal
 */
?>

<div class="empty-state">
	<p class="label"><?php esc_html_e( 'Nothing here yet', 'visualis-journal' ); ?></p>
	<h2>
		<?php
		if ( is_search() ) {
			esc_html_e( 'No essays matched that search.', 'visualis-journal' );
		} else {
			esc_html_e( 'The journal is warming up.', 'visualis-journal' );
		}
		?>
	</h2>
	<p><?php esc_html_e( 'Try a different phrase, browse the tags, or start the first draft.', 'visualis-journal' ); ?></p>

	<div class="empty-state__search"><?php get_search_form(); ?></div>

	<?php if ( current_user_can( 'edit_posts' ) ) : ?>
		<a class="btn btn--primary" href="<?php echo esc_url( admin_url( 'post-new.php' ) ); ?>"><?php esc_html_e( 'Write the first essay', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
	<?php endif; ?>
</div>
