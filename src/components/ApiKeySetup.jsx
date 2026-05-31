import { useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '24px',
  },
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '16px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    color: 'var(--gold)',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: '28px',
    lineHeight: 1.5,
  },
  input: {
    width: '100%',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.95rem',
    marginBottom: '12px',
    fontFamily: 'var(--font-mono)',
  },
  hint: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginBottom: '20px',
    lineHeight: 1.5,
  },
  hintLink: {
    color: 'var(--gold-dim)',
    textDecoration: 'underline',
  },
  button: {
    width: '100%',
    background: 'var(--gold)',
    color: '#0D0C0C',
    border: 'none',
    padding: '12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },
  error: {
    color: 'var(--red-remove)',
    fontSize: '0.8rem',
    marginTop: '8px',
  },
};

export default function ApiKeySetup({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) {
      setError('Ingresá tu API key de OMDB');
      return;
    }
    if (trimmed.length < 6) {
      setError('La key parece inválida (demasiado corta)');
      return;
    }
    onSave(trimmed);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.icon}>🎬</div>
        <h1 style={styles.title}>CineTrack</h1>
        <p style={styles.subtitle}>
          Para empezar a usar CineTrack, necesitás una API key gratuita de OMDB.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Pegá tu API key aquí…"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError('');
            }}
            autoFocus
          />
          <p style={styles.hint}>
            Conseguila gratis en{' '}
            <a
              href="https://www.omdbapi.com/apikey.aspx"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.hintLink}
            >
              omdbapi.com/apikey
            </a>
            {' '}(1,000 requests/día)
          </p>
          <button type="submit" style={styles.button}>
            Guardar y empezar
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
