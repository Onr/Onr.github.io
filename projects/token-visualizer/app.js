// Constants and defaults
const DEFAULT_CHARS_PER_PAGE = 1800; // ~300 words @ 6 chars/word
const AVG_CHARS_PER_WORD = 6.0;      // includes space/punct on average
const MAX_GENERATED_CHARS = 200000;  // safety cap for generated text
const PAGE_GROUP_TARGET_MAX_DOTS = 1000;

// DOM elements
const modelSelect = document.getElementById('modelSelect');
const amountInput = document.getElementById('amountInput');
const unitRadios = [...document.querySelectorAll('input[name="unit"]')];
const charsPerPageInput = document.getElementById('charsPerPage');
const calcBtn = document.getElementById('calcBtn');
const contextNote = document.getElementById('contextNote');
const contextBar = document.getElementById('contextBar');
const contextFill = document.getElementById('contextFill');
const modelInfoBox = document.getElementById('modelInfoBox');

const pastedText = document.getElementById('pastedText');
const usePasted = document.getElementById('usePasted');
const pastedStats = document.getElementById('pastedStats');

const outTokens = document.getElementById('outTokens');
const outChars = document.getElementById('outChars');
const outWords = document.getElementById('outWords');
const outPages = document.getElementById('outPages');
const outCharsPerToken = document.getElementById('outCharsPerToken');

const scaleBar = document.getElementById('scaleBar');
const scaleFill = document.getElementById('scaleFill');
const pagesGrid = document.getElementById('pagesGrid');
const groupNote = document.getElementById('groupNote');

const pageLines = document.getElementById('pageLines');
const pageBadge = document.getElementById('pageBadge');

const booksList = document.getElementById('booksList');

const outputText = document.getElementById('outputText');
const textNote = document.getElementById('textNote');

