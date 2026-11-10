const STATUS = {
  pending: 'TO WATCH',
  watching: 'WATCHING',
  watched: 'WATCHED',
};

export default function FilmIndex({ movies, onOpenDetail, activeId }) {
  return (
    <aside className="film-index">
      <div className="idx-head mono">
        <span>NO.</span>
        <span>TITLE</span>
        <span>YEAR</span>
        <span>STATUS</span>
      </div>

      {movies.length === 0 ? (
        <div className="idx-empty">No films yet. Search OMDB to start your index.</div>
      ) : (
        movies.map((m, i) => (
          <div
            key={m.imdbID}
            className={'idx-row' + (activeId === m.imdbID ? ' on' : '')}
            onClick={() => onOpenDetail(m)}
          >
            <span className="n mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="t">{m.title}</span>
            <span className="y mono">{m.year}</span>
            <span className="st mono">{STATUS[m.status] || 'TO WATCH'}</span>
          </div>
        ))
      )}
    </aside>
  );
}
