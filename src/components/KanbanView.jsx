import MovieCard from './MovieCard';

const colStyles = {
  container: {
    background: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minHeight: '400px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border)',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.05rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  count: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    background: 'var(--bg-elevated)',
    padding: '3px 8px',
    borderRadius: '10px',
  },
  empty: {
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    padding: '40px 16px',
    fontStyle: 'italic',
  },
};

export default function KanbanView({ movies, onStatusChange, onOpenDetail, onRemove, onDrop }) {
  const columns = [
    { status: 'pending', title: 'Por Ver', glow: 'rgba(212,168,83,0.06)' },
    { status: 'watching', title: 'Viendo', glow: 'rgba(90,143,191,0.08)' },
    { status: 'watched', title: 'Ya Vista', glow: 'rgba(90,143,92,0.08)' },
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}
    >
      {columns.map(({ status, title, glow }) => {
        const colMovies = movies.filter((m) => m.status === status);
        return (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={(e) => {
              e.preventDefault();
              const imdbID = e.dataTransfer.getData('text/plain');
              if (imdbID) onDrop(imdbID, status);
            }}
            style={{ ...colStyles.container, boxShadow: `0 0 0 1px ${glow}` }}
          >
            <div style={colStyles.header}>
              <span style={colStyles.title}>{title}</span>
              <span style={colStyles.count}>{colMovies.length}</span>
            </div>
            {colMovies.length === 0 ? (
              <div style={colStyles.empty}>
                Arrastrá películas aquí
              </div>
            ) : (
              colMovies.map((m) => (
                <div
                  key={m.imdbID}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', m.imdbID);
                  }}
                >
                  <MovieCard
                    movie={m}
                    onStatusChange={onStatusChange}
                    onOpenDetail={onOpenDetail}
                    onRemove={onRemove}
                  />
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
