<?php
/**
 * Front page.
 *
 * @package Visualis_Journal
 */

get_header();

$visualis_journal = new WP_Query(
	array(
		'posts_per_page'      => 5,
		'post_status'         => 'publish',
		'ignore_sticky_posts' => false,
	)
);

$visualis_tags = get_tags(
	array(
		'orderby'    => 'count',
		'order'      => 'DESC',
		'number'     => 8,
		'hide_empty' => true,
	)
);

$visualis_post_counts    = wp_count_posts();
$visualis_post_total     = isset( $visualis_post_counts->publish ) ? (int) $visualis_post_counts->publish : 0;
$visualis_shelf_count    = visualis_get_downloads( 1 );
$visualis_download_total = (int) $visualis_shelf_count->found_posts;
?>

<main id="content">

	<section class="hero">
		<div class="wrap hero__grid">
			<div class="hero__copy">
				<p class="label hero__kicker"><?php echo esc_html( get_theme_mod( 'visualis_hero_kicker', __( 'Visualis Journal — Vol. 04', 'visualis-journal' ) ) ); ?></p>
				<h1 class="hero__title"><?php echo esc_html( get_theme_mod( 'visualis_hero_title', __( 'Design notes for people who make things.', 'visualis-journal' ) ) ); ?></h1>
				<p class="hero__intro"><?php echo esc_html( get_theme_mod( 'visualis_hero_intro', __( 'An independent editorial studio in Jakarta writing about layout, type, colour, and the decisions behind the work.', 'visualis-journal' ) ) ); ?></p>
				<div class="hero__actions">
					<a class="btn btn--primary btn--large" href="<?php echo esc_url( visualis_journal_url() ); ?>">
						<?php esc_html_e( 'Read the journal', 'visualis-journal' ); ?>
						<span aria-hidden="true">→</span>
					</a>
					<?php if ( visualis_library_url() ) : ?>
						<a class="btn btn--large" href="<?php echo esc_url( visualis_library_url() ); ?>"><?php esc_html_e( 'The members’ shelf', 'visualis-journal' ); ?></a>
					<?php endif; ?>
				</div>
				<div class="hero__stats">
					<div class="hero__stat">
						<span class="hero__stat-number"><?php echo esc_html( (string) $visualis_post_total ); ?></span>
						<span class="label"><?php esc_html_e( 'Essays', 'visualis-journal' ); ?></span>
					</div>
					<div class="hero__stat">
						<span class="hero__stat-number"><?php echo esc_html( (string) $visualis_download_total ); ?></span>
						<span class="label"><?php esc_html_e( 'Shelf files', 'visualis-journal' ); ?></span>
					</div>
					<div class="hero__stat">
						<span class="hero__stat-number">04</span>
						<span class="label"><?php esc_html_e( 'Issues / year', 'visualis-journal' ); ?></span>
					</div>
				</div>
			</div>

			<aside class="hero-card" aria-label="<?php esc_attr_e( 'About the journal', 'visualis-journal' ); ?>">
				<div class="hero-card__head">
					<span class="label"><?php esc_html_e( 'The working shelf', 'visualis-journal' ); ?></span>
					<span class="hero-card__badge"><?php esc_html_e( 'Members', 'visualis-journal' ); ?></span>
				</div>
				<div class="hero-card__art" aria-hidden="true">
					<span></span><span></span><span></span><span></span>
				</div>
				<div class="hero-card__body">
					<h2><?php esc_html_e( 'Templates, grids, and checklists we actually use.', 'visualis-journal' ); ?></h2>
					<p><?php esc_html_e( 'A small library of working files for the people who support the journal.', 'visualis-journal' ); ?></p>
					<?php if ( visualis_library_url() ) : ?>
						<a class="text-link" href="<?php echo esc_url( visualis_library_url() ); ?>">
							<?php esc_html_e( 'Open the shelf', 'visualis-journal' ); ?> <span aria-hidden="true">→</span>
						</a>
					<?php endif; ?>
				</div>
			</aside>
		</div>
	</section>

	<div class="ticker" aria-hidden="true">
		<div class="ticker__track">
			<span><?php esc_html_e( 'New essays every other Thursday', 'visualis-journal' ); ?></span>
			<span>✳</span>
			<span><?php esc_html_e( 'Jakarta, Indonesia', 'visualis-journal' ); ?></span>
			<span>✳</span>
			<span><?php esc_html_e( 'Layout · Type · Colour · Process', 'visualis-journal' ); ?></span>
			<span>✳</span>
			<span><?php esc_html_e( 'New essays every other Thursday', 'visualis-journal' ); ?></span>
			<span>✳</span>
			<span><?php esc_html_e( 'Jakarta, Indonesia', 'visualis-journal' ); ?></span>
			<span>✳</span>
			<span><?php esc_html_e( 'Layout · Type · Colour · Process', 'visualis-journal' ); ?></span>
			<span>✳</span>
		</div>
	</div>

	<section class="section wrap">
		<header class="section-head">
			<div>
				<p class="label"><?php esc_html_e( 'The journal', 'visualis-journal' ); ?></p>
				<h2><?php esc_html_e( 'Latest essays', 'visualis-journal' ); ?></h2>
			</div>
			<a class="text-link" href="<?php echo esc_url( visualis_journal_url() ); ?>"><?php esc_html_e( 'All essays', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
		</header>

		<?php if ( $visualis_journal->have_posts() ) : ?>
			<div class="post-grid">
				<?php
				while ( $visualis_journal->have_posts() ) :
					$visualis_journal->the_post();
					get_template_part(
						'template-parts/content',
						'card',
						array( 'featured' => 0 === $visualis_journal->current_post )
					);
				endwhile;
				?>
			</div>
		<?php else : ?>
			<?php get_template_part( 'template-parts/content', 'none' ); ?>
		<?php endif; ?>
		<?php wp_reset_postdata(); ?>
	</section>

	<?php if ( $visualis_tags ) : ?>
		<section class="section section--tags wrap">
			<header class="section-head">
				<div>
					<p class="label"><?php esc_html_e( 'Browse', 'visualis-journal' ); ?></p>
					<h2><?php esc_html_e( 'By tag', 'visualis-journal' ); ?></h2>
				</div>
				<?php if ( visualis_tags_url() ) : ?>
					<a class="text-link" href="<?php echo esc_url( visualis_tags_url() ); ?>"><?php esc_html_e( 'All tags', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
				<?php endif; ?>
			</header>
			<ul class="tag-cloud">
				<?php foreach ( $visualis_tags as $visualis_tag ) : ?>
					<li>
						<a class="tag-pill tag-pill--large" href="<?php echo esc_url( get_tag_link( $visualis_tag->term_id ) ); ?>">
							<?php echo esc_html( $visualis_tag->name ); ?>
							<span class="tag-pill__count"><?php echo esc_html( (string) $visualis_tag->count ); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</section>
	<?php endif; ?>

	<?php
	$visualis_shelf = visualis_get_downloads( 3 );
	if ( $visualis_shelf->have_posts() ) :
		?>
		<section class="section wrap">
			<header class="section-head">
				<div>
					<p class="label"><?php esc_html_e( 'Members’ shelf', 'visualis-journal' ); ?></p>
					<h2><?php esc_html_e( 'Files worth keeping', 'visualis-journal' ); ?></h2>
				</div>
				<?php if ( visualis_library_url() ) : ?>
					<a class="text-link" href="<?php echo esc_url( visualis_library_url() ); ?>"><?php esc_html_e( 'Open the shelf', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
				<?php endif; ?>
			</header>
			<div class="download-grid">
				<?php
				while ( $visualis_shelf->have_posts() ) :
					$visualis_shelf->the_post();
					get_template_part( 'template-parts/download', 'card' );
				endwhile;
				?>
			</div>
		</section>
		<?php
		wp_reset_postdata();
	elseif ( current_user_can( 'manage_options' ) ) :
		?>
		<section class="section wrap">
			<div class="setup-note">
				<p class="label"><?php esc_html_e( 'Setup', 'visualis-journal' ); ?></p>
				<h2><?php esc_html_e( 'Add the members’ shelf', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'Install Download Monitor or Easy Digital Downloads, publish a few downloads, then assign the Members’ Shelf template to a page. This note is only visible to administrators.', 'visualis-journal' ); ?></p>
			</div>
		</section>
	<?php endif; ?>

	<section class="section wrap">
		<div class="studio-cta">
			<div>
				<p class="label"><?php esc_html_e( 'The studio', 'visualis-journal' ); ?></p>
				<h2><?php esc_html_e( 'Write the next one.', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'Draft essays in WordPress, keep them private until they are ready, and publish on your own schedule.', 'visualis-journal' ); ?></p>
			</div>
			<div class="studio-cta__actions">
				<?php if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) : ?>
					<a class="btn btn--primary btn--large" href="<?php echo esc_url( admin_url( 'post-new.php' ) ); ?>"><?php esc_html_e( 'New essay', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
					<?php if ( visualis_studio_url() ) : ?>
						<a class="btn btn--large" href="<?php echo esc_url( visualis_studio_url() ); ?>"><?php esc_html_e( 'Open the studio', 'visualis-journal' ); ?></a>
					<?php endif; ?>
				<?php else : ?>
					<a class="btn btn--primary btn--large" href="<?php echo esc_url( visualis_studio_url() ? visualis_studio_url() : wp_login_url() ); ?>"><?php esc_html_e( 'Enter the studio', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
				<?php endif; ?>
			</div>
		</div>
	</section>

</main>

<?php
get_footer();