// Default datasets if CSV fails to load (e.g., file:// restrictions)
const DEFAULT_MODELS = [
  { provider: 'OpenAI', model: 'gpt-4o', context_tokens: 128000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'gpt-4.1', context_tokens: 128000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'gpt-3.5-turbo', context_tokens: 16000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'gpt-4o-mini', context_tokens: 128000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'o1-preview', context_tokens: 200000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'o3-mini', context_tokens: 200000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'gpt-5', context_tokens: 200000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'gpt-5.1', context_tokens: 200000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'codex-davinci-002', context_tokens: 8000, chars_per_token: 3.3, tokens_per_char: 0.303, approximation_flag: 'estimated' },
  { provider: 'OpenAI', model: 'codex-cushman-001', context_tokens: 2048, chars_per_token: 3.3, tokens_per_char: 0.303, approximation_flag: 'estimated' },
  { provider: 'Anthropic', model: 'Claude 3.5 Sonnet', context_tokens: 200000, chars_per_token: 3.9, tokens_per_char: 0.256, approximation_flag: 'estimated' },
  { provider: 'Anthropic', model: 'Claude 3 Opus', context_tokens: 200000, chars_per_token: 3.9, tokens_per_char: 0.256, approximation_flag: 'estimated' },
  { provider: 'Anthropic', model: 'Claude 3.5 Haiku', context_tokens: 200000, chars_per_token: 3.9, tokens_per_char: 0.256, approximation_flag: 'estimated' },
  { provider: 'Meta', model: 'Llama-3 70B', context_tokens: 128000, chars_per_token: 3.5, tokens_per_char: 0.285, approximation_flag: 'estimated' },
  { provider: 'Meta', model: 'Llama-3 8B', context_tokens: 128000, chars_per_token: 3.5, tokens_per_char: 0.285, approximation_flag: 'estimated' },
  { provider: 'Meta', model: 'Llama-3.1 405B', context_tokens: 128000, chars_per_token: 3.5, tokens_per_char: 0.285, approximation_flag: 'estimated' },
  { provider: 'Meta', model: 'Llama-Guard 3', context_tokens: 80000, chars_per_token: 3.5, tokens_per_char: 0.285, approximation_flag: 'estimated' },
  { provider: 'Meta', model: 'Llama-Code 3', context_tokens: 80000, chars_per_token: 3.5, tokens_per_char: 0.285, approximation_flag: 'estimated' },
  { provider: 'Mistral', model: 'Mistral Large', context_tokens: 32000, chars_per_token: 3.6, tokens_per_char: 0.277, approximation_flag: 'estimated' },
  { provider: 'Mistral', model: 'Mixtral 8x22B', context_tokens: 64000, chars_per_token: 3.6, tokens_per_char: 0.277, approximation_flag: 'estimated' },
  { provider: 'Google', model: 'Gemini 1.5 Pro', context_tokens: 1000000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'Google', model: 'Gemini 1.5 Flash', context_tokens: 1000000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'Google', model: 'Gemini 2.0 Flash', context_tokens: 1000000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'Google', model: 'Gemini 2.0 Pro', context_tokens: 2000000, chars_per_token: 4.0, tokens_per_char: 0.25, approximation_flag: 'estimated' },
  { provider: 'Google', model: 'Gemini Nano', context_tokens: 128000, chars_per_token: 4.2, tokens_per_char: 0.238, approximation_flag: 'estimated' },
  { provider: 'Google', model: 'Gemini Edge', context_tokens: 128000, chars_per_token: 4.2, tokens_per_char: 0.238, approximation_flag: 'estimated' },
  { provider: 'Alibaba', model: 'Qwen2.5-72B', context_tokens: 128000, chars_per_token: 3.4, tokens_per_char: 0.294, approximation_flag: 'confirmed' },
  { provider: 'Alibaba', model: 'Qwen2.5-32B', context_tokens: 128000, chars_per_token: 3.4, tokens_per_char: 0.294, approximation_flag: 'confirmed' },
  { provider: 'Alibaba', model: 'Qwen2.5-7B', context_tokens: 128000, chars_per_token: 3.4, tokens_per_char: 0.294, approximation_flag: 'confirmed' },
  { provider: 'Alibaba', model: 'Qwen2.5-Coder', context_tokens: 128000, chars_per_token: 3.3, tokens_per_char: 0.303, approximation_flag: 'estimated' },
  { provider: 'Microsoft', model: 'Phi-4', context_tokens: 128000, chars_per_token: 3.7, tokens_per_char: 0.270, approximation_flag: 'estimated' },
  { provider: 'Microsoft', model: 'Phi-4-mini', context_tokens: 128000, chars_per_token: 3.7, tokens_per_char: 0.270, approximation_flag: 'estimated' },
  { provider: 'Microsoft', model: 'Phi-3.5', context_tokens: 128000, chars_per_token: 3.7, tokens_per_char: 0.270, approximation_flag: 'estimated' },
  { provider: 'DeepSeek', model: 'DeepSeek V3', context_tokens: 128000, chars_per_token: 3.5, tokens_per_char: 0.285, approximation_flag: 'estimated' },
  { provider: 'DeepSeek', model: 'DeepSeek Coder V2', context_tokens: 128000, chars_per_token: 3.3, tokens_per_char: 0.303, approximation_flag: 'estimated' },
  { provider: 'StateSpaceResearch', model: 'Mamba-2 2.7B', context_tokens: 65536, chars_per_token: 3.8, tokens_per_char: 0.263, approximation_flag: 'estimated' },
  { provider: 'StateSpaceResearch', model: 'Mamba-2 8.3B', context_tokens: 65536, chars_per_token: 3.8, tokens_per_char: 0.263, approximation_flag: 'estimated' },
  { provider: 'StateSpaceResearch', model: 'Mamba-2 Coder', context_tokens: 65536, chars_per_token: 3.4, tokens_per_char: 0.294, approximation_flag: 'estimated' }
];

const DEFAULT_BOOKS = [
  { title: "Harry Potter and the Sorcerer's Stone", words: 76944 },
  { title: 'Harry Potter and the Chamber of Secrets', words: 85141 },
  { title: 'Harry Potter and the Prisoner of Azkaban', words: 106821 },
  { title: 'Harry Potter and the Goblet of Fire', words: 190637 },
  { title: 'Harry Potter and the Order of the Phoenix', words: 257045 },
  { title: 'Harry Potter and the Half-Blood Prince', words: 168923 },
  { title: 'Harry Potter and the Deathly Hallows', words: 198227 },
  { title: 'The Hobbit', words: 95022 },
  { title: 'The Lord of the Rings (trilogy)', words: 455125 },
  { title: 'Moby-Dick', words: 209117 },
  { title: 'War and Peace', words: 561304 },
  { title: 'The Bible (KJV)', words: 783137 },
  { title: 'Complete Works of Shakespeare', words: 900000 }
];

let MODELS = [];
let BOOKS = [];

// Simple CSV parser (no quoted field complexity needed for our data)
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift().split(',');
  return lines.map(line => {
    const parts = line.split(',');
    const row = {};
    header.forEach((h, i) => row[h.trim()] = (parts[i] || '').trim());
    return row;
  });
}

