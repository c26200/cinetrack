# CineTrack

A movie watchlist built with React and the OMDB API. Search for a film, add it to the board
and move it through three states: pending, watching and watched.

**[Live demo](https://cinetrack-gold-theta.vercel.app)**

## What it does

- Search movies by title through the OMDB API
- Organise them in a kanban board, a poster grid or a compact list
- Rate each movie from one to five stars and add a short note
- Persist the whole board in `localStorage`

## Setup

CineTrack uses your own OMDB API key. Get a free one at [omdbapi.com](https://www.omdbapi.com/apikey.aspx)
and enter it in the setup screen the first time you open the app. It is stored in
`localStorage` and never sent anywhere except OMDB.

```bash
npm install
npm run dev
```

## Structure

```
src/
├── api/omdb.js                # Search and detail requests
├── components/
│   ├── ApiKeySetup.jsx        # First-run key screen
│   ├── MovieBoard.jsx         # State shared by the three views
│   ├── KanbanView.jsx
│   ├── GridView.jsx
│   ├── ListView.jsx
│   ├── MovieModal.jsx         # Details, rating and notes
│   └── OmdbSearch.jsx
├── App.jsx
└── index.css
```

## Notes

There is no backend: the watchlist lives in the browser, so clearing site data erases it.
The free OMDB tier returns 10 results per query, and the app does not paginate.
