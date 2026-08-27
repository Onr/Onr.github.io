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

  const article = document.querySelector('article');
  const headings = article ? [...article.querySelectorAll('h2[id]')] : [];
  const chapterList = document.querySelector('.chapter-list');
  const chapterSelect = document.querySelector('.chapter-select');
  const progress = document.querySelector('.reading-progress span');

  headings.forEach((heading) => {
    const label = heading.textContent.trim();

    if (chapterList) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = label;
      link.dataset.section = heading.id;
      item.appendChild(link);
      chapterList.appendChild(item);
    }

    if (chapterSelect) {
      const option = document.createElement('option');
      option.value = heading.id;
      option.textContent = label;
      chapterSelect.appendChild(option);
    }
  });

  const setActiveChapter = (id) => {
    document.querySelectorAll('.chapter-list a').forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (chapterSelect && id) chapterSelect.value = id;
  };

  if (chapterSelect) {
    chapterSelect.addEventListener('change', () => {
      document.getElementById(chapterSelect.value)?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const updatePosition = () => {
    if (!article || headings.length === 0) return;

    let active = headings[0].id;
    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= 150) active = heading.id;
    });
    setActiveChapter(active);

    if (progress) {
      const start = article.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      progress.style.transform = `scaleX(${ratio})`;
    }
  };

  updatePosition();
  window.addEventListener('scroll', updatePosition, { passive: true });
  window.addEventListener('resize', updatePosition);
});
