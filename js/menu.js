const modalOverlay = document.querySelector(".modal-overlay");
const modalImage = document.querySelector(".product-modal-image");
const modalName = document.querySelector("#modal-product-name");
const modalDescription = document.querySelector(
  ".product-modal-description",
);
const modalPrice = document.querySelector(".product-modal-price");

const menuGrid = document.querySelector(".menu-grid");
const loadMoreButton = document.querySelector(".menu-load-more");
const menuTabs = document.querySelectorAll(".menu-tab");

const mobileCatalogMedia = window.matchMedia("(max-width: 768px)");
let showAll = false;

const modalSizeTabs = document.querySelector(".product-modal-size-tabs");

const modalCloseButton = document.querySelector(".product-modal-close");

const modalAdditiveTabs = document.querySelector(
  ".product-modal-additive-tabs",
);

function updateCardsVisibility() {
  const cards = menuGrid.querySelectorAll(".menu-card");

  const isMobile = mobileCatalogMedia.matches;

  cards.forEach(function (card, index) {
    const shouldHide = isMobile && !showAll && index >= 4;

    card.classList.toggle("is-hidden", shouldHide);
  });

  const hasHiddenCards = isMobile && !showAll && cards.length > 4;

  loadMoreButton.classList.toggle("is-visible", hasHiddenCards);
}

function renderProducts(products, category) {
  menuGrid.innerHTML = "";

  products.forEach(function (product, index) {
    menuGrid.insertAdjacentHTML(
      "beforeend",
      `
        <article class="menu-card">
          <img
            src="assets/images/${category}-${index + 1}.png"
            alt="${product.name}"
          />

          <div class="menu-card-description">
            <h2>${product.name}</h2>

            <p>${product.description}</p>

            <p class="menu-card-price">$${product.price}</p>
          </div>
        </article>
      `,
    );
  });

  updateCardsVisibility();

  const cards = menuGrid.querySelectorAll(".menu-card");
  
  cards.forEach(function (card, index) {
    card.addEventListener("click", function () {
      const selectedProduct = products[index];

      openModal(selectedProduct, category, index);
    });
  });
}

function renderSizes(product) {
  modalSizeTabs.innerHTML = "";

  Object.entries(product.sizes).forEach(function ([key, size], index) {
    modalSizeTabs.insertAdjacentHTML(
      "beforeend",
      `
        <button
          class="product-modal-tab ${index === 0 ? "active" : ""}"
          type="button"
          data-add-price="${size["add-price"]}"
        >
          <span class="product-modal-tab-icon">${key.toUpperCase()}</span>
          <span>${size.size}</span>
        </button>
      `,
    );
  });

  const sizeButtons = modalSizeTabs.querySelectorAll(".product-modal-tab");

  sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      sizeButtons.forEach(function (sizeButton) {
        sizeButton.classList.remove("active");
      });

      button.classList.add("active");
      updateTotal(product);
    });
  });
}

function renderAdditives(product) {
  modalAdditiveTabs.innerHTML = "";

  product.additives.forEach(function (additive, index) {
    modalAdditiveTabs.insertAdjacentHTML(
      "beforeend",
      `
        <button
          class="product-modal-tab"
          type="button"
          data-add-price="${additive["add-price"]}"
        >
          <span class="product-modal-tab-icon">${index + 1}</span>
          <span>${additive.name}</span>
        </button>
      `,
    );
  });

  const additiveButtons =
    modalAdditiveTabs.querySelectorAll(".product-modal-tab");

  additiveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.toggle("active");
      updateTotal(product);
    });
  });
}

function updateTotal(product) {
  let total = Number(product.price);

  const activeSize = modalSizeTabs.querySelector(".product-modal-tab.active");

  if (activeSize) {
    total += Number(activeSize.dataset.addPrice);
  }

  const activeAdditives = modalAdditiveTabs.querySelectorAll(
    ".product-modal-tab.active",
  );

  activeAdditives.forEach(function (button) {
    total += Number(button.dataset.addPrice);
  });

  modalPrice.textContent = `$${total.toFixed(2)}`;
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function openModal(product, category, index) {
  modalImage.src = `assets/images/${category}-${index + 1}.png`;

  modalImage.alt = product.name;

  modalName.textContent = product.name;
  modalDescription.textContent = product.description;

  renderSizes(product);
  renderAdditives(product);
  updateTotal(product);

  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

modalCloseButton.addEventListener("click", function () {
  closeModal();
});

modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    modalOverlay.classList.contains("is-open")
  ) {
    closeModal();
  }
});

async function loadProducts() {
  const response = await fetch("./products.json");

  const products = await response.json();

  const coffeeProducts = products.filter(function (product) {
    return product.category === "coffee";
  });

  renderProducts(coffeeProducts, "coffee");

  menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const category = tab.dataset.category;

      const categoryProducts = products.filter(function (product) {
        return product.category === category;
      });

      menuTabs.forEach(function (button) {
        button.classList.remove("active");
      });

      tab.classList.add("active");

      showAll = false;

      renderProducts(categoryProducts, category);
    });
  });
}

loadMoreButton.addEventListener("click", function () {
  showAll = true;

  updateCardsVisibility();
});

mobileCatalogMedia.addEventListener("change", function () {
  showAll = false;

  updateCardsVisibility();
});

loadProducts();