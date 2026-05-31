import { colorFromImdbId } from '../utils/colors';

const posterUrl = (imdbID) =>
  `https://img.omdbapi.com/?apikey=ec83d8bc&i=${imdbID}&h=400`;

export default function PosterImage({ poster, imdbID, title, className = '' }) {
  // If we have a valid poster URL from the API, use it
  const src = poster || posterUrl(imdbID);
  const initials = title
    ? title
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '??';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: colorFromImdbId(imdbID),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt={`${title} poster`}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          if (e.target.nextElementSibling) {
            e.target.nextElementSibling.style.display = 'flex';
          }
        }}
      />
      <span
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 5vw, 2.2rem)',
          fontWeight: 700,
          opacity: 0.5,
          color: '#fff',
          letterSpacing: '-0.02em',
        }}
      >
        {initials}
      </span>
    </div>
  );
}
