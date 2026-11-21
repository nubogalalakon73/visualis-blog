<?php
/**
 * Template Name: Studio
 *
 * A front-end dashboard for writers. Editing itself stays in WordPress.
 *
 * @package Visualis_Journal
 */

get_header();

if ( have_posts() ) {
	the_post();
}
?>

<main id="content">
	<header class="page-hero wrap">
		<p class="label"><?php esc_html_e( 'The studio', 'visualis-journal' ); ?></p>
		<h1 class="page-title"><?php the_title(); ?></h1>
		<?php if ( get_the_content() ) : ?>
			<div class="page-hero__intro"><?php the_content(); ?></div>
		<?php else : ?>
			<p class="page-hero__intro"><?php esc_html_e( 'A quiet room for drafts. Write, revise, and publish when the piece is ready.', 'visualis-journal' ); ?></p>
		<?php endif; ?>
		<div class="page-hero__rule" aria-hidden="true"></div>
	</header>

	<section class="wrap section">
		<?php if ( ! is_user_logged_in() ) : ?>
			<div class="gate-panel">
				<div class="gate-panel__stamp" aria-hidden="true">V</div>
				<p class="label"><?php esc_html_e( 'Members’ studio', 'visualis-journal' ); ?></p>
				<h2><?php esc_html_e( 'Sign in to write.', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'The studio is open to members and contributors. Your drafts stay private until you publish them.', 'visualis-journal' ); ?></p>
				<div class="gate-panel__actions">
					<a class="btn btn--primary btn--large" href="<?php echo esc_url( wp_login_url( get_permalink() ) ); ?>"><?php esc_html_e( 'Log in', 'visualis-journal' ); ?></a>
					<a class="btn btn--large" href="<?php echo esc_url( visualis_membership_url() ); ?>"><?php esc_html_e( 'Become a member', 'visualis-journal' ); ?></a>
				</div>
			</div>
		<?php elseif ( ! current_user_can( 'edit_posts' ) ) : ?>
			<div class="gate-panel">
				<p class="label"><?php esc_html_e( 'Almost there', 'visualis-journal' ); ?></p>
				<h2><?php esc_html_e( 'Your account can read, but not publish.', 'visualis-journal' ); ?></h2>
				<p><?php esc_html_e( 'Ask the site administrator for the Contributor role to start drafting essays. Membership and writing access are managed separately.', 'visualis-journal' ); ?></p>
				<a class="btn btn--primary" href="<?php echo esc_url( visualis_account_url() ); ?>"><?php esc_html_e( 'View your account', 'visualis-journal' ); ?></a>
			</div>
		<?php else : ?>
			<?php
			$visualis_my_posts = get_posts(
				array(
					'author'         => get_current_user_id(),
					'post_type'      => 'post',
					'post_status'    => array( 'publish', 'draft', 'pending', 'future' ),
					'posts_per_page' => 30,
					'orderby'        => 'modified',
					'order'          => 'DESC',
				)
			);

			$visualis_status_labels = array(
				'publish' => __( 'Published', 'visualis-journal' ),
				'draft'   => __( 'Draft', 'visualis-journal' ),
				'pending' => __( 'In review', 'visualis-journal' ),
				'future'  => __( 'Scheduled', 'visualis-journal' ),
			);
			?>

			<div class="studio-bar">
				<div>
					<p class="label"><?php esc_html_e( 'Signed in as', 'visualis-journal' ); ?></p>
					<p class="studio-bar__user"><?php echo esc_html( wp_get_current_user()->display_name ); ?></p>
				</div>
				<div class="studio-bar__actions">
					<a class="btn btn--primary" href="<?php echo esc_url( admin_url( 'post-new.php' ) ); ?>"><?php esc_html_e( 'New essay', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
					<a class="btn" href="<?php echo esc_url( visualis_journal_url() ); ?>"><?php esc_html_e( 'View journal', 'visualis-journal' ); ?></a>
				</div>
			</div>

			<?php if ( $visualis_my_posts ) : ?>
				<div class="studio-list">
					<?php foreach ( $visualis_my_posts as $visualis_post ) : ?>
						<article class="studio-row">
							<div class="studio-row__main">
								<span class="status-badge status-badge--<?php echo esc_attr( $visualis_post->post_status ); ?>">
									<?php echo esc_html( isset( $visualis_status_labels[ $visualis_post->post_status ] ) ? $visualis_status_labels[ $visualis_post->post_status ] : $visualis_post->post_status ); ?>
								</span>
								<h2 class="studio-row__title">
									<?php echo esc_html( get_the_title( $visualis_post ) ? get_the_title( $visualis_post ) : __( 'Untitled draft', 'visualis-journal' ) ); ?>
								</h2>
								<p class="studio-row__meta">
									<?php
									printf(
										/* translators: %s: date. */
										esc_html__( 'Last edited %s', 'visualis-journal' ),
										esc_html( get_the_modified_date( '', $visualis_post ) )
									);
									?>
								</p>
							</div>
							<div class="studio-row__actions">
								<?php $visualis_edit = get_edit_post_link( $visualis_post->ID ); ?>
								<?php if ( $visualis_edit ) : ?>
									<a class="btn btn--small" href="<?php echo esc_url( $visualis_edit ); ?>"><?php esc_html_e( 'Edit', 'visualis-journal' ); ?></a>
								<?php endif; ?>
								<?php if ( 'publish' === $visualis_post->post_status ) : ?>
									<a class="text-link" href="<?php echo esc_url( get_permalink( $visualis_post ) ); ?>"><?php esc_html_e( 'View', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
								<?php endif; ?>
							</div>
						</article>
					<?php endforeach; ?>
				</div>
			<?php else : ?>
				<div class="empty-state">
					<p class="label"><?php esc_html_e( 'A blank page', 'visualis-journal' ); ?></p>
					<h2><?php esc_html_e( 'Your first essay starts here.', 'visualis-journal' ); ?></h2>
					<p><?php esc_html_e( 'Draft it in WordPress, save it privately, and publish when it earns the space.', 'visualis-journal' ); ?></p>
					<a class="btn btn--primary" href="<?php echo esc_url( admin_url( 'post-new.php' ) ); ?>"><?php esc_html_e( 'New essay', 'visualis-journal' ); ?> <span aria-hidden="true">→</span></a>
				</div>
			<?php endif; ?>
		<?php endif; ?>
	</section>
</main>

<?php
get_footer();
