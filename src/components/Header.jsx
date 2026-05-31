export default function Header({ view, onViewChange, sortBy, onSortChange, onLocalSearch }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 0 20px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '24px',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-display)',
          fontSize: '1.55rem',
          fontWeight: 600,
          color: 'var(--gold)',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, var(--gold) 0%, #8B6914 100%)',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
          }}
        >
          🎬
        </span>
        CineTrack
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Local Search */}
        <div style={{ position: 'relative' }}>
          <svg
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Filtrar mi lista…"
            onChange={(e) => onLocalSearch(e.target.value)}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '8px 12px 8px 34px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              width: '210px',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold-dim)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        {/* View Toggle */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          {['kanban', 'grid', 'list'].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              style={{
                background: view === v ? 'var(--bg-elevated)' : 'none',
                border: 'none',
                color: view === v ? 'var(--gold)' : 'var(--text-muted)',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 500,
                textTransform: 'capitalize',
                transition: 'all 0.2s',
                boxShadow: view === v ? 'inset 0 1px 0 rgba(212,168,83,0.15)' : 'none',
              }}
            >
              {v === 'kanban' ? 'Kanban' : v === 'grid' ? 'Grid' : 'Lista'}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          <option value="addedAt">Fecha agregada ↓</option>
          <option value="title">Título A–Z</option>
          <option value="year">Año ↓</option>
          <option value="imdbRating">Rating IMDB ↓</option>
        </select>
      </div>
    </header>
  );
}
