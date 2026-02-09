document.addEventListener("DOMContentLoaded", () => {
    displayProduct();
});

function displayProduct() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContent = document.getElementById("cartContent");
    let totalPrice = document.getElementById("totalPrice");
    
    cartContent.innerHTML = "";
    let totalAmount = 0;
    
    if (cart.length === 0) {
        cartContent.innerHTML = "<p>Your Cart is Empty, Start Shopping</p>";
        totalPrice.innerHTML = "";
        return;
    }
    
    cart.forEach((product, index) => {
        totalAmount += product.price * 90; // Accumulate total
        
        let productElem = document.createElement("div");
        productElem.className = "product-info";
        let count = Math.round(product.rating);
        
        productElem.innerHTML = `
            <main>
            <div class="details">
                <img src="${product.thumbnail}" alt="${product.title}"/>
                <div>
                <h3><strong>Price:</strong> <span>₹${Math.floor(product.price * 90)}</span></h3>
                <p>${product.title}</p>
                <p><span>Rating: ${"⭐".repeat(count)}</span></p> 
                </div>
                </div>
                <div id="details">
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            </main>
        `;
        cartContent.appendChild(productElem);
    });
    
    totalPrice.innerHTML = `<h2>Total Amount: ₹${Math.floor(totalAmount)}</h2>`;
    
    // Add event listeners to new buttons (avoids template literal onclick issues)
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            let index = parseInt(this.dataset.index);
            deleteFromCart(index);
        });
    });
}

function deleteFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayProduct();
}
