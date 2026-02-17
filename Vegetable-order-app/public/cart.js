//new updated code after connecting to mongodb
document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');
    const cartTable = document.getElementById('cartTable');
    const emptyMessage = document.getElementById('emptyMessage');

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCartCost = 0;

    if (cart.length === 0) {
        // Show empty message if cart is empty
        emptyMessage.style.display = 'block';
        cartTable.style.display = 'none';
    } else {
        // Hide empty message and show cart table
        emptyMessage.style.display = 'none';
        cartTable.style.display = 'table';

        // Populate the cart table
        const tbody = cartTable.querySelector('tbody');
        tbody.innerHTML = ''; // Clear any existing rows

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.totalCost}</td>
            `;
            tbody.appendChild(row);
            totalCartCost += item.totalCost; // Calculate total cart cost
        });

        // Add total cart cost row
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="2"><strong>Cart Total:</strong></td>
            <td><strong>Rs ${totalCartCost}</strong></td>
        `;
        tbody.appendChild(totalRow);
    }

    document.getElementById('proceed-to-checkout').addEventListener('click', () => {
        // Save cart data to MongoDB
        fetch('/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart, totalCartCost: totalCartCost })
        })
        .then(response => response.json())
        .then(data => {
            if (data.cartId) {
                localStorage.removeItem('cart'); // Clear cart from localStorage
                window.location.href = 'checkout.html'; // Redirect to checkout page
            } else {
                alert('Failed to save cart data.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('continue-shopping').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to home page
    });
});

// for checkout details updation in database
document.getElementById('checkoutForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.cart = JSON.parse(data.cart);
    
    try {
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Clear cart from localStorage
            localStorage.removeItem('cart');
            // Redirect to the summary page
            window.location.href = 'summary.html';
        } else {
            const result = await response.json();
            alert('Checkout failed: ' + result.error);
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Checkout failed.');
    }
});




//updated code before connecting to mongodb
/*
document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');
    const cartTable = document.getElementById('cartTable');
    const emptyMessage = document.getElementById('emptyMessage');

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        // Show empty message if cart is empty
        emptyMessage.style.display = 'block';
        cartTable.style.display = 'none';
    } else {
        // Hide empty message and show cart table
        emptyMessage.style.display = 'none';
        cartTable.style.display = 'table';

        // Populate the cart table
        const tbody = cartTable.querySelector('tbody');
        tbody.innerHTML = ''; // Clear any existing rows

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.totalCost}</td>
            `;
            tbody.appendChild(row);
        });
    }
});



*/


















// Cart Page JavaScript
/*
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cartTable tbody');

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs ${item.totalCost}</td>
        `;
        cartTableBody.appendChild(row);
    });

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="3">Your cart is empty.</td></tr>';
    }
});
*/
