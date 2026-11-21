=== Visualis Journal ===
Contributors: visualis
Requires at least: 6.4
Tested up to: 6.8
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Tags: blog, one-column, custom-menu, custom-logo, featured-images, editor-style, translation-ready, block-styles, wide-blocks

A neobrutalist minimal editorial theme for independent journals, with a members' download shelf.

== Description ==

Visualis Journal is a classic WordPress theme built for reading. Square corners,
flat colour, hard borders, and a strict editorial grid. It includes templates for
a landing page, the essay index, single essays, tag archives, a tags index, a
members' shelf, and a writer's studio.

The theme is designed to sit alongside membership and download plugins rather than
replace them. The theme decides what to show; the plugins enforce access.

Supported integration paths:

* Paid Memberships Pro — membership state via `pmpro_hasMembershipLevel()`.
* MemberPress — membership state via `MeprUser::is_active()`.
* Download Monitor — lists the `dlm_download` post type.
* Easy Digital Downloads — lists the `download` post type.

The library template does not expose file URLs. It links to each download's
permalink so the download plugin can run its own access checks.

== Installation ==

1. In WordPress, go to Appearance → Themes → Add New → Upload Theme.
2. Upload `visualis-journal.zip` and activate the theme.
3. Create these pages:
   * Journal — the blog index.
   * Library — assign the "Members' Shelf" page template.
   * Studio — assign the "Studio" page template.
   * Tags — assign the "Tags Index" page template.
4. Go to Settings → Reading and set "Posts page" to Journal.
5. Go to Appearance → Menus, create a primary menu, and assign it to "Primary menu".
   The footer menu is optional; a fallback is provided.
6. Customize the hero and footer under Appearance → Customize → Visualis settings.

== Recommended plugins ==

Choose one membership plugin:

* Paid Memberships Pro (free) — https://wordpress.org/plugins/paid-memberships-pro/
* MemberPress (paid) — https://memberpress.com/

Choose one download plugin:

* Download Monitor (free) — https://wordpress.org/plugins/download-monitor/
* Easy Digital Downloads (free) — https://wordpress.org/plugins/easy-digital-downloads/

For download files restricted by membership level with Paid Memberships Pro,
install the official Download Monitor integration add-on. It adds the "Require
Membership" box to each Download Monitor download.

Download Monitor's built-in "Members only" option only requires a logged-in user.
Use the PMPro integration or Download Monitor's Advanced Access Manager extension
when access must depend on a paid level.

With MemberPress, use Rules to protect the Library page and the individual
download pages, and confirm the underlying file URL is not publicly reachable.
The theme reads `MeprUser::is_active()` for its member UI, but it does not enforce
file access itself.

== Members' shelf setup ==

1. Install and activate a supported download plugin.
2. Add downloads with a title, description, and file.
3. Mark the files as members-only / require membership in the plugin.
4. Create the Library page and assign "Members' Shelf".
5. Add the page to the primary menu.

The theme lists up to 24 downloads. Order them with the plugin's menu order or by
publish date. A download category is used as the card label.

The `visualis_download_post_types` filter can add another download post type:

    add_filter( 'visualis_download_post_types', function ( $types ) {
        $types[] = 'my_download';
        return $types;
    } );

== Membership behaviour ==

* Visitors see the shelf and a join/login panel.
* Logged-in members see the member state and account link.
* Administrators always preview the member state.
* With no membership plugin active, any logged-in user is treated as a member.
* The `visualis_is_member` filter can override the state for a custom plugin.

The join URL comes from:

1. Appearance → Customize → Visualis settings → Membership / join URL.
2. Paid Memberships Pro levels page.
3. MemberPress account page.
4. WordPress login screen as a fallback.

== Studio ==

The Studio template is a front-end dashboard, not an editor. Writers see their
drafts, scheduled posts, and published essays with links into WordPress. Writing
and publishing use the normal WordPress editor and capabilities.

Membership and writing capability are separate. A member with the Subscriber role
can read the shelf but cannot publish; assign Contributor or higher to writers.

== Demo content ==

`demo-content.xml` contains four sample essays and the four pages described above.
Import it with Tools → Import → WordPress. After import, set the Reading settings
and assign the page templates if the importer did not keep them.

== Customization ==

* Colours and type presets: `theme.json` and the tokens at the top of `style.css`.
* Hero, membership URL, and footer note: Appearance → Customize → Visualis settings.
* Generated covers appear when a post has no featured image. The colour is chosen
  from the post ID, and the label comes from the first tag.
* Menus: Primary and Footer locations.
* Widgets: one optional Footer widget area.

No build step is required. The theme is plain PHP, CSS, and one small JavaScript
file.

== Accessibility ==

* Skip link, visible focus styles, and keyboard-operable mobile navigation.
* Reduced-motion support for the ticker and hover transitions.
* Semantic headings, labelled search fields, and screen-reader text.
* Colour contrast is carried by ink on paper, with dark text on accent blocks.

== Credits ==

* Archivo Black, Space Grotesk, and Newsreader are served by Google Fonts under
  the SIL Open Font License.
* No icon library or third-party JavaScript framework is bundled.

== Changelog ==

= 1.0.0 =
* Initial release: landing page, essay index, single essay, tags, search, 404,
  members' shelf, studio, Customizer settings, demo content.
