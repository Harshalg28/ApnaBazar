document.addEventListener("DOMContentLoaded", () => {

    let products = JSON.parse(localStorage.getItem("products"));
    let productId = localStorage.getItem("productId");
    let productDetails = document.getElementById("productDetails");

    if (products && productId) {

        let selectedProduct = products.find(p => p.id == productId);

        if (selectedProduct) {

            let ratingCount = Math.min(5, Math.round(selectedProduct.rating));
            let priceINR = Math.floor(selectedProduct.price * 85);

            productDetails.innerHTML = `
                <div id="container"> 
                    <img src="${selectedProduct.images[0]}" alt="${selectedProduct.title}" />

                    <div id="details">
                        <h2>${selectedProduct.title}</h2>
                        <h3>Brand: ${selectedProduct.brand}</h3>
                        <h3>Category: ${selectedProduct.category}</h3>

                        <div id="Rating">
                            Rating: ${"⭐".repeat(ratingCount)}
                        </div>

                        <h4>Description: ${selectedProduct.description}</h4>

                        <h3 id="price">
                            <strong>Price:</strong> ₹${priceINR}
                        </h3>

                        <div id="button">
                            <button id="addToCart">Add to Cart</button>
                            <button id="backToHome">Back to Home</button>
                        </div>

                        <h2 id="review">Customer Review</h2>
                        <hr>
                        <p>❤️❤️❤️❤️❤️</p>
                        <h3 id="reviewerName">Review: ${selectedProduct.reviews[0].reviewerName} - Rate: ${selectedProduct.reviews[0].rating}</h3>Comment: ${selectedProduct.reviews[0].comment}
                        <h3 id="reviewerName">Review: ${selectedProduct.reviews[1].reviewerName} -  Rate: ${selectedProduct.reviews[1].rating}</h3>Comment: ${selectedProduct.reviews[1].comment}  
                        </h3>

                    </div>
                </div>
            `;

            document.getElementById("addToCart").addEventListener("click", () => {
                addToCart(selectedProduct);
            });

            document.getElementById("backToHome").addEventListener("click", () => {
                window.location.href = "./home.html";
            });

        } else {
            productDetails.innerHTML = "<p>Product Not Found</p>";
        }

    } else {
        productDetails.innerHTML = "<p>No Product Found</p>";
    }
});

function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.find(item => item.id === product.id);

    if (exists) {
        alert("Product already in cart");
    } else {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added successfully");
    }
}
