/**
 * Smoothly scrolls to the top of the page
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Checks if the user has scrolled past a certain threshold
 * @param threshold - Scroll position threshold in pixels
 * @returns true if scrolled past threshold
 */
export function hasScrolledPast(threshold: number): boolean {
  return window.scrollY > threshold;
}
