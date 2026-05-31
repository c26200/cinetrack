import { useReducer, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'cinetrack-movies';
const DEFAULT_API_KEY = import.meta.env.VITE_OMDB_API_KEY || '';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore corrupt data */ }
  return [];
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, movies: action.payload };

    case 'IMPORT':
      // Merge imported movies with existing (don't duplicate by imdbID)
      const existingIds = new Set(state.movies.map((m) => m.imdbID));
      const newMovies = action.payload.filter((m) => !existingIds.has(m.imdbID));
      return { ...state, movies: [...newMovies, ...state.movies] };

    case 'ADD': {
      const exists = state.movies.find((m) => m.imdbID === action.payload.imdbID);
      if (exists) return state;
      const movie = {
        ...action.payload,
        status: 'pending',
        userRating: null,
        addedAt: Date.now(),
        watchedAt: null,
        notes: '',
      };
      return { ...state, movies: [movie, ...state.movies] };
    }

    case 'REMOVE':
      return {
        ...state,
        movies: state.movies.filter((m) => m.imdbID !== action.payload),
      };

    case 'STATUS': {
      const { id, status } = action.payload;
      const updates = { status };
      if (status === 'watched') {
        updates.watchedAt = Date.now();
      } else {
        updates.watchedAt = null;
        updates.userRating = null;
      }
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.imdbID === id ? { ...m, ...updates } : m
        ),
      };
    }

    case 'RATE':
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.imdbID === action.payload.id
            ? { ...m, userRating: action.payload.rating }
            : m
        ),
      };

    case 'NOTE':
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.imdbID === action.payload.id
            ? { ...m, notes: action.payload.notes }
            : m
        ),
      };

    case 'FILTER':
      return { ...state, filter: action.payload };

    case 'SORT':
      return { ...state, sortBy: action.payload };

    case 'VIEW':
      return { ...state, view: action.payload };

    default:
      return state;
  }
}

export function useMovieStore() {
  const [state, dispatch] = useReducer(reducer, {
    movies: [],
    filter: 'all',
    sortBy: 'addedAt',
    view: 'kanban',
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved.length > 0) {
      dispatch({ type: 'LOAD', payload: saved });
    }
  }, []);

  // Persist movies to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.movies));
  }, [state.movies]);

  // API key — always use the default shared key
  const apiKey = DEFAULT_API_KEY;

  // Export all movies as a downloadable JSON file
  const exportMovies = useCallback(() => {
    const blob = new Blob([JSON.stringify(state.movies, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinetrack-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state.movies]);

  // Import movies from a JSON file
  const importMovies = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (Array.isArray(data)) {
            dispatch({ type: 'IMPORT', payload: data });
            alert(`✅ ${data.length} películas importadas. (Las duplicadas se omitieron)`);
          } else {
            alert('❌ El archivo no es válido. Debe ser un JSON con un array de películas.');
          }
        } catch {
          alert('❌ No se pudo leer el archivo. Asegurate de que sea un JSON válido.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [dispatch]);

  // Computed: filtered + sorted movies
  const filteredMovies = useMemo(() => {
    let list = state.movies;

    if (state.filter !== 'all') {
      list = list.filter((m) => m.status === state.filter);
    }

    const sorted = [...list];
    switch (state.sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case 'imdbRating':
        sorted.sort((a, b) => {
          const ra = parseFloat(a.imdbRating) || 0;
          const rb = parseFloat(b.imdbRating) || 0;
          return rb - ra;
        });
        break;
      case 'addedAt':
      default:
        sorted.sort((a, b) => b.addedAt - a.addedAt);
        break;
    }
    return sorted;
  }, [state.movies, state.filter, state.sortBy]);

  return {
    state,
    dispatch,
    filteredMovies,
    apiKey,
    exportMovies,
    importMovies,
  };
}
