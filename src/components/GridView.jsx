import GridCard from './GridCard';

export default function GridView({ movies, onStatusChange, onOpenDetail }) {
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
        No hay películas en esta lista. Buscá y agregá tu primera película arriba ↑
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: '20px',
      }}
    >
      {movies.map((m) => (
        <GridCard
          key={m.imdbID}
          movie={m}
          onStatusChange={onStatusChange}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
