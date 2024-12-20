// Get theme from localStorage, system preference, or Hugo's default
const getTheme = () => {
  // First check localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    console.log('Using saved theme:', savedTheme);
    return savedTheme;
  }
  
  // Then check if Hugo set an initial theme attribute
  const hugoTheme = document.documentElement.getAttribute('data-theme');
  if (hugoTheme) {
    console.log('Using Hugo theme:', hugoTheme);
    return hugoTheme;
  }
  
  // Finally fall back to system preference
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  console.log('Using system theme:', systemTheme);
  return systemTheme;
};

// Update icon based on current theme
const updateIcon = () => {
  const button = document.querySelector('#theme-toggle');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  if (button) {
    // Remove existing icon
    button.innerHTML = '';
    
    // Create new icon element
    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    
    // Add new icon to button
    button.appendChild(icon);
  }
};

// Toggle theme
window.toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  console.log('Switching theme:', currentTheme, '→', newTheme);
  
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  updateIcon();
};

// Set initial theme immediately (before DOMContentLoaded)
(function() {
  const initialTheme = getTheme();
  console.log('Setting immediate initial theme:', initialTheme);
  document.documentElement.setAttribute('data-theme', initialTheme);
})();

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = getTheme();
  console.log('DOMContentLoaded theme:', currentTheme);
  
  // Ensure theme is still set correctly
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateIcon();
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}); 