// Function to fetch products from API for a specific category
function getCategoryProducts(categoryId, containerId) {
    fetch(`https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}&offset=0&limit=4`)
        .then(response => response.json())
        .then((data) => {
            displayProducts(data, containerId);
        })
        .catch(error => console.log("Error:", error));
}

// Function to fetch and display featured products
function getFeaturedProducts() {
    fetch("https://api.escuelajs.co/api/v1/products?offset=10&limit=8")
        .then(response => response.json())
        .then((data) => {
            displayProducts(data, 'product_layout'); // Display in Featured Products section
        })
        .catch(error => console.log("Error:", error));
}

// Function to render products into the specified container
function displayProducts(products, containerId) {
    let container = document.getElementById(containerId);
    let productHTML = '';

    products.forEach((product) => {
        productHTML += `
        <div class="card viewProduct mx-auto align-items-center" style="width: 15rem;" data-product-id="${product.id}">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title text_color">${product.title}</h5>
                <p class="card-text text-warning bg_color">$${product.price}</p>
            </div>
        </div>`;
    });

    container.innerHTML = productHTML;
    viewProduct();
}

function viewProduct() {
    let viewProductElements = document.querySelectorAll(".viewProduct");

    viewProductElements.forEach((element) => {
        element.addEventListener("click", () => {
            let productId = element.getAttribute("data-product-id");
            localStorage.setItem("productid", productId);
            window.location.href = "./pages/productpage.html"; // Ensure this path is correct
        });
    });
}

// Fetch and display featured products
getFeaturedProducts();

// Fetch and display products for each category
getCategoryProducts(1, 'product_cloth'); // Fetch clothes category
getCategoryProducts(2, 'product_shoes'); // Fetch shoes category
getCategoryProducts(3, 'product_electronis'); // Fetch electronics category
