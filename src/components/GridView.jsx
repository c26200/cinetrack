import GridCard from './GridCard';

export default function GridView({ movies, onOpenDetail }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <b>Nothing in this list.</b>
        <span>Search OMDB and add your first film.</span>
      </div>
    );
  }

  return (
    <div className="wall">
      {movies.map((m, i) => (
        <GridCard key={m.imdbID} movie={m} index={i + 1} onOpenDetail={onOpenDetail} />
      ))}
    </div>
  );
}
