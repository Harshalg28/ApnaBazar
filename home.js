let products = [];


function fetchData() {
    fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((val) => {
            products = val.products;
            localStorage.setItem("products", JSON.stringify(products));
            fetchProducts(products); // Pass products to display
        });
}

function fetchProducts(productList) {
    let output = "";
    productList.map((v) => {
        let price = Math.ceil(v.price * 80);
        let rate = Math.round(v.rating);

        output += `
        <main>
            <img src="${v.images[0]}" alt="${v.title}" />      
            <h2 id="title">${v.title}</h2>
            <p id="rating"><span id="rating-box">Rating: ${"⭐".repeat(rate)}</span></p>
            <p id="price"><strong>Price:</strong> 
                <span id="cost">₹${Math.floor(v.price * 85.5)}</span>
            </p>
            <button onclick="viewMore(${v.id})">View More</button>
            <button id="addToCart">Add To Cart</button>
        </main>
        `;
    });
    document.getElementById("containerBox").innerHTML = output;
}

// Search functionality
document
    .getElementById("searchproduct")
    .addEventListener("input", function searchItem(event) {
        let searchTerm = event.target.value.toLowerCase();
        let filteredProduct = products.filter((v) => {
            return (
                v.title.toLowerCase().includes(searchTerm) ||
                v.category.toLowerCase().includes(searchTerm)
            );
        });
        fetchProducts(filteredProduct);
    });

    function viewMore(productId){
        // console.log(productId);
        localStorage.setItem("productId",productId);
        window.location.href="./viewMore.html"
    }

fetchData(); // Initialize