async function loadCSVOrDefault(path, fallback, transform) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    const rows = parseCSV(text);
    return rows.map(transform);
  } catch (e) {
    console.warn('CSV load failed for', path, e);
    return fallback;
  }
}

function formatNum(n) {
  return n.toLocaleString(undefined);
}

function getSelectedUnit() {
  const r = unitRadios.find(r => r.checked);
  return r ? r.value : 'tokens';
}

function populateModels(models) {
  modelSelect.innerHTML = '';
  for (const m of models) {
    const opt = document.createElement('option');
    opt.value = m.provider + '::' + m.model;
    const flag = (m.approximation_flag || '').toLowerCase();
    const isEstimate = flag === 'estimated';
    const labelModel = `${m.model}${isEstimate ? ' *' : ''}`;
    opt.textContent = `${m.provider} — ${labelModel} (ctx ${formatNum(m.context_tokens)} tok)`;
    if (flag) {
      opt.dataset.approximationFlag = flag;
    }
    modelSelect.appendChild(opt);
  }
}

function getModelByValue(val) {
  const [provider, model] = val.split('::');
  return MODELS.find(m => m.provider === provider && m.model === model);
}

function updateModelInfo(model) {
  if (!modelInfoBox) return;
  if (!model) {
    modelInfoBox.value = '-';
    modelInfoBox.title = '';
    return;
  }
  const charsPerToken = Number(model.chars_per_token);
  const tokensPerChar = Number(model.tokens_per_char || (charsPerToken ? (1 / charsPerToken) : NaN));
  const infoParts = [];
  if (!isNaN(charsPerToken)) {
    infoParts.push(`${charsPerToken.toFixed(2)} chars/token`);
  }
  if (!isNaN(tokensPerChar)) {
    infoParts.push(`${tokensPerChar.toFixed(3)} tok/char`);
  }
  modelInfoBox.value = infoParts.length ? infoParts.join(' • ') : '-';
  const ctx = model.context_tokens ? `Context: ${formatNum(model.context_tokens)} tokens` : '';
  modelInfoBox.title = [model.provider + ' - ' + model.model, ctx].filter(Boolean).join(' | ');
}

function calcAll({ amount, unit, model, charsPerPage }) {
  const cpt = model.chars_per_token || 4.0;
  let tokens, chars;
  if (unit === 'tokens') {
    tokens = Math.max(0, Math.floor(amount));
    chars = Math.max(0, Math.round(tokens * cpt));
  } else {
    chars = Math.max(0, Math.floor(amount));
    tokens = Math.max(0, Math.ceil(chars / cpt));
  }
  const words = Math.round(chars / AVG_CHARS_PER_WORD);
  const pages = Math.max(0, Math.ceil(charsPerPage ? (chars / charsPerPage) : 0));
  return { tokens, chars, words, pages };
}

function setStats({ tokens, chars, words, pages }, charsPerToken) {
  outTokens.textContent = formatNum(tokens);
  outChars.textContent = formatNum(chars);
  outWords.textContent = formatNum(words);
  outPages.textContent = formatNum(pages);
  if (outCharsPerToken) {
    const val = typeof charsPerToken === 'number' && isFinite(charsPerToken) ? charsPerToken : NaN;
    outCharsPerToken.textContent = isNaN(val) ? '-' : val.toFixed(2);
  }
}

function drawScale(pages) {
  if (!scaleFill) return;
  const maxForScale = 10000; // arbitrary scale reference
  const pct = Math.min(100, (pages / maxForScale) * 100);
  scaleFill.style.width = pct + '%';
  scaleFill.title = `${formatNum(pages)} pages`;
}

function drawPages(pages) {
  pagesGrid.innerHTML = '';
  groupNote.hidden = true;

  if (pages <= 0) return;

  if (pages <= 5000) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < pages; i++) {
      const d = document.createElement('div');
      d.className = 'page-dot' + (i % 10 === 0 ? ' strong' : '');
      frag.appendChild(d);
    }
    pagesGrid.appendChild(frag);
    return;
  }

  // Large: group pages into chunks to keep DOM size reasonable
  const groupSize = Math.ceil(pages / PAGE_GROUP_TARGET_MAX_DOTS);
  const groups = Math.ceil(pages / groupSize);
  const frag = document.createDocumentFragment();
  for (let i = 0; i < groups; i++) {
    const d = document.createElement('div');
    d.className = 'page-dot strong';
    d.title = `${formatNum(groupSize)} pages`;
    frag.appendChild(d);
  }
  pagesGrid.appendChild(frag);
  groupNote.hidden = false;
  groupNote.textContent = `Grouped visualization: ${formatNum(groups)} dots × ${formatNum(groupSize)} pages each ≈ ${formatNum(groups * groupSize)} pages.`;
}

