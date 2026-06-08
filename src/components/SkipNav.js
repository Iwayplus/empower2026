import React from "react";

/**
 * SkipNav — renders a visually-hidden "Skip to main content" link.
 * Becomes visible on keyboard focus so screen-reader / keyboard-only users
 * can bypass the header without tabbing through every nav item.
 *
 * Usage: render as the VERY FIRST child of the page layout.
 * Requires `.skip-nav` styles in index.css.
 */
const SkipNav = () => (
  <a href="#main-content" className="skip-nav">
    Skip to main content
  </a>
);

export default SkipNav;
