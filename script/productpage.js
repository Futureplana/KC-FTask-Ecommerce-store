function getProduct() {
    let productid = localStorage.getItem("productid");
    console.log(productid);

    fetch(`https://api.escuelajs.co/api/v1/products/${productid}`)
        .then(response => response.json())
        .then((product) => {
            let productLayout = document.getElementById("product_layout");

            // Create a string to hold the images HTML
            let imagesHTML = '';
            product.images.forEach((image) => {
                imagesHTML += `
                <div class="carousel-item ${imagesHTML === '' ? 'active' : ''}">
                    <img src="${image}" class="d-block w-100" alt="${product.title}">
                </div>`;
            });

            let productdetails = `
            <div class="card mx-auto align-items-center" style="width: 20rem;">
                <!-- Carousel for multiple images -->
                <div id="productImagesCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${imagesHTML}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <!-- Product details -->
                <div class="card-body">
                    <h5 class="card-title text_color">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <h2 class="card-text fw-bold">Price: $${product.price}</h2>
                    <a href="#" class="btn btn-primary fw-bold p-3 px-5" id="add_to_cart_btn">Add-to-Cart</a>
                </div>
            </div>`;

            productLayout.innerHTML = productdetails;

            // Add event listener to the Add-to-Cart button
            document.getElementById("add_to_cart_btn").addEventListener("click", function() {
                addToCart(product);
            });
        })
        .catch(error => console.log("Error:", error));
}

getProduct();


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product already in cart
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");

    // Redirect to cart page after adding the product
    window.location.href = "./cart.html";
}
