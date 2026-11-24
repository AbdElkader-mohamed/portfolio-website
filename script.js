// Progressive enhancement: content is visible by default. Animations only
// apply once this script marks the document as JS-enabled.
document.documentElement.classList.add('js');

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Reveal sections on scroll. A safety timer guarantees nothing stays hidden
// even if IntersectionObserver is unavailable or misfires.
const revealTargets = document.querySelectorAll(
  '.section, .skill-card, .project-card, .job, .education'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const showAll = () => revealTargets.forEach((el) => el.classList.add('visible'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 120px 0px' }
  );
  revealTargets.forEach((el) => observer.observe(el));
  setTimeout(showAll, 2500);
} else {
  showAll();
}
