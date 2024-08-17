// Function to load cart items and populate the order summary
function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderSummary = document.getElementById('orderSummary');
    let summaryHTML = '';
    let totalAmount = 0;

    cart.forEach((product) => {
        let itemTotal = product.price * product.quantity;
        totalAmount += itemTotal;

        summaryHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <img src="${product.image}" alt="${product.title}" style="width: 50px;">
                    <span>${product.title}</span>
                </div>
                <div>
                    $${product.price} x ${product.quantity} = $${itemTotal.toFixed(2)}
                </div>
            </div>`;
    });

    summaryHTML += `
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <h5>Total</h5>
            <h5>$${totalAmount.toFixed(2)}</h5>
        </div>`;

    orderSummary.innerHTML = summaryHTML;
}

// Function to handle placing the order
function placeOrder() {
    // Gather billing, shipping, and payment information
    let billingInfo = {
        name: document.getElementById('billingName').value,
        address: document.getElementById('billingAddress').value,
        email: document.getElementById('billingEmail').value,
        phone: document.getElementById('billingPhone').value
    };

    let shippingInfo;
    if (document.getElementById('sameAsBilling').checked) {
        shippingInfo = billingInfo;
    } else {
        shippingInfo = {
            name: document.getElementById('shippingName').value,
            address: document.getElementById('shippingAddress').value,
            email: document.getElementById('shippingEmail').value,
            phone: document.getElementById('shippingPhone').value
        };
    }

    let paymentInfo = {
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value
    };

    let orderSummary = {
        items: JSON.parse(localStorage.getItem('cart')) || [],
        totalAmount: document.querySelector('#orderSummary h5:last-child').textContent
    };

    // Here you would typically send the gathered information to the server for processing.
    console.log('Order Placed', { billingInfo, shippingInfo, paymentInfo, orderSummary });

    // Clear cart after placing the order
    localStorage.removeItem('cart');
    alert('Order placed successfully!');

    // Redirect to a confirmation page or home page
    window.location.href = 'confirmation.html';
}

document.addEventListener('DOMContentLoaded', function () {
    loadOrderSummary();

    document.getElementById('placeOrderBtn').addEventListener('click', function (event) {
        event.preventDefault();
        placeOrder();
    });

    document.getElementById('sameAsBilling').addEventListener('change', function () {
        document.getElementById('shippingDetails').style.display = this.checked ? 'none' : 'block';
    });
});
