document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  root.classList.add(saved || (prefersDark ? 'dark' : 'light'));

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.classList.contains('dark') ? 'light' : 'dark';
      root.classList.remove('light', 'dark');
      root.classList.add(next);
      localStorage.setItem('theme', next);
    });
  }
});
