/**
 * Theme toggle, with storage of preference in local storage.
 *
 * NOTE:  The head section includes a script function to set the initial theme based on the
 *        system configured theme. this is included in the head block to avoid FOUC.
 */
(function() {
  var themeToggleDarkIcon = document.getElementById('theme-toggle-dark');
  var themeToggleLightIcon = document.getElementById('theme-toggle-light');

  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage)
    && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden');
  } else {
      themeToggleDarkIcon.classList.remove('hidden');
  }

  var themeToggleBtn = document.getElementById('theme-toggle');

  themeToggleBtn.addEventListener('click', function() {
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
          } else {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
          }
      } else {
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
          } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
          }
      }
  });
})();
