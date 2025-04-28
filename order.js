const categorizedItems = {
    "🍔 Fast Food": [
        "Burger - ₹50", "Pizza - ₹150", "Sushi - ₹160", "Tacos - ₹150", "Pasta - ₹200"
    ],
    "🍹 Cool Drinks": [
        "Mango Mojito - ₹120", "Watermelon Cooler - ₹110", "Lemon Mint Fizz - ₹100",
        "Orange Sunrise - ₹130", "Pineapple Punch - ₹140"
    ],
    "🥤 Shakes & Smoothies": [
        "Chocolate Overload Shake - ₹150", "Strawberry Bliss Shake - ₹140",
        "Oreo Crunch Shake - ₹160", "Banana Honey Smoothie - ₹130", "Mango Yogurt Smoothie - ₹140"
    ],
    "☕ Hot Beverages": [
        "Masala Chai - ₹50", "Ginger Lemon Tea - ₹60", "Filter Coffee - ₹70",
        "Hot Chocolate - ₹120", "Turmeric Latte - ₹90"
    ],
    "🧊 Cold Beverages": [
        "Iced Americano - ₹100", "Cold Coffee - ₹120", "Blue Lagoon Mocktail - ₹130",
        "Peach Iced Tea - ₹110", "Coconut Water Refresher - ₹90"
    ],
    "🍛 Main Course": [
        "Butter Chicken - ₹350", "Paneer Tikka - ₹280", "Biryani (Chicken) - ₹300",
        "Biryani (Mutton) - ₹350", "Biryani (Veg) - ₹250", "Masala Dosa - ₹180",
        "Chole Bhature - ₹200", "Dal Makhani - ₹220", "Tandoori Roti - ₹40", "Naan - ₹50"
    ],
    "🍨 Desserts": [
        "Gulab Jamun - ₹120 (2 pcs)", "Lassi - ₹150"
    ]
};

let itemCount = 0;

function extractPrice(item) {
    const match = item.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

function generateOptions() {
    let html = "";
    for (const category in categorizedItems) {
        html += `<optgroup label="${category}">`;
        categorizedItems[category].forEach(item => {
            html += `<option value="${item}">${item}</option>`;
        });
        html += `</optgroup>`;
    }
    return html;
}

function addItem() {
    const container = document.getElementById("itemsContainer");

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");
    itemDiv.innerHTML = `
        <label>Select Item ${itemCount + 1}:</label><br>
        <select name="menuItem" required>
            <option value="">-- Choose an item --</option>
            ${generateOptions()}
        </select><br><br>
        <label>Quantity:</label><br>
        <input type="number" name="quantity" min="1" value="1" required><br><br>
        <hr>
    `;

    container.appendChild(itemDiv);
    itemCount++;
}

document.addEventListener("DOMContentLoaded", function () {
    alert("👋 Welcome to Foodie Crush Order Page! 🍽️ Place your delicious order now!");
    addItem();
});

document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const contact = document.getElementById("customerContact").value;

    const itemsSelected = Array.from(document.querySelectorAll(".order-item")).map(div => {
        const item = div.querySelector("select").value;
        const quantity = parseInt(div.querySelector("input[type='number']").value);
        return { item, quantity };
    });

    let totalBill = 0;
    const itemList = itemsSelected.map(entry => {
        const price = extractPrice(entry.item);
        const subtotal = price * entry.quantity;
        totalBill += subtotal;
        return `<li>${entry.item} (x${entry.quantity}) - ₹${subtotal}</li>`;
    });

    document.getElementById("orderSummary").innerHTML = `
        <h2>Thank you, ${name}!</h2>
        <p>📞 Contact: ${contact}</p>
        <p>You have ordered:</p>
        <ul>${itemList.join("")}</ul>
        <h3>Total Bill: ₹${totalBill}</h3>
        <button id="payNowBtn">💳 Proceed to Payment</button>
    `;

    document.getElementById("payNowBtn").addEventListener("click", function () {
        showPaymentOptions(totalBill);
    });
});

function showPaymentOptions(totalBill) {
    document.getElementById("orderSummary").innerHTML += `
        <div id="paymentOptions" style="margin-top:20px;">
            <h3>Select Payment Method:</h3>
            <select id="paymentMethod" required>
                <option value="">-- Choose Payment Method --</option>
                <option value="gpay">🤑 Google Pay</option>
                <option value="netbanking">🏦 Netbanking</option>
                <option value="upi">📱 UPI</option>
                <option value="card">💳 Credit/Debit Card</option>
            </select>
            <br><br>
            <button id="finalPayBtn">✅ Pay ₹${totalBill}</button>
        </div>
    `;

    document.getElementById("finalPayBtn").addEventListener("click", function () {
        const method = document.getElementById("paymentMethod").value;
        if (!method) {
            alert("⚠️ Please select a payment method!");
            return;
        }

        document.getElementById("paymentOptions").innerHTML = `
            <h3>Processing your payment...</h3>
            <progress value="0" max="100" id="paymentProgress" style="width: 100%;"></progress>
        `;

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            document.getElementById("paymentProgress").value = progress;
            if (progress >= 100) {
                clearInterval(interval);
                document.getElementById("orderSummary").innerHTML = `
                    <h2>🎉 Payment Successful!</h2>
                    <p>Thank you for your payment via ${method.toUpperCase()}.</p>
                    <p>🙏 Your order is now confirmed!</p>
                `;
            }
        }, 300);
    });
}