function drawSinglePage(chars, charsPerPage, pages) {
  pageLines.innerHTML = '';
  pageBadge.textContent = '';
  if (!charsPerPage || chars <= 0) {
    return;
  }
  const totalLines = 30;
  const remainder = chars % charsPerPage;
  const fullPages = pages; // already ceil; compute more precisely for remainder handling
  // recompute full pages floor to show remainder correctly
  const exactFull = Math.floor(chars / charsPerPage);
  const remChars = chars - exactFull * charsPerPage;
  const fillRatio = (exactFull > 0)
    ? (remChars === 0 ? 1 : (remChars / charsPerPage))
    : Math.min(1, chars / charsPerPage);
  const linesToFill = Math.round(totalLines * fillRatio);

  for (let i = 0; i < totalLines; i++) {
    const line = document.createElement('div');
    line.className = 'page-line' + (i < linesToFill ? ' filled' : '');
    // Vary line widths for a text-like look
    const base = i % 5 === 4 ? 70 : 92; // shorter every 5th line
    const jitter = (i * 17) % 8; // deterministic variation
    const widthPct = Math.max(55, Math.min(98, base - jitter));
    line.style.width = widthPct + '%';
    pageLines.appendChild(line);
  }

  if (exactFull === 0) {
    pageBadge.textContent = `${(fillRatio * 100).toFixed(0)}% of a page`;
  } else if (remChars === 0) {
    pageBadge.textContent = `${formatNum(exactFull)} full page${exactFull === 1 ? '' : 's'}`;
  } else {
    pageBadge.textContent = `${formatNum(exactFull)} full page${exactFull === 1 ? '' : 's'} + ${(fillRatio * 100).toFixed(0)}%`;
  }
}

function compareBooks(words) {
  booksList.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const b of BOOKS) {
    const ratio = b.words > 0 ? (words / b.words) : 0;
    const item = document.createElement('div');
    item.className = 'book-item';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = b.title;
    const r = document.createElement('div');
    r.className = 'ratio';
    r.textContent = `${ratio.toFixed(2)} × this book`;
    item.appendChild(title);
    item.appendChild(r);
    frag.appendChild(item);
  }
  booksList.appendChild(frag);
}

function updatePastedStats(model) {
  const cpt = model?.chars_per_token || 4.0;
  const text = pastedText.value || '';
  const chars = text.length;
  const tokens = Math.ceil(chars / cpt);
  const words = Math.round(chars / AVG_CHARS_PER_WORD);
  if (chars > 0) {
    pastedStats.textContent = `Pasted: ${formatNum(chars)} chars ≈ ${formatNum(tokens)} tokens, ${formatNum(words)} words`;
  } else {
    pastedStats.textContent = '';
  }
}

function makeLorem(targetChars) {
  // Produce deterministic lorem repeated until targetChars, up to cap
  const base = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
               'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
  const cap = Math.min(targetChars, MAX_GENERATED_CHARS);
  let out = '';
  let i = 0;
  while (out.length < cap) {
    out += base + `(${i++}) `;
  }
  return out.slice(0, cap);
}

