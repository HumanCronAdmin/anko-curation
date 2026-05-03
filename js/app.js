// あんこ日和 — JSON データ駆動 render

async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch failed: ${path}`);
  return r.json();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function currentSeasonKey() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return 'spring';
  if (m >= 6 && m <= 8) return 'summer';
  if (m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}

// ===== Season =====
async function renderSeasons() {
  const grid = document.getElementById('season-grid');
  if (!grid) return;
  try {
    const seasons = await loadJSON('data/seasons.json');
    const order = ['spring', 'summer', 'autumn', 'winter'];
    const current = currentSeasonKey();
    const html = order.map(key => {
      const s = seasons[key];
      const highlight = key === current ? 'style="border-color:var(--azuki);box-shadow:0 4px 16px rgba(107,43,58,0.1)"' : '';
      const items = (s.items || []).map(escapeHtml).join(' · ');
      return `<div class="season-card" ${highlight}>
        <div class="season-emoji">${s.emoji}</div>
        <div class="season-name">${escapeHtml(s.name)}</div>
        <div class="season-items">${items}</div>
      </div>`;
    }).join('');
    grid.innerHTML = html;
  } catch (e) { console.error(e); grid.innerHTML = ''; }
}

// ===== Mood =====
async function renderMoods() {
  const grid = document.getElementById('mood-grid');
  if (!grid) return;
  try {
    const moods = await loadJSON('data/moods.json');
    grid.innerHTML = moods.map(m => `
      <div class="mood-card" data-mood="${escapeHtml(m.key)}">
        <div class="mood-icon">${m.icon}</div>
        <div class="mood-label">${escapeHtml(m.label)}</div>
        <div class="mood-sub">${escapeHtml(m.sub || '')}</div>
      </div>`).join('');
  } catch (e) { console.error(e); }
}

// ===== Articles (type別 render: products / seo / diary) =====
function renderArticleSection(grid, articles, type, emptyMsg) {
  const filtered = articles.filter(a => (a.type || 'diary') === type);
  if (!filtered.length) {
    grid.innerHTML = `<div class="diary-empty">${emptyMsg}</div>`;
    return;
  }
  const sorted = [...filtered].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  grid.innerHTML = sorted.slice(0, 9).map(a => {
    const img = a.image
      ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy">`
      : (a.emoji || '🍡');
    const subdir = a.type || 'diary';
    return `<a href="articles/${escapeHtml(subdir)}/${escapeHtml(a.stem)}.html" class="diary-card">
      <div class="diary-img">${img}</div>
      <div class="diary-body">
        <div class="diary-date">${escapeHtml(a.date || '')}</div>
        <div class="diary-title">${escapeHtml(a.title)}</div>
        <div class="diary-excerpt">${escapeHtml(a.excerpt || '')}</div>
      </div>
    </a>`;
  }).join('');
}

async function renderDiary() {
  try {
    const raw = await loadJSON('data/articles.json');
    const articles = Array.isArray(raw) ? raw : (raw.articles || []);
    const productsGrid = document.getElementById('products-grid');
    const seoGrid = document.getElementById('seo-grid');
    const diaryGrid = document.getElementById('diary-grid');
    if (productsGrid) renderArticleSection(productsGrid, articles, 'products', '商品紹介 準備中');
    if (seoGrid) renderArticleSection(seoGrid, articles, 'seo', '読みもの 準備中');
    if (diaryGrid) renderArticleSection(diaryGrid, articles, 'diary', '最初の偏愛日記を 準備中');
  } catch (e) {
    console.error(e);
    ['products-grid','seo-grid','diary-grid'].forEach(id => {
      const g = document.getElementById(id);
      if (g) g.innerHTML = `<div class="diary-empty">記事 読み込み エラー</div>`;
    });
  }
}

// ===== Dictionary =====
async function renderDictionary() {
  const grid = document.getElementById('dict-grid');
  if (!grid) return;
  try {
    const dict = await loadJSON('data/dictionary.json');
    grid.innerHTML = dict.map(d => `
      <div class="dict-card">
        <div class="dict-term">${escapeHtml(d.term)}</div>
        <div class="dict-reading">${escapeHtml(d.reading)}</div>
        <div class="dict-desc">${escapeHtml(d.desc)}</div>
      </div>`).join('');
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  renderSeasons();
  renderMoods();
  renderDiary();
  renderDictionary();
});
