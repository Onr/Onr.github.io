# Token Visualizer — SPEC

## Goal
- Provide a simple website to explore LLM token/character lengths, visualize page-equivalents for scale, and compare lengths to common books.

## Data
- `data/models.csv` — list of models with approximate context window and conversion ratios.
  - Columns: `provider,model,context_tokens,chars_per_token,tokens_per_char`
  - `chars_per_token` is the average characters per token (default ~4.0 for English). `tokens_per_char` is 1 / `chars_per_token` (included for convenience).
- `data/books.csv` — list of books and their word counts (approximate).
  - Columns: `title,words`

Notes
- CSV is used for user-editable data. The UI has a JS fallback dataset if loading CSV is blocked by file-origin restrictions when opening `index.html` directly. Serving with a local web server is recommended.

## UI Requirements
- Pick a model from a dropdown (populated from `models.csv`).
- Choose an input amount and unit: `Tokens` or `Characters`.
- Show computed stats:
  - Tokens, Characters, Approx Words
  - Pages (configurable chars per page)
  - Context window usage (if input <= model context)
- Generate a long text of the requested character length.
  - For very large sizes, generate up to a safe cap and mark the remainder as truncated.
- Visualize “pages” to convey scale.
  - For small/medium counts, render a grid of page dots.
  - For very large counts, group into chunks and label the groups to avoid DOM overload.
- Compare to common books from `books.csv` (approximate multiples).

## Conversions
- Characters from tokens: `chars = tokens * chars_per_token`.
- Tokens from characters: `tokens = ceil(chars / chars_per_token)`.
- Approximate words: `words ≈ chars / avg_chars_per_word` with `avg_chars_per_word = 6.0` (includes spaces/punctuation on average).
- Pages: `pages = ceil(chars / chars_per_page)` with default `chars_per_page = 1800` (≈300 words × 6 chars).

## Visualization Rules
- Up to 5,000 pages: draw one dot per page.
- Above 5,000 pages: auto-select a grouping size to keep ≤ 1,000 dots, each dot labeled like “×100”.
- Additionally show a scale bar that fills proportionally to the number of pages (log-friendly labeling for very large numbers).

## Performance & Safety
- Max generated text: 200,000 characters to avoid browser freezes. If input > cap, generate first N chars and show a notice with the full intended size.
- CSV loading uses `fetch`. If blocked when opened via `file://`, the app uses built-in defaults.

## Extensibility
- Add or edit rows in `data/models.csv` or `data/books.csv`.
- Adjust UI constants in `app.js`: `DEFAULT_CHARS_PER_PAGE`, `AVG_CHARS_PER_WORD`, `MAX_GENERATED_CHARS`.

## How to Run
- Easiest: serve the folder with a simple local server (so CSV `fetch` works):
  - Python: `python -m http.server 8080` from `token-visualizer` and open `http://localhost:8080/`.
  - Node: `npx http-server` (or any equivalent static server).
- Alternatively: open `index.html` directly; if CSV fails to load, defaults are used.

