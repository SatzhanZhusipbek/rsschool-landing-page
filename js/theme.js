const lightThemeButton = document.querySelector(".theme-light");
const darkThemeButton = document.querySelector(".theme-dark");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

lightThemeButton.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "light");

  localStorage.setItem("theme", "light");
});

darkThemeButton.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");

  localStorage.setItem("theme", "dark");
});