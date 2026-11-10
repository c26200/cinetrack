import MovieCard from './MovieCard';

const COLUMNS = [
  { status: 'pending', title: 'TO WATCH' },
  { status: 'watching', title: 'WATCHING' },
  { status: 'watched', title: 'WATCHED' },
];

export default function KanbanView({ movies, onStatusChange, onOpenDetail, onRemove, onDrop }) {
  return (
    <div className="columns">
      {COLUMNS.map(({ status, title }) => {
        const list = movies.filter((m) => m.status === status);

        return (
          <div
            key={status}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const imdbID = e.dataTransfer.getData('text/plain');
              if (imdbID) onDrop(imdbID, status);
            }}
          >
            <div className="column-head">
              <h3 className="mono">{title}</h3>
              <span className="mono">{String(list.length).padStart(2, '0')}</span>
            </div>

            {list.length === 0 ? (
              <div className="column-empty">Drop films here</div>
            ) : (
              list.map((m) => (
                <div
                  key={m.imdbID}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', m.imdbID)}
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
