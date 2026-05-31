# CineTrack — Registro completo de sesión

> Fecha: 2026-05-30 al 2026-05-31
> Repositorio: [github.com/c26200/cinetrack](https://github.com/c26200/cinetrack)
> Deploy: Vercel (auto-deploy desde `master`)

---

## 1. Especificación inicial

Punto de partida: `c:\Users\Administrator\Documents\Proyectos\cinetrack-spec.md`

App web para gestionar watchlist de películas con:
- 3 estados: pendiente → viendo → vista (cíclico)
- 3 vistas: Kanban (drag & drop), Grid (hover overlay), Lista (tabla)
- API OMDB para búsqueda y pósters
- React + Vite + localStorage + CSS puro

---

## 2. Exploración de diseño (3 variantes)

Creadas en `cinetrack-designs/` como HTML estático:

### V1 · Cinema Dark (ELEGIDA)
- Tema: sala de cine, terciopelo, butacas
- Paleta: `#0D0C0C` fondo, `#D4A853` dorado, `#161514` superficie
- Tipografía: Playfair Display (display) + Inter (body) + JetBrains Mono (datos)
- Vista principal: Kanban 3 columnas
- Archivo: `CineTrack Design v1 - Cinema Dark.html`

### V2 · Editorial Light
- Tema: revista de cine, catálogo curado
- Paleta: `#FAF9F6` fondo, `#C44536` acento
- Tipografía: DM Serif Display + DM Sans
- Vista principal: Lista / tabla

### V3 · Neon Stream
- Tema: streaming moderno, nebula aesthetic
- Paleta: `#08080E` fondo, `#7C3AED` púrpura + `#06B6D4` cyan
- Tipografía: Space Grotesk
- Vista principal: Grid de pósters con hover overlay

---

## 3. Imágenes de pósters

API de imágenes OMDB:
```
https://img.omdbapi.com/?apikey=ec83d8bc&i=<imdbID>&h=<altura>
```

| Parámetro | Uso |
|-----------|-----|
| `h=200` | Thumbnails (tabla 44×62px) |
| `h=400` | Cards medianas (kanban) |
| `h=500` | Grid grande |

Fallback: si la imagen no carga → color derivado del imdbID + iniciales del título.

---

## 4. Implementación (React + Vite)

### Stack
- Vite 8 + React 18
- CSS puro con variables Cinema Dark
- `useReducer` + `localStorage` para estado global
- OMDB API (search + detail + images)

### Estructura del proyecto
```
cinetrack/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx                  # Entry point
    ├── index.css                 # Design system (variables CSS)
    ├── App.jsx                   # Root component
    ├── api/
    │   └── omdb.js               # searchMovies(), getMovieDetail(), posterUrl()
    ├── store/
    │   └── useMovieStore.js      # useReducer + localStorage + API_KEY
    ├── utils/
    │   └── colors.js             # imdbID → color HSL para fallback
    └── components/
        ├── PosterImage.jsx       # <img> con fallback automático
        ├── Header.jsx            # Logo + toolbar (búsqueda local, vista, orden)
        ├── FilterTabs.jsx        # Todas / Por Ver / Viendo / Vistas
        ├── OmdbSearch.jsx        # Búsqueda OMDB con debounce 400ms + dropdown
        ├── MovieBoard.jsx        # Router de vistas (kanban | grid | list)
        ├── KanbanView.jsx        # 3 columnas con drag & drop nativo
        ├── GridView.jsx          # Grid responsive (minmax 170px)
        ├── ListView.jsx          # Tabla con badges de estado + acciones
        ├── MovieCard.jsx         # Card para kanban (póster 2:3 + info + acciones)
        ├── GridCard.jsx          # Card para grid (hover overlay con gradiente)
        ├── MovieModal.jsx        # Portal: detalle completo + rating + notas
        └── StarRating.jsx        # 5 estrellas interactivas
```

### Estado global (useReducer)

```js
// Estado
{
  movies: [],           // Array de películas
  filter: 'all',        // 'all' | 'pending' | 'watching' | 'watched'
  sortBy: 'addedAt',    // 'addedAt' | 'title' | 'year' | 'imdbRating'
  view: 'kanban',       // 'kanban' | 'grid' | 'list'
}

// Acciones: LOAD | ADD | REMOVE | STATUS | RATE | NOTE | FILTER | SORT | VIEW | IMPORT

// Persistencia: localStorage clave 'cinetrack-movies'
// API Key: hardcodeada 'ec83d8bc' en useMovieStore.js
```

### Funcionalidades implementadas
- ✅ Búsqueda OMDB con debounce 400ms
- ✅ Dropdown de resultados (máx 6) con póster
- ✅ Agregar película con todos los metadatos
- ✅ Kanban 3 columnas con drag & drop nativo (`draggable` + `onDragOver`/`onDrop`)
- ✅ Grid responsive con hover overlay
- ✅ Lista tabla con badges de estado + ordenamiento
- ✅ Filtros por estado + búsqueda local en tiempo real
- ✅ Ordenamiento por fecha/título/año/rating
- ✅ Modal detalle con rating editable (1-5 estrellas) + notas (autosave 500ms) + eliminar
- ✅ Status cycling: pending → watching → (pedir rating vía prompt) → watched → pending
- ✅ Fallback de póster: color derivado de imdbID + iniciales
- ✅ Exportar/Importar listas como JSON (para compartir entre dispositivos)

---

## 5. Decisiones clave

| Decisión | Qué se eligió | Por qué |
|----------|--------------|---------|
| Build tool | Vite | Más rápido que CRA, zero-config con Vercel |
| Estado | useReducer + localStorage | Sin dependencias externas, persiste en el navegador |
| Drag & drop | API nativa HTML5 | Sin librerías (especificado en el spec) |
| Modal | createPortal a document.body | Evita problemas de z-index y overflow |
| API key | Hardcodeada en código | El usuario lo pidió explícitamente, es una app abierta |
| CSS | Variables CSS en :root | Consistencia de diseño sin librerías |
| Posters | OMDB Image API con `h=` | Reduce tamaño de descarga (de ~500KB a ~30KB) |

---

## 6. URLs importantes

| Recurso | URL |
|---------|-----|
| Repo GitHub | https://github.com/c26200/cinetrack |
| OMDB API | https://www.omdbapi.com/ |
| OMDB Images | https://img.omdbapi.com/ |
| API Key (gratis) | https://www.omdbapi.com/apikey.aspx |
| Vercel Dashboard | https://vercel.com/dashboard |

---

## 7. Comandos útiles

```powershell
# Desarrollo local
cd C:\Users\Administrator\Documents\Proyectos\cinetrack
npm run dev              # Inicia en http://localhost:5173

# Build de producción
npm run build            # Output en dist/

# Deploy
git add -A
git commit -m "mensaje"
git push                 # Vercel hace auto-deploy desde master
```

---

## 8. Archivos relacionados

| Archivo | Descripción |
|---------|-------------|
| `cinetrack-spec.md` | Especificación original del proyecto |
| `cinetrack-designs/CineTrack Design v1 - Cinema Dark.html` | Mockup estático del diseño elegido |
| `cinetrack-designs/CineTrack Design v2 - Editorial Light.html` | Diseño alternativo (claro) |
| `cinetrack-designs/CineTrack Design v3 - Neon Stream.html` | Diseño alternativo (neón) |

---

## 9. Problemas resueltos en la sesión

1. **Posters enormes**: OMDB retorna imágenes a resolución completa → se agregó `&h=400` para limitar tamaño
2. **API key pedida a cada usuario**: se hardcodeó `ec83d8bc` directamente en el store
3. **Variables de entorno en Vercel**: no aceptaba el nombre `VITE_OMDB_API_KEY` → se simplificó eliminando todo el sistema de env vars
4. **Datos no compartibles entre dispositivos**: se agregaron botones Exportar/Importar (JSON)
5. **Whitespace en edits**: las tabs del HTML causaban fallos con el Edit tool → se usó PowerShell para reemplazos masivos
