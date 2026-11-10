const TABS = [
  { key: 'all', label: 'ALL' },
  { key: 'pending', label: 'TO WATCH' },
  { key: 'watching', label: 'WATCHING' },
  { key: 'watched', label: 'WATCHED' },
];

export default function FilterTabs({ filter, onChange, counts }) {
  const pad = (n) => String(n || 0).padStart(2, '0');

  return (
    <nav className="tabs">
      {TABS.map((t) => (
        <button
          key={t.key}
          className={filter === t.key ? 'on' : ''}
          onClick={() => onChange(t.key)}
        >
          {t.label}
          <span>{pad(counts[t.key])}</span>
        </button>
      ))}
    </nav>
  );
}
