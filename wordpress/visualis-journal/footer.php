<?php
/**
 * Site footer.
 *
 * @package Visualis_Journal
 */
?>
<footer class="site-footer">
	<div class="wrap footer-grid">
		<div class="footer-brand">
			<a class="brand brand--footer" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
				<span class="brand__mark" aria-hidden="true">V</span>
				<span class="brand__text">
					<span class="brand__name"><?php bloginfo( 'name' ); ?></span>
					<span class="brand__tag"><?php esc_html_e( 'Design journal', 'visualis-journal' ); ?></span>
				</span>
			</a>
			<p class="footer-note"><?php echo esc_html( get_theme_mod( 'visualis_footer_text', __( 'Independent design writing from Jakarta. Published slowly, on purpose.', 'visualis-journal' ) ) ); ?></p>
		</div>

		<div class="footer-column">
			<h2 class="label"><?php esc_html_e( 'Explore', 'visualis-journal' ); ?></h2>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'menu_class'     => 'footer-list',
					'fallback_cb'    => 'visualis_footer_menu_fallback',
					'depth'          => 1,
				)
			);
			?>
		</div>

		<div class="footer-column">
			<h2 class="label"><?php esc_html_e( 'Search', 'visualis-journal' ); ?></h2>
			<?php get_search_form(); ?>
			<?php if ( ! visualis_is_member() && visualis_library_url() ) : ?>
				<a class="footer-shelf-link" href="<?php echo esc_url( visualis_library_url() ); ?>">
					<?php esc_html_e( 'Peek at the members’ shelf', 'visualis-journal' ); ?> <span aria-hidden="true">→</span>
				</a>
			<?php endif; ?>
		</div>

		<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
			<div class="footer-column">
				<?php dynamic_sidebar( 'footer-1' ); ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="wrap footer-bottom">
		<p>&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?></p>
		<p><?php esc_html_e( 'Neobrutalism Minimalism — built for reading.', 'visualis-journal' ); ?></p>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
