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

document.addEventListener("DOMContentLoaded", () => {
  const zoomLinks = document.querySelectorAll(".case-zoom");

  if (!zoomLinks.length) return;

  const lightbox = document.createElement("dialog");
  lightbox.className = "case-lightbox";
  lightbox.innerHTML =
    '<button class="case-lightbox__close" type="button" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");

  zoomLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      image.src = link.href;
      image.alt = link.querySelector("img").alt;
      lightbox.showModal();
    });
  });

  lightbox.addEventListener("click", () => lightbox.close());
});
