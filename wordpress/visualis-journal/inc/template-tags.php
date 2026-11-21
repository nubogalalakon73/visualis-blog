<?php
/**
 * Template helpers.
 *
 * @package Visualis_Journal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * URL of the posts page, falling back to the site root.
 *
 * @return string
 */
function visualis_journal_url() {
	$page_for_posts = (int) get_option( 'page_for_posts' );

	return $page_for_posts ? get_permalink( $page_for_posts ) : home_url( '/' );
}

/**
 * Find a published page by slug.
 *
 * @param string $slug Page slug.
 * @return string
 */
function visualis_page_url( $slug ) {
	static $cache = array();

	if ( isset( $cache[ $slug ] ) ) {
		return $cache[ $slug ];
	}

	$page = get_page_by_path( $slug );
	$cache[ $slug ] = ( $page && 'publish' === $page->post_status ) ? get_permalink( $page ) : '';

	return $cache[ $slug ];
}

/**
 * Find the first published page using a page template.
 *
 * @param string $template Template file name.
 * @return string
 */
function visualis_page_url_by_template( $template ) {
	static $cache = array();

	if ( isset( $cache[ $template ] ) ) {
		return $cache[ $template ];
	}

	$pages = get_pages(
		array(
			'meta_key'    => '_wp_page_template',
			'meta_value'  => $template,
			'number'      => 1,
			'post_status' => 'publish',
		)
	);

	$cache[ $template ] = $pages ? get_permalink( $pages[0] ) : '';

	return $cache[ $template ];
}

/**
 * Library page URL.
 *
 * @return string
 */
function visualis_library_url() {
	return visualis_page_url_by_template( 'page-library.php' ) ?: visualis_page_url( 'library' );
}

/**
 * Studio page URL.
 *
 * @return string
 */
function visualis_studio_url() {
	return visualis_page_url_by_template( 'page-studio.php' ) ?: visualis_page_url( 'studio' );
}

/**
 * Tags index page URL.
 *
 * @return string
 */
function visualis_tags_url() {
	return visualis_page_url_by_template( 'page-tags.php' ) ?: visualis_page_url( 'tags' );
}

/**
 * Estimated reading time in minutes.
 *
 * @param int|null $post_id Optional post ID.
 * @return int
 */
function visualis_reading_time( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$content = get_post_field( 'post_content', $post_id );
	$words   = str_word_count( wp_strip_all_tags( (string) $content ) );

	return max( 1, (int) ceil( $words / 200 ) );
}

/**
 * First tag name, or the first category, or a fallback label.
 *
 * @param int|null $post_id Optional post ID.
 * @return string
 */
function visualis_primary_term( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();

	$tags = get_the_tags( $post_id );
	if ( $tags && ! is_wp_error( $tags ) ) {
		return $tags[0]->name;
	}

	$categories = get_the_category( $post_id );
	if ( $categories && ! is_wp_error( $categories ) ) {
		return $categories[0]->name;
	}

	return __( 'Journal', 'visualis-journal' );
}

/**
 * Reading time label.
 *
 * @param int|null $post_id Optional post ID.
 * @return string
 */
function visualis_reading_label( $post_id = null ) {
	$minutes = visualis_reading_time( $post_id );

	/* translators: %d: number of minutes. */
	return sprintf( _n( '%d min read', '%d min read', $minutes, 'visualis-journal' ), $minutes );
}

/**
 * Post cover: featured image when available, otherwise generated artwork.
 *
 * @param string $size Cover size: card or hero.
 */
function visualis_post_cover( $size = 'card' ) {
	if ( has_post_thumbnail() ) {
		the_post_thumbnail(
			'hero' === $size ? 'visualis-cover' : 'visualis-card',
			array(
				'class'   => 'cover-image',
				'loading' => is_singular() ? 'eager' : 'lazy',
			)
		);
		return;
	}

	$variants = array( 'lime', 'sky', 'coral', 'butter', 'lilac' );
	$variant  = $variants[ get_the_ID() % count( $variants ) ];
	$title    = wp_strip_all_tags( get_the_title() );
	$initial  = function_exists( 'mb_substr' ) ? mb_substr( $title, 0, 1 ) : substr( $title, 0, 1 );
	$label    = visualis_primary_term();
	?>
	<div class="cover-art cover-art--<?php echo esc_attr( $variant ); ?>" aria-hidden="true">
		<span class="cover-art__grid"></span>
		<span class="cover-art__mark"><?php echo esc_html( $initial ); ?></span>
		<span class="cover-art__label"><?php echo esc_html( $label ); ?></span>
		<span class="cover-art__rule"></span>
	</div>
	<?php
}

/**
 * Small tag pills for a post.
 *
 * @param int $limit Maximum tags.
 */
function visualis_tag_pills( $limit = 2 ) {
	$tags = get_the_tags();

	if ( ! $tags || is_wp_error( $tags ) ) {
		return;
	}

	$tags = array_slice( $tags, 0, $limit );
	echo '<ul class="tag-pills" aria-label="' . esc_attr__( 'Tags', 'visualis-journal' ) . '">';
	foreach ( $tags as $tag ) {
		printf(
			'<li><a class="tag-pill" href="%1$s" rel="tag">%2$s</a></li>',
			esc_url( get_tag_link( $tag->term_id ) ),
			esc_html( $tag->name )
		);
	}
	echo '</ul>';
}

/**
 * Post meta line.
 */
function visualis_entry_meta() {
	?>
	<div class="entry-meta">
		<time class="entry-meta__item" datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>">
			<?php echo esc_html( get_the_date() ); ?>
		</time>
		<span class="entry-meta__dot" aria-hidden="true"></span>
		<span class="entry-meta__item"><?php echo esc_html( visualis_reading_label() ); ?></span>
		<?php if ( ! is_page() ) : ?>
			<span class="entry-meta__dot" aria-hidden="true"></span>
			<a class="entry-meta__item" href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>">
				<?php echo esc_html( get_the_author() ); ?>
			</a>
		<?php endif; ?>
	</div>
	<?php
}

/**
 * Pagination with the theme's markup.
 */
function visualis_pagination() {
	the_posts_pagination(
		array(
			'mid_size'  => 1,
			'prev_text' => esc_html__( 'Previous', 'visualis-journal' ),
			'next_text' => esc_html__( 'Next', 'visualis-journal' ),
			'class'     => 'pagination',
		)
	);
}

/**
 * First paragraph of the current post as a standfirst.
 *
 * @param int $words Word limit.
 * @return string
 */
function visualis_standfirst( $words = 34 ) {
	$excerpt = get_the_excerpt();

	if ( ! $excerpt ) {
		return '';
	}

	return wp_trim_words( $excerpt, $words, '&hellip;' );
}