function updateAll() {
  const model = getModelByValue(modelSelect.value) || MODELS[0];
  updateModelInfo(model);
  const modelCharsPerToken = model?.chars_per_token || 4.0;
  const unit = getSelectedUnit();
  const amount = Number(amountInput.value || 0);
  const charsPerPage = Number(charsPerPageInput.value || DEFAULT_CHARS_PER_PAGE);

  updatePastedStats(model);

  let tokens, chars, words, pages;
  const usingPasted = usePasted.checked && (pastedText.value || '').length > 0;
  if (usingPasted) {
    // Drive calculation directly from pasted text length
    chars = (pastedText.value || '').length;
    tokens = Math.ceil(chars / modelCharsPerToken);
    words = Math.round(chars / AVG_CHARS_PER_WORD);
    pages = Math.max(0, Math.ceil(charsPerPage ? (chars / charsPerPage) : 0));
  } else {
    ({ tokens, chars, words, pages } = calcAll({ amount, unit, model, charsPerPage }));
  }
  setStats({ tokens, chars, words, pages }, modelCharsPerToken);
  drawScale(pages);
  drawPages(pages);
  drawSinglePage(chars, charsPerPage, pages);
  compareBooks(words);

  // Context window note
  const ctx = Number(model.context_tokens || 0);
  const within = tokens <= ctx;
  if (ctx && !within) {
    contextNote.hidden = false;
    contextNote.textContent = `Note: exceeds context window (${formatNum(ctx)} tokens) for ${model.provider} — ${model.model}.`;
    // Context bar shows 100% (overflow)
    drawContextBar(ctx, tokens);
  } else if (ctx) {
    const used = tokens;
    const pct = ctx ? Math.min(100, (used / ctx) * 100) : 0;
    contextNote.hidden = false;
    contextNote.textContent = `Context usage: ${formatNum(used)} / ${formatNum(ctx)} tokens (${pct.toFixed(1)}%).${usingPasted ? ' (from pasted text)' : ''}`;
    drawContextBar(ctx, used);
  } else {
    contextNote.hidden = true;
    contextBar.hidden = true;
  }

  // Generated text (capped)
  if (usingPasted) {
    const full = pastedText.value || '';
    const shown = full.slice(0, MAX_GENERATED_CHARS);
    outputText.value = shown;
    if (full.length > MAX_GENERATED_CHARS) {
      textNote.hidden = false;
      textNote.textContent = `Showing first ${formatNum(MAX_GENERATED_CHARS)} of ${formatNum(full.length)} pasted chars.`;
    } else {
      textNote.hidden = false;
      textNote.textContent = `Showing pasted text (${formatNum(full.length)} chars).`;
    }
  } else {
    const text = makeLorem(chars);
    outputText.value = text;
    if (chars > MAX_GENERATED_CHARS) {
      textNote.hidden = false;
      textNote.textContent = `Generated ${formatNum(text.length)} chars (showing first ${formatNum(MAX_GENERATED_CHARS)} of ${formatNum(chars)}).`;
    } else {
      textNote.hidden = false;
      textNote.textContent = `Generated ${formatNum(text.length)} chars.`;
    }
  }
}

function drawContextBar(ctxTokens, usedTokens) {
  if (!ctxTokens || ctxTokens <= 0) {
    contextBar.hidden = true;
    return;
  }
  contextBar.hidden = false;
  const pctRaw = (usedTokens / ctxTokens) * 100;
  const pct = Math.max(0, Math.min(100, pctRaw));
  contextFill.style.width = pct + '%';
  // Color shift: green <70%, amber 70–100%, red >100%
  if (pctRaw <= 70) {
    contextFill.style.background = 'linear-gradient(90deg,#4caf50,#8bc34a)';
  } else if (pctRaw <= 100) {
    contextFill.style.background = 'linear-gradient(90deg,#ffb300,#ffd54f)';
  } else {
    contextFill.style.background = 'linear-gradient(90deg,#e53935,#ff7961)';
  }
  contextFill.title = `${formatNum(usedTokens)} / ${formatNum(ctxTokens)} tokens (${pctRaw.toFixed(1)}%)`;
}

async function init() {
  charsPerPageInput.value = String(DEFAULT_CHARS_PER_PAGE);

  MODELS = await loadCSVOrDefault('data/models.csv', DEFAULT_MODELS, row => ({
    provider: row.provider,
    model: row.model,
    context_tokens: Number(row.context_tokens || 0),
    chars_per_token: Number(row.chars_per_token || 4.0),
    tokens_per_char: Number(row.tokens_per_char || (1 / 4.0)),
    approximation_flag: row.approximation_flag || ''
  }));

  BOOKS = await loadCSVOrDefault('data/books.csv', DEFAULT_BOOKS, row => ({
    title: row.title,
    words: Number(row.words || 0)
  }));

  populateModels(MODELS);
  // Pick a default model
  if (MODELS.length) {
    modelSelect.value = MODELS[0].provider + '::' + MODELS[0].model;
  }

  // Events
  modelSelect.addEventListener('change', updateAll);
  amountInput.addEventListener('input', updateAll);
  unitRadios.forEach(r => r.addEventListener('change', updateAll));
  charsPerPageInput.addEventListener('input', updateAll);
  pastedText.addEventListener('input', () => {
    const model = getModelByValue(modelSelect.value) || MODELS[0];
    updatePastedStats(model);

    const text = pastedText.value || '';
    if (text.length > 0 && !usePasted.checked) {
      usePasted.checked = true;
    }

    const unit = getSelectedUnit();
    if (unit === 'tokens') {
      const cpt = model.chars_per_token || 4.0;
      amountInput.value = Math.ceil(text.length / cpt);
    } else {
      amountInput.value = text.length;
    }

    updateAll();
  });
  usePasted.addEventListener('change', updateAll);

  updateAll();
}

init();
