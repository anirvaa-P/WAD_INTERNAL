let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* REGISTER */
function registerUser(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let valid = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";

    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required";
        valid = false;
    }

    if (email === "" || !email.includes("@")) {
        document.getElementById("emailError").innerText = "Enter valid email";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Min 6 characters required";
        valid = false;
    }

    if (valid) {
        alert("Registered Successfully!");
        window.location.href = "login.html";
    }
}

/* LOGIN */
function loginUser(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let valid = true;

    document.getElementById("loginEmailError").innerText = "";
    document.getElementById("loginPasswordError").innerText = "";

    if (email === "") {
        document.getElementById("loginEmailError").innerText = "Email required";
        valid = false;
    }

    if (password === "") {
        document.getElementById("loginPasswordError").innerText = "Password required";
        valid = false;
    }

    if (valid) {
        alert("Login Successful!");
        window.location.href = "catalog.html";
    }
}

/* CART FUNCTIONS (same as before) */
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
}

function loadCart() {
    let cartDiv = document.getElementById("cartItems");
    let total = 0;

    cartDiv.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = item.name + " - ₹" + item.price;
        cartDiv.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

if (window.location.pathname.includes("cart.html")) {
    loadCart();
}