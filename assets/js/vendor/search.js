// Constants
const SUMMARY_INCLUDE = 60;
const FUSE_OPTIONS = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.0,
  tokenize: true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 0.8 },
    { name: "contents", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "categories", weight: 0.3 }
  ]
};

// Initialize search on page load
document.addEventListener('DOMContentLoaded', () => {
  const searchQuery = getSearchParam('s');
  if (searchQuery) {
    document.getElementById('search-query').value = searchQuery;
    executeSearch(searchQuery);
  }

  // Add event listener for search input
  const searchInput = document.getElementById('search-query');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query) {
        executeSearch(query);
      } else {
        document.getElementById('search-results').innerHTML = '';
      }
    });
  }
});

// Execute search with better error handling
async function executeSearch(searchQuery) {
  try {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    const response = await fetch(indexURL);
    const pages = await response.json();
    const fuse = new Fuse(pages, FUSE_OPTIONS);
    const result = fuse.search(searchQuery);
    
    if (result.length > 0) {
      populateResults(result, searchQuery);
    } else {
      searchResults.innerHTML = `
        <div class="text-center">
          <img loading="lazy" class="img-fluid mb-5" src="https://user-images.githubusercontent.com/17677384/110205559-d77c9580-7ea2-11eb-82b4-f1334db99530.png">
          <h3>No Search Found</h3>
        </div>`;
    }
  } catch (error) {
    console.error('Search failed:', error);
  }
}

function populateResults(results, searchQuery) {
  const searchResults = document.getElementById('search-results');
  const template = document.getElementById('search-result-template');
  
  if (!searchResults || !template) return;
  
  searchResults.innerHTML = ''; // Clear previous results
  const templateContent = template.innerHTML;

  results.forEach((value, key) => {
    const { contents, permalink, title, tags, categories } = value.item;
    let snippet = '';
    const snippetHighlights = [];

    if (FUSE_OPTIONS.tokenize) {
      snippetHighlights.push(searchQuery);
    } else {
      value.matches.forEach(match => {
        if (match.key === 'tags' || match.key === 'categories') {
          snippetHighlights.push(match.value);
        } else if (match.key === 'contents') {
          const [start, end] = match.indices[0];
          const snippetStart = Math.max(0, start - SUMMARY_INCLUDE);
          const snippetEnd = Math.min(contents.length, end + SUMMARY_INCLUDE);
          snippet += contents.substring(snippetStart, snippetEnd);
          snippetHighlights.push(match.value.substring(start, end + 1));
        }
      });
    }

    if (!snippet) {
      snippet = contents.substring(0, SUMMARY_INCLUDE * 2);
    }

    const output = renderTemplate(templateContent, {
      key,
      title,
      link: permalink,
      tags,
      categories,
      snippet
    });

    searchResults.insertAdjacentHTML('beforeend', output);

    // Highlight matches
    const summary = document.getElementById(`summary-${key}`);
    if (summary) {
      snippetHighlights.forEach(highlight => {
        new Mark(summary).mark(highlight);
      });
    }
  });
}

function getSearchParam(name) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name) || '';
}

function renderTemplate(template, data) {
  // Handle conditionals
  const conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  let processedTemplate = template;

  let match;
  while ((match = conditionalPattern.exec(template)) !== null) {
    const [fullMatch, key, content] = match;
    processedTemplate = processedTemplate.replace(
      fullMatch,
      data[key] ? content : ''
    );
  }

  // Handle simple substitutions
  return processedTemplate.replace(/\$\{\s*(\w+)\s*\}/g, (_, key) => data[key] || '');
}
