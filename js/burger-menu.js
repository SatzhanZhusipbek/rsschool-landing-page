const burgerButton = document.querySelector(".burger-button");

const mobileNav = document.querySelector(".mobile-nav");

const mobileNavLinks = mobileNav.querySelectorAll("a");

function closeMenu() {
  mobileNav.classList.remove("is-open");

  burgerButton.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

burgerButton.addEventListener("click", function () {
  mobileNav.classList.toggle("is-open");

  const isOpen = mobileNav.classList.contains("is-open");

  burgerButton.setAttribute("aria-expanded", String(isOpen));

  document.body.classList.toggle("menu-open", isOpen);
});

mobileNavLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    closeMenu();
  });
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    mobileNav.classList.contains("is-open")
  ) {
    closeMenu();
  }
});

const desktopMedia = window.matchMedia("(min-width: 769px)");

desktopMedia.addEventListener("change", function (event) {
  if (event.matches) {
    closeMenu();
  }
});