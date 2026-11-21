<?php
/**
 * Shared post loop.
 *
 * @package Visualis_Journal
 */

if ( have_posts() ) :
	?>
	<div class="post-grid">
		<?php
		while ( have_posts() ) :
			the_post();
			get_template_part( 'template-parts/content', 'card' );
		endwhile;
		?>
	</div>
	<?php
	visualis_pagination();
else :
	get_template_part( 'template-parts/content', 'none' );
endif;
