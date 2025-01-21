import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("cart");

  // Generate HTML for each cart item, passing the index to cartItemTemplate
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Attach event listeners to all "X" buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const itemIndex = this.dataset.index; // Get the index from the data-index attribute
      removeItemFromCart(itemIndex);       // Remove the item from the cart
    });
  });
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
        <span data-index="${index}" class="remove-item" style="color: red; cursor: pointer;">X</span>
        <a href="#" class="cart-card__image">
            <img src="${item.product.Image}" alt="${item.product.NameWithoutBrand}" />
        </a>
        <h2 class="card__name">${item.product.NameWithoutBrand}</h2>
        <p class="cart-card__price">$${item.product.FinalPrice}</p>
    </li>`;
}

function removeItemFromCart(itemIndex) {
  const cartItems = getLocalStorage("cart");

  // Remove the item at the specific index
  cartItems.splice(itemIndex, 1);

  // Save the updated cart back to local storage
  setLocalStorage("cart", cartItems);

  // Re-render the cart
  renderCartContents();

  // Update the Cart Total
  showCartTotal();

}

// Initial render of cart contents
renderCartContents();

function showCartTotal() {
  // const cartItems = document.querySelector("#cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  if (!getLocalStorage("cart")) {
    // hide the total
    cartTotal.classList.add(".cart-footer-hide");
  } else {
    // show the total
    cartTotal.classList.remove(".cart-footer-hide");

    let cart = getLocalStorage("cart");

    // Get temp array and convert price to decimal using parseFloat
    let temp = cart.map((item) => parseFloat(item.price));

    // Get total price using reduce method
    let totalPrice = temp.reduce((prev, next) => prev + next, 0);

    cartTotal.textContent = `Total: $${totalPrice}`;
  }
}

showCartTotal();
