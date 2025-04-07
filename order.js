const items = [
    "Burgers - ₹50", "Pizza - ₹150", "Sushi - ₹160", "Tacos - ₹150", "Pasta - ₹200",
    "Mango Mojito – ₹120", "Watermelon Cooler – ₹110", "Lemon Mint Fizz – ₹100",
    "Orange Sunrise – ₹130", "Pineapple Punch – ₹140", "Chocolate Overload Shake – ₹150",
    "Strawberry Bliss Shake – ₹140", "Oreo Crunch Shake – ₹160", "Banana Honey Smoothie – ₹130",
    "Mango Yogurt Smoothie – ₹140", "Masala Chai – ₹50", "Ginger Lemon Tea – ₹60",
    "Filter Coffee – ₹70", "Hot Chocolate – ₹120", "Turmeric Latte – ₹90",
    "Iced Americano – ₹100", "Cold Coffee – ₹120", "Blue Lagoon Mocktail – ₹130",
    "Peach Iced Tea – ₹110", "Coconut Water Refresher – ₹90", "Butter Chicken - ₹350",
    "Paneer Tikka - ₹280", "Biryani (Chicken/Mutton/Veg) - ₹300/₹350/₹250", "Masala Dosa - ₹180",
    "Chole Bhature - ₹200", "Pani Puri - ₹100", "Dal Makhani - ₹220",
    "Tandoori Roti/Naan - ₹40/₹50", "Gulab Jamun - ₹120 (2 pcs)", "Lassi - ₹150"
];

let itemCount = 0;

function addItem() {
    const container = document.getElementById("itemsContainer");

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");
    itemDiv.innerHTML = `
        <label>Select Item ${itemCount + 1}:</label><br>
        <select name="menuItem" required>
            <option value="">-- Choose an item --</option>
            ${items.map(item => `<option value="${item}">${item}</option>`).join("")}
        </select><br><br>
        <label>Quantity:</label><br>
        <input type="number" name="quantity" min="1" value="1" required><br><br>
        <hr>
    `;

    container.appendChild(itemDiv);
    itemCount++;
}

// Default one item
document.addEventListener("DOMContentLoaded", addItem);

document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("customerName").value;
    const itemsSelected = Array.from(document.querySelectorAll(".order-item")).map(div => {
        const item = div.querySelector("select").value;
        const quantity = div.querySelector("input[type='number']").value;
        return `${item} (x${quantity})`;
    });

    document.getElementById("orderSummary").innerHTML = `
        <h2>Thank you, ${name}!</h2>
        <p>You have ordered:</p>
        <ul>${itemsSelected.map(i => `<li>${i}</li>`).join("")}</ul>
    `;
});


