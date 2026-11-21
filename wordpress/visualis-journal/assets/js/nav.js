( function () {
	'use strict';

	var toggle = document.querySelector( '.nav-toggle' );
	var nav = document.getElementById( 'site-navigation' );

	if ( ! toggle || ! nav ) {
		return;
	}

	function closeMenu() {
		toggle.setAttribute( 'aria-expanded', 'false' );
		document.body.classList.remove( 'nav-open' );
	}

	toggle.addEventListener( 'click', function () {
		var isOpen = toggle.getAttribute( 'aria-expanded' ) === 'true';
		toggle.setAttribute( 'aria-expanded', isOpen ? 'false' : 'true' );
		document.body.classList.toggle( 'nav-open', ! isOpen );
	} );

	document.addEventListener( 'keydown', function ( event ) {
		if ( event.key === 'Escape' ) {
			closeMenu();
		}
	} );

	nav.addEventListener( 'click', function ( event ) {
		if ( event.target.closest( 'a' ) ) {
			closeMenu();
		}
	} );

	window.addEventListener( 'resize', function () {
		if ( window.innerWidth > 960 ) {
			closeMenu();
		}
	} );
} )();
