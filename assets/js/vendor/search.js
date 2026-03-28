(() => {
  const SNIPPET_LENGTH = 160;

  // Fuse.js v7 options — ignoreLocation is critical for long article content
  const FUSE_OPTIONS = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.3,
    minMatchCharLength: 2,
    keys: [
      { name: 'title',      weight: 0.8 },
      { name: 'contents',   weight: 0.4 },
      { name: 'tags',       weight: 0.3 },
      { name: 'categories', weight: 0.2 }
    ]
  };

  let fuseIndex = null; // cache built index across searches

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const input = document.getElementById('search-query');
    if (!input) return;

    // Run immediately if query param present
    const query = getParam('s');
    if (query) {
      input.value = query;
      runSearch(query);
    }

    // Live search as user types (debounced 200 ms)
    let timer;
    input.addEventListener('input', (e) => {
      clearTimeout(timer);
      const q = e.target.value.trim();
      if (!q) { clearResults(); return; }
      timer = setTimeout(() => runSearch(q), 200);
    });
  }

  async function runSearch(query) {
    const container = document.getElementById('search-results');
    if (!container) return;

    showSpinner(container);

    try {
      if (!fuseIndex) {
        const resp = await fetch(indexURL);
        if (!resp.ok) throw new Error('Failed to load search index');
        const pages = await resp.json();
        fuseIndex = new Fuse(pages, FUSE_OPTIONS);
      }

      const results = fuseIndex.search(query);
      renderResults(container, results, query);
    } catch (err) {
      container.innerHTML = '<div class="alert alert-danger">Search unavailable. Please try again later.</div>';
      console.error('Search error:', err);
    }
  }

  function renderResults(container, results, query) {
    if (!results.length) {
      container.innerHTML =
        '<div class="text-center py-5">' +
        '<p class="fs-5 text-muted">No results found for <strong>' + escapeHtml(query) + '</strong></p>' +
        '</div>';
      return;
    }

    const countBadge =
      '<p class="text-muted mb-3">' + results.length +
      ' result' + (results.length !== 1 ? 's' : '') +
      ' for <strong>' + escapeHtml(query) + '</strong></p>';

    const cards = results.map(function(r) {
      const item = r.item;
      const matches = r.matches;
      const snippet = buildSnippet(item.contents, matches);
      const tagBadges = buildBadges(item.tags, 'secondary');
      const catBadges = buildBadges(item.categories, 'primary');
      const badges = catBadges || tagBadges ? '<div class="mb-2">' + catBadges + tagBadges + '</div>' : '';

      return '<article class="card mb-3 border-0 border-bottom rounded-0 pb-3">' +
        '<div class="card-body px-0">' +
        '<h5 class="card-title mb-1">' +
        '<a href="' + escapeHtml(item.permalink) + '" class="text-decoration-none stretched-link">' +
        escapeHtml(item.title) + '</a></h5>' +
        badges +
        '<p class="card-text text-muted small mb-0">' + snippet + '</p>' +
        '</div></article>';
    }).join('');

    container.innerHTML = countBadge + cards;

    // Highlight search terms in rendered results
    new Mark(container).mark(query, { separateWordSearch: true, accuracy: 'partially' });
  }

  function buildSnippet(contents, matches) {
    if (!contents) return '';

    // Use Fuse match indices to anchor snippet around best hit
    var bestPos = 0;
    if (matches) {
      var contentMatch = matches.find(function(m) { return m.key === 'contents'; });
      if (contentMatch && contentMatch.indices && contentMatch.indices.length) {
        bestPos = contentMatch.indices[0][0];
      }
    }

    var half = Math.floor(SNIPPET_LENGTH / 2);
    var start = Math.max(0, bestPos - half);
    var end = Math.min(contents.length, start + SNIPPET_LENGTH);
    var snippet = contents.substring(start, end);
    if (start > 0) snippet = '\u2026' + snippet;
    if (end < contents.length) snippet += '\u2026';
    return escapeHtml(snippet);
  }

  function buildBadges(items, color) {
    if (!items || !items.length) return '';
    var list = Array.isArray(items) ? items : [items];
    return list.map(function(t) {
      return '<span class="badge text-bg-' + color + ' me-1">' + escapeHtml(String(t)) + '</span>';
    }).join('');
  }

  function showSpinner(container) {
    container.innerHTML =
      '<div class="text-center py-5">' +
      '<div class="spinner-border text-secondary" role="status">' +
      '<span class="visually-hidden">Searching\u2026</span>' +
      '</div></div>';
  }

  function clearResults() {
    var container = document.getElementById('search-results');
    if (container) container.innerHTML = '';
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
