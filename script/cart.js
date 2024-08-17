// Load cart items from localStorage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart_items");
    let subtotal = 0;
    let total = 0;
    let cartHTML = '';

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        cartHTML += `
        <div class="row mb-4">
            <div class="col-md-3">
                <img src="${item.image}" class="img-fluid" alt="${item.title}">
            </div>
            <div class="col-md-3">
                <h5>${item.title}</h5>
                <p>$${item.price}</p>
            </div>
            <div class="col-md-3">
                <input type="number" value="${item.quantity}" min="1" class="form-control quantity-input" data-index="${index}">
            </div>
            <div class="col-md-3">
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
            </div>
        </div>`;
    });

    total = subtotal; // Add any additional calculations if needed

    cartItemsContainer.innerHTML = cartHTML;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// Function to update cart in localStorage and reload the cart
function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantityInputs = document.querySelectorAll(".quantity-input");

    quantityInputs.forEach((input) => {
        let index = input.getAttribute("data-index");
        cart[index].quantity = parseInt(input.value);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// Event listeners
document.getElementById("cart_items").addEventListener("change", function(e) {
    if (e.target.classList.contains("quantity-input")) {
        updateCart();
    }
});

document.getElementById("cart_items").addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-item")) {
        let index = e.target.getAttribute("data-index");
        removeItem(index);
    }
});

document.getElementById("clear_cart").addEventListener("click", clearCart);

// Load cart items when the page loads
loadCart();
