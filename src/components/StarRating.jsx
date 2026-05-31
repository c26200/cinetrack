export default function StarRating({ value = 0, onChange, readonly = false }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => !readonly && onChange?.(n)}
          disabled={readonly}
          aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.1rem',
            cursor: readonly ? 'default' : 'pointer',
            color: n <= value ? 'var(--gold)' : 'var(--text-muted)',
            transition: 'color 0.15s',
            padding: '2px',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
