// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function registerUser(e) {
//     e.preventDefault();
//     alert("Registered Successfully!");
//     window.location.href = "login.html";
// }

// function loginUser(e) {
//     e.preventDefault();
//     alert("Login Successful!");
//     window.location.href = "catalog.html";
// }

// function addToCart(name, price) {
//     cart.push({ name, price });
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Added to Cart");
// }

// function loadCart() {
//     let cartDiv = document.getElementById("cartItems");
//     let total = 0;

//     cartDiv.innerHTML = "";

//     cart.forEach(item => {
//         let p = document.createElement("p");
//         p.innerText = item.name + " - ₹" + item.price;
//         cartDiv.appendChild(p);
//         total += item.price;
//     });

//     document.getElementById("total").innerText = "Total: ₹" + total;
// }

// if (window.location.pathname.includes("cart.html")) {
//     loadCart();
// }