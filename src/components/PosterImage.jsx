import { colorFromImdbId } from '../utils/colors';

const posterUrl = (imdbID) => {
  const key = import.meta.env.VITE_OMDB_API_KEY;
  return key ? `https://img.omdbapi.com/?apikey=${key}&i=${imdbID}&h=400` : null;
};

export default function PosterImage({ poster, imdbID, title, className = '', style = {} }) {
  // If we have a valid poster URL from the API, use it
  const src = poster || posterUrl(imdbID) || '';
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
        ...style,
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
