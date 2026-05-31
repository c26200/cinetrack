export default function FilterTabs({ filter, onChange, counts }) {
  const tabs = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: 'Por Ver' },
    { key: 'watching', label: 'Viendo' },
    { key: 'watched', label: 'Vistas' },
  ];

  return (
    <nav
      style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '24px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            background: 'none',
            border: 'none',
            color: filter === t.key ? 'var(--gold)' : 'var(--text-muted)',
            padding: '10px 18px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            position: 'relative',
            transition: 'color 0.2s',
          }}
        >
          {t.label}
          <span
            style={{
              fontSize: '0.7rem',
              opacity: 0.7,
              marginLeft: '4px',
              color: filter === t.key ? 'var(--gold-dim)' : 'var(--text-muted)',
            }}
          >
            {counts[t.key]}
          </span>
          {filter === t.key && (
            <span
              style={{
                position: 'absolute',
                bottom: '-1px',
                left: '18px',
                right: '18px',
                height: '2px',
                background: 'var(--gold)',
                borderRadius: '1px',
              }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
