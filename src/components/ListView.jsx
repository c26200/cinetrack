import PosterImage from './PosterImage';
import StarRating from './StarRating';

const STATUS = {
  pending: 'TO WATCH',
  watching: 'WATCHING',
  watched: 'WATCHED',
};

const NEXT_ICON = { watched: '↺', watching: '✓', pending: '▶' };

export default function ListView({ movies, onStatusChange, onOpenDetail, onRemove }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <b>Nothing in this list.</b>
      </div>
    );
  }

  return (
    <div className="list-wrap">
      <table className="list-table">
        <thead>
          <tr>
            <th>NO.</th>
            <th></th>
            <th>TITLE</th>
            <th>YEAR</th>
            <th>IMDB</th>
            <th>STATUS</th>
            <th>RATING</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m, i) => (
            <tr key={m.imdbID} onClick={() => onOpenDetail(m)}>
              <td className="num">{String(i + 1).padStart(2, '0')}</td>
              <td className="poster">
                <PosterImage
                  poster={m.poster}
                  imdbID={m.imdbID}
                  title={m.title}
                  style={{ width: 40, height: 58 }}
                />
              </td>
              <td>
                <div className="title">{m.title}</div>
                <div className="sub">{m.director || m.genre || ''}</div>
              </td>
              <td className="mono-cell">{m.year}</td>
              <td className="mono-cell">★ {m.imdbRating || '—'}</td>
              <td className="status mono">{STATUS[m.status] || 'TO WATCH'}</td>
              <td>
                {m.status === 'watched' ? (
                  <StarRating value={m.userRating || 0} readonly />
                ) : (
                  <span className="mono-cell">—</span>
                )}
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button
                  className="icon-btn"
                  title="Change status"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(m);
                  }}
                >
                  {NEXT_ICON[m.status] || '▶'}
                </button>
                <button
                  className="icon-btn"
                  title="Delete"
                  style={{ marginLeft: 6 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete “${m.title}”?`)) onRemove(m.imdbID);
                  }}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
