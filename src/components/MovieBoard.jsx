import KanbanView from './KanbanView';
import GridView from './GridView';
import ListView from './ListView';

export default function MovieBoard({
  view,
  movies,
  onStatusChange,
  onOpenDetail,
  onRemove,
  onDrop,
}) {
  switch (view) {
    case 'grid':
      return (
        <GridView
          movies={movies}
          onStatusChange={onStatusChange}
          onOpenDetail={onOpenDetail}
        />
      );
    case 'list':
      return (
        <ListView
          movies={movies}
          onStatusChange={onStatusChange}
          onOpenDetail={onOpenDetail}
          onRemove={onRemove}
        />
      );
    case 'kanban':
    default:
      return (
        <KanbanView
          movies={movies}
          onStatusChange={onStatusChange}
          onOpenDetail={onOpenDetail}
          onRemove={onRemove}
          onDrop={onDrop}
        />
      );
  }
}
