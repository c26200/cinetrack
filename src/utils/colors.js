/**
 * Derive a background color from an IMDB ID string.
 * Returns a muted, dark color for poster fallback backgrounds.
 */
export function colorFromImdbId(imdbID) {
  let hash = 0;
  for (let i = 0; i < imdbID.length; i++) {
    hash = imdbID.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 18%, 10%)`;
}
