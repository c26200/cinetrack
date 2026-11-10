# CineTrack — Rediseño 2026

## Spec (común a las tres direcciones)

**Qué es.** Watchlist de cine: buscar en OMDB, guardar películas y moverlas entre tres
estados (To watch, Watching, Watched), con rating de 1–5 estrellas y notas. Tres vistas:
kanban, grid y lista. Persistencia en localStorage.

**Audiencia.** Cinéfilos que llevan su lista, y reclutadores que abren el repo dos minutos.

**Mensaje central.** Tu lista de películas, ordenada como una colección, no como una hoja de
cálculo.

**Tono.** Cine, no entretenimiento genérico. Curaduría y memoria.

**Formato.** Pantalla principal a 1440×900.

**Contenido real.** 8 películas: Inception (2010, watching), Interstellar (2014, watching),
The Shawshank Redemption (1994, watched, 5★), The Godfather (1972, watched, 5★), Pulp Fiction
(1994, watched, 4★), Whiplash (2014, to watch), Parasite (2019, to watch), Dune (2021, to
watch). Contadores: 8 / 3 / 2 / 3. Pósters reales de OMDB.

**Restricciones.** Sin emojis, sin gradientes morados, sin sombras flotantes, sin datos
inventados. Cuerpo ≥14 px, etiquetas ≥12 px, contraste ≥4.5:1.

---

## Candidatos

### 1 · Best designer — Experimental Jetset
- **Lógica.** Estudio holandés conceptual: tipografía como sistema, retícula estricta, blanco
  y negro con un solo rojo, el contenido ordenado como índice.
- **Qué se toma.** Numeración de 01 a 08, titulares a gran escala, pósters reducidos a
  estampas, una regla roja como único acento.
- **Esqueleto.** Rail de índice numérico + muro de pósters en escala de grises.
- **Audacia.** El índice tipográfico manda; el póster es secundario.
- **Form.** Una watchlist es una lista ordenada; el índice es la forma honesta.

### 2 · Best designer — Collins
- **Lógica.** Agencia de branding neoyorquina: relato cinematográfico, tipografía enorme,
  contraste dramático, una idea por pantalla.
- **Qué se toma.** Titular de portada, recorte a sangre, negro cálido + rojo, ritmo editorial.
- **Esqueleto.** Portada con una película protagonista y una franja de estantes debajo.
- **Audacia.** Una sola película ocupa media pantalla; la lista es el reverso.
- **Form.** El cine se recuerda por escenas; la app abre con una.

### 3 · Referencia real — Letterboxd
- **Lógica.** La watchlist social de referencia: muro de pósters, densidad alta, acentos
  verde y naranja sobre carbón.
- **Qué se toma.** Retícula de pósters, badges de estado, rating visible, navegación compacta.
- **Esqueleto.** Header + tabs + muro de pósters.
- **Audacia.** Densidad: ver toda la colección de un vistazo.
- **Form.** Una colección se hojea como un muro, no como una tabla.

### 4 · Referencia real — MUBI
- **Lógica.** Cine de autor curado: papel cálido, serif editorial, stills grandes, aire.
- **Qué se toma.** Tipografía serif, mucho blanco, imagen grande, etiquetas en versalitas.
- **Esqueleto.** Portada editorial + estantería horizontal por estado.
- **Audacia.** El silencio: una imagen grande y poco texto.
- **Form.** Una lista de cine de autor se lee como una revista, no como un panel.

### 5 · Ruleta — web #16 Terminal-Core
- **Lógica.** Cursor / Teenage Engineering: carbón, blanco cálido, monoespaciada, cubos
  isométricos, un acento violeta.
- **Qué se toma.** Tipografía mono como protagonista, bloques bento, línea de comandos.
- **Esqueleto.** Consola de proyección: comandos + lista + cubo isométrico.
- **Audacia.** La app como terminal de proyeccionista.
- **Form.** Programar una función es una secuencia de comandos.

### 6 · Ruleta — east #4 Shanghai Moderne Deco
- **Lógica.** Arte decorativo de Shanghái de los años 20–30: verde tinta, oro, bermellón,
  abanicos radiales, torres escalonadas, doble marco.
- **Qué se toma.** Simetría, doble filete dorado, sol radiante, tipografía de cartel.
- **Esqueleto.** Cabecera simétrica con abanico + tres paneles enmarcados + franja bermellón.
- **Audacia.** La pantalla como programa de cine de los años 30.
- **Form.** Cine = sala, marquesina y programa; el Deco es su lenguaje.

---

## Selección para versión completa

1. **Dirección 1 — Palace** (Shanghai Deco). Verde tinta + oro + bermellón, Cinzel, simetría.
2. **Dirección 2 — Cinema Notebook** (MUBI). Papel cálido, Fraunces, stills grandes, aire.
3. **Dirección 3 — Index** (Experimental Jetset). Blanco, negro y rojo, índice numérico,
   pósters en gris.

Descartadas para completa (quedan como miniaturas): Collins, Letterboxd, Terminal-Core.
