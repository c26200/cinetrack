import StarRating from './StarRating';

const cell = (padding) => ({
  padding: `12px ${padding || '16px'}`,
  verticalAlign: 'middle',
  borderBottom: '1px solid var(--border)',
});

const badge = (bg, color) => ({
  display: 'inline-block',
  fontSize: '0.74rem',
  fontWeight: 500,
  padding: '4px 10px',
  borderRadius: '12px',
  background: bg,
  color,
});

const STATUS_BADGES = {
  pending: badge('#2A2720', '#D4A853'),
  watching: badge('#1A2430', '#5A8FBF'),
  watched: badge('#2A2220', '#5A8F5C'),
};

const STATUS_LABELS = {
  pending: 'Por Ver',
  watching: 'Viendo',
  watched: 'Vista',
};

export default function ListView({ movies, onStatusChange, onOpenDetail, onRemove }) {
  if (movies.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          padding: '64px 24px',
          fontStyle: 'italic',
        }}
      >
        No hay películas en esta lista
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={{ ...cell('16px'), width: '60px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}></th>
            <th style={{ ...cell('16px'), textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Título</th>
            <th style={{ ...cell('16px'), textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Año</th>
            <th style={{ ...cell('16px'), textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>IMDB</th>
            <th style={{ ...cell('16px'), textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estado</th>
            <th style={{ ...cell('16px'), textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mi puntuación</th>
            <th style={{ ...cell('16px'), width: '80px' }}></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m, i) => (
            <tr
              key={m.imdbID}
              onClick={() => onOpenDetail(m)}
              style={{
                cursor: 'pointer',
                transition: 'background 0.12s',
                boxShadow: `inset 3px 0 0 0 ${m.status === 'watched' ? 'var(--green-done)' : m.status === 'watching' ? 'var(--blue-active)' : 'var(--text-muted)'}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
            >
              <td style={cell('16px')}>
                <img
                  src={`https://img.omdbapi.com/?apikey=ec83d8bc&i=${m.imdbID}&h=200`}
                  alt=""
                  style={{
                    width: '44px',
                    height: '62px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    display: 'block',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <span
                  style={{
                    display: 'none',
                    width: '44px',
                    height: '62px',
                    borderRadius: '4px',
                    background: '#1E1C1A',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {m.title.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}
                </span>
              </td>
              <td style={cell('16px')}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{m.title}</span>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '1px' }}>{m.director || m.genre || ''}</div>
              </td>
              <td style={cell('16px')}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{m.year}</span>
              </td>
              <td style={cell('16px')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.84rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                  {m.imdbRating || '—'}
                </span>
              </td>
              <td style={cell('16px')}>
                <span style={STATUS_BADGES[m.status] || STATUS_BADGES.pending}>
                  {STATUS_LABELS[m.status] || 'Por Ver'}
                </span>
              </td>
              <td style={cell('16px')}>
                {m.status === 'watched' ? (
                  <StarRating value={m.userRating || 0} readonly />
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>—</span>
                )}
              </td>
              <td style={cell('16px')}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(m);
                    }}
                    title={m.status === 'watched' ? 'Repetir' : m.status === 'watching' ? 'Marcar vista' : 'Marcar viendo'}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: 'var(--gold)',
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                    }}
                  >
                    {m.status === 'watched' ? '↺' : m.status === 'watching' ? '✓' : '▶'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`¿Eliminar «${m.title}»?`)) onRemove(m.imdbID);
                    }}
                    title="Eliminar"
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                    }}
                  >
                    ×
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
