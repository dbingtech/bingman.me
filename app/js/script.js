document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".site-header__toggle");
  const menu = document.getElementById("site-header-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("back-to-top");
  const work = document.getElementById("work");

  if (!backToTop || !work) return;

  const updateVisibility = () => {
    const isPastHero = work.getBoundingClientRect().top <= 0;
    backToTop.classList.toggle("is-visible", isPastHero);
  };

  updateVisibility();
  document.addEventListener("scroll", updateVisibility, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
