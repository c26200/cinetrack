import { useReducer, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'cinetrack-movies';
const APIKEY_KEY = 'cinetrack-apikey';

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

    case 'SET_API_KEY':
      localStorage.setItem(APIKEY_KEY, action.payload);
      return { ...state, apiKey: action.payload };

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
    apiKey: localStorage.getItem(APIKEY_KEY) || '',
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

  const setApiKey = useCallback(
    (key) => dispatch({ type: 'SET_API_KEY', payload: key }),
    []
  );

  return {
    state,
    dispatch,
    filteredMovies,
    setApiKey,
  };
}
