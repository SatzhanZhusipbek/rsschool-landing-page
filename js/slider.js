const coffeeCards = document.querySelectorAll(".coffee-slider .coffee-card");

const nextButton = document.querySelector(".slider-next");
const previousButton = document.querySelector(".slider-prev");

const indicators = document.querySelectorAll(".slider-indicators .indicator");

let currentIndex = 0;

function changeSlide(direction) {
  coffeeCards[currentIndex].classList.add("coffee-card-hidden");
  indicators[currentIndex].classList.remove("active");

  currentIndex =
    (currentIndex + direction + coffeeCards.length) % coffeeCards.length;

  coffeeCards[currentIndex].classList.remove("coffee-card-hidden");
  indicators[currentIndex].classList.add("active");
}

nextButton.addEventListener("click", function () {
  changeSlide(1);
});

previousButton.addEventListener("click", function () {
  changeSlide(-1);
});