'use strict';

// Use a class to organize related functionality
class UIController {
  constructor() {
    // Cache DOM elements once
    this.navigation = document.querySelector('.navigation');
    this.searchWrapper = document.querySelector('.search-wrapper');
    this.searchBox = document.querySelector('.search-box');
    
    this.init();
  }

  init() {
    // Preloader - more efficient
    window.addEventListener('load', () => {
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 100);
      }
    });

    // Navigation - using Intersection Observer instead of scroll event
    const navObserver = new IntersectionObserver(
      ([entry]) => this.navigation?.classList.toggle('nav-bg', !entry.isIntersecting),
      { threshold: [1] }
    );
    navObserver.observe(document.querySelector('header') || document.body);

    // Search - event delegation
    document.addEventListener('click', (e) => {
      if (e.target.id === 'searchOpen') {
        this.searchWrapper?.classList.add('open');
        setTimeout(() => this.searchBox?.focus(), 400);
      } else if (e.target.id === 'searchClose') {
        this.searchWrapper?.classList.remove('open');
      }
    });

    // Tabs - using dataset instead of attr
    this.initTabs();
  }

  initTabs() {
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
      const navTabs = pane.closest('.code-tabs')?.querySelector('.nav-tabs');
      if (navTabs && pane.dataset.title) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `<a class="nav-link" href="#">${pane.dataset.title}</a>`;
        navTabs.appendChild(li);
      }
    });

    // Set initial active states
    document.querySelectorAll('.code-tabs').forEach(tabs => {
      tabs.querySelector('.nav-item')?.classList.add('active');
      tabs.querySelector('.tab-pane')?.classList.add('active');
    });

    // Event delegation for tab clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-tabs .nav-link');
      if (!link) return;

      e.preventDefault();
      const tab = link.parentElement;
      const tabPanel = tab.closest('.code-tabs');
      const tabIndex = Array.from(tabPanel.querySelectorAll('.nav-item')).indexOf(tab);
      
      tabPanel.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      tab.classList.add('active');
      tabPanel.querySelectorAll('.tab-pane')[tabIndex]?.classList.add('active');
    });
  }
}

// For the slider, consider using a modern alternative like Swiper.js
// For filtering, consider using modern solutions like Isotope.js or CSS Grid with filters

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => new UIController());