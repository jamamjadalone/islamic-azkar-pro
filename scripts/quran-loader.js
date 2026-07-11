// quran-loader.js
// Provides functions to render Quranic passages using the offline QURAN data.
// Must be loaded AFTER data/quran.js (which defines window.QURAN).

(function() {
  'use strict';

  // Lazy‑load Surah Al‑Kahf on demand
  let kahfLoaded = false;
  let kahfLoading = false;
  let kahfCallbacks = [];

  function loadKahf(cb) {
    if (kahfLoaded) {
      cb();
      return;
    }
    kahfCallbacks.push(cb);
    if (kahfLoading) return;
    kahfLoading = true;

    const script = document.createElement('script');
    script.src = 'data/quran-kahf.js';
    script.onload = () => {
      kahfLoaded = true;
      kahfLoading = false;
      kahfCallbacks.forEach(fn => fn());
      kahfCallbacks = [];
    };
    script.onerror = () => {
      console.error('Failed to load Surah Al-Kahf');
      kahfLoading = false;
      kahfCallbacks = [];
    };
    document.head.appendChild(script);
  }

  // Render a single verse (key = "2:255")
  window.renderVerse = function(key, element) {
    if (!element) return;
    const html = window.QURAN && window.QURAN[key];
    if (html) {
      element.innerHTML = html;
    } else {
      console.warn('Quran passage not found:', key);
    }
  };

  // Render a range (key = "59:22-24") – stored as a single concatenated HTML
  window.renderRange = function(key, element) {
    return window.renderVerse(key, element);
  };

  // Render a whole surah (key = "1", "94", etc.)
  window.renderSurah = function(key, element) {
    if (!element) return;
    if (key === '18') {
      // Lazy load Al‑Kahf
      loadKahf(() => {
        window.renderVerse('18', element);
      });
      return;
    }
    window.renderVerse(key, element);
  };

  // Automatically decide based on the item object
  window.renderQuranItem = function(item, element) {
    if (!item.isQuran || !element) return;
    let key;
    if (item.verse) {
      key = item.verse;                    // "2:255" or "59:22-24"
      if (key.includes('-')) {
        window.renderRange(key, element);
      } else {
        window.renderVerse(key, element);
      }
    } else if (item.surah) {
      key = String(item.surah);            // "1", "18", "94", etc.
      window.renderSurah(key, element);
    } else {
      // Fallback: try to read key from the element's dataset or just use item.text
      console.warn('Cannot determine Quran key for item', item);
    }
  };
})();