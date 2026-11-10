import PosterImage from './PosterImage';

export default function GridCard({ movie, index, onOpenDetail }) {
  return (
    <div className="wall-card" onClick={() => onOpenDetail(movie)}>
      <div className="wall-frame">
        <PosterImage
          poster={movie.poster}
          imdbID={movie.imdbID}
          title={movie.title}
          style={{ width: '100%', height: '100%' }}
        />
        <span className="wall-num">{String(index).padStart(2, '0')}</span>
      </div>
      <div className="wall-cap">
        <span>{movie.title}</span>
        <span>{movie.year}</span>
      </div>
    </div>
  );
}
