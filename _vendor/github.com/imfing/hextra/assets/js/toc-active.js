// TOC Active Link Highlighter
// Uses Intersection Observer to track which heading is in view and highlights the corresponding TOC link

document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = Array.from(document.querySelectorAll('.hextra-toc a'));

  if (tocLinks.length === 0) return; // No TOC, exit

  // Helper to clear active state
  function clearActive() {
    tocLinks.forEach(link => {
      link.removeAttribute('data-active');
      if (link.parentElement) link.parentElement.classList.remove('active');
    });
  }

  function setActiveLink(link) {
    if (!link) return;
    clearActive();
    link.setAttribute('data-active', 'true');
    if (link.parentElement) link.parentElement.classList.add('active');
  }

  // Click handler: set active immediately when user clicks a TOC link
  tocLinks.forEach(link => {
    link.addEventListener('click', function () {
      setActiveLink(link);
    });
  });

  // Handle hashchange (e.g., programmatic navigation) to update active link
  function updateFromHash() {
    const hash = window.location.hash;
    if (!hash) return;
    const targetLink = document.querySelector(`.hextra-toc a[href="${hash}"]`);
    if (targetLink) setActiveLink(targetLink);
  }

  window.addEventListener('hashchange', updateFromHash, false);

  // If page loads with a hash, reflect it
  if (window.location.hash) {
    setTimeout(updateFromHash, 50);
  }

  // Create intersection observer to track which heading is in view
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      const id = entry.target.id;
      const tocLink = document.querySelector(`.hextra-toc a[href="#${id}"]`);

      if (tocLink) {
        if (entry.isIntersecting) {
          setActiveLink(tocLink);
        }
      }
    });
  }, observerOptions);

  // Observe headings that are referenced by the TOC
  const observed = new Set();
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.slice(1);
    if (!id) return;
    const heading = document.getElementById(id);
    if (heading && !observed.has(id)) {
      observer.observe(heading);
      observed.add(id);
    }
  });
});
