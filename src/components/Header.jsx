const VIEW_LABEL = { grid: 'WALL', kanban: 'KANBAN', list: 'LIST' };

export default function Header({ view, onViewChange, sortBy, onSortChange, onLocalSearch, total = 0, counts = {} }) {
  const pad = (n) => String(n || 0).padStart(2, '0');

  return (
    <header className="masthead">
      <div className="mast-top">
        <h1 className="wordmark">CINETRACK</h1>
        <div className="mast-meta mono">
          A PERSONAL FILM INDEX<br />
          <b>{pad(total)}</b> TITLES · <b>{pad(counts.pending)}</b> TO WATCH · <b>{pad(counts.watching)}</b> WATCHING
        </div>
      </div>

      <div className="mast-rule" />

      <div className="mast-sub mono">
        <span>SELECTED WORKS / 1972 — 2021</span>
        <span>LOCAL LIBRARY / EXPORT JSON</span>
      </div>

      <div className="toolbar">
        <input
          className="search"
          type="text"
          placeholder="Search my list…"
          onChange={(e) => onLocalSearch(e.target.value)}
        />

        <div className="views">
          {['grid', 'kanban', 'list'].map((v) => (
            <button
              key={v}
              className={view === v ? 'on' : ''}
              onClick={() => onViewChange(v)}
            >
              {VIEW_LABEL[v]}
            </button>
          ))}
        </div>

        <select
          className="sort mono"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="addedAt">DATE ADDED ↓</option>
          <option value="title">TITLE A–Z</option>
          <option value="year">YEAR ↓</option>
          <option value="imdbRating">IMDB RATING ↓</option>
        </select>
      </div>
    </header>
  );
}
