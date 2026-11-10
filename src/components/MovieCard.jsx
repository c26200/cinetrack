import PosterImage from './PosterImage';
import StarRating from './StarRating';

const NEXT_ICON = { watched: '↺', watching: '✓', pending: '▶' };

export default function MovieCard({ movie, onStatusChange, onOpenDetail }) {
  return (
    <div className="row-card" onClick={() => onOpenDetail(movie)}>
      <PosterImage
        poster={movie.poster}
        imdbID={movie.imdbID}
        title={movie.title}
        style={{ width: 46, height: 66, flex: 'none' }}
      />

      <div style={{ minWidth: 0 }}>
        <div className="t">{movie.title}</div>
        <div className="y">
          {movie.year} · {movie.director || movie.genre || '—'}
        </div>
        {movie.status === 'watched' && (
          <div style={{ marginTop: 4 }}>
            <StarRating value={movie.userRating || 0} readonly />
          </div>
        )}
      </div>

      <button
        className="act"
        title="Change status"
        onClick={(e) => {
          e.stopPropagation();
          onStatusChange(movie);
        }}
      >
        {NEXT_ICON[movie.status] || '▶'}
      </button>
    </div>
  );
}
