<?php
/**
 * Template Name: Members' Shelf
 *
 * Lists downloads from Download Monitor or Easy Digital Downloads. The theme
 * shows member state; the download and membership plugins enforce file access.
 *
 * @package Visualis_Journal
 */

get_header();

if ( have_posts() ) {
	the_post();
}

$visualis_downloads = visualis_get_downloads( 24 );
$visualis_is_member = visualis_is_member();
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'Members’ shelf', 'visualis-journal' ); ?></p>
		<h1 class="page-title"><?php the_title(); ?></h1>
		<?php if ( get_the_content() ) : ?>
			<div class="page-hero__intro"><?php the_content(); ?></div>
		<?php else : ?>
			<p class="page-hero__intro"><?php esc_html_e( 'Working files, templates, and checklists from the studio. Published for members, updated when we learn something.', 'visualis-journal' ); ?></p>
		<?php endif; ?>
		<div class="page-hero__rule" aria-hidden="true"></div>
	</header>

	<section class="wrap">
		<div class="access-panel <?php echo $visualis_is_member ? 'access-panel--member' : 'access-panel--locked'; ?>">
			<div class="access-panel__stamp" aria-hidden="true"><?php echo $visualis_is_member ? '✓' : 'M'; ?></div>
			<div class="access-panel__body">
				<p class="label"><?php esc_html_e( 'Member access', 'visualis-journal' ); ?></p>
				<?php if ( $visualis_is_member ) : ?>
					<h2><?php esc_html_e( 'You’re in.', 'visualis-journal' ); ?></h2>
					<p><?php esc_html_e( 'Every file on this shelf is cleared for your membership. If a download is restricted by level, the plugin will tell you.', 'visualis-journal' ); ?></p>
				<?php else : ?>
					<h2><?php esc_html_e( 'The shelf is for members.', 'visualis-journal' ); ?></h2>
					<p><?php esc_html_e( 'Join to open the working files, or log in if you already support the journal.', 'visualis-journal' ); ?></p>
				<?php endif; ?>
			</div>
			<div class="access-panel__actions">
				<?php if ( $visualis_is_member ) : ?>
					<a class="btn btn--small" href="<?php echo esc_url( visualis_account_url() ); ?>"><?php esc_html_e( 'Manage membership', 'visualis-journal' ); ?></a>
				<?php else : ?>
					<a class="btn btn--small btn--primary" href="<?php echo esc_url( visualis_membership_url() ); ?>"><?php esc_html_e( 'Become a member', 'visualis-journal' ); ?></a>
					<a class="btn btn--small" href="<?php echo esc_url( wp_login_url( get_permalink() ) ); ?>"><?php esc_html_e( 'Log in', 'visualis-journal' ); ?></a>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<section class="section wrap">
		<?php if ( $visualis_downloads->have_posts() ) : ?>
			<div class="download-grid">
				<?php
				while ( $visualis_downloads->have_posts() ) :
					$visualis_downloads->the_post();
					get_template_part( 'template-parts/download', 'card' );
				endwhile;
				?>
			</div>
			<?php wp_reset_postdata(); ?>
					<?php elseif ( current_user_can( 'manage_options' ) ) : ?>
				<div class="setup-note">
					<p class="label"><?php esc_html_e( 'Setup', 'visualis-journal' ); ?></p>
					<h2><?php echo visualis_has_download_plugin() ? esc_html__( 'Add your first download', 'visualis-journal' ) : esc_html__( 'Connect a download plugin', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'Install Download Monitor or Easy Digital Downloads and publish downloads. This template lists either plugin’s entries automatically.', 'visualis-journal' ); ?></p>
				<ol class="setup-list">
					<li><?php esc_html_e( 'Install and activate Download Monitor (or Easy Digital Downloads).', 'visualis-journal' ); ?></li>
					<li><?php esc_html_e( 'Add downloads and mark each one as members-only in the plugin.', 'visualis-journal' ); ?></li>
					<li><?php esc_html_e( 'Configure access rules in Paid Memberships Pro or MemberPress so the files are protected at the server level.', 'visualis-journal' ); ?></li>
				</ol>
				<a class="btn btn--small" href="<?php echo esc_url( admin_url( 'plugin-install.php' ) ); ?>"><?php esc_html_e( 'Open plugins', 'visualis-journal' ); ?></a>
			</div>
		<?php else : ?>
			<div class="empty-state">
				<p class="label"><?php esc_html_e( 'Members’ shelf', 'visualis-journal' ); ?></p>
				<h2><?php esc_html_e( 'We’re restocking the shelf.', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'New working files are on the way. Members will see them here first.', 'visualis-journal' ); ?></p>
			</div>
		<?php endif; ?>
	</section>
</main>

<?php
get_footer();
