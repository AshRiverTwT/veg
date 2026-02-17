/*document.addEventListener('DOMContentLoaded', async () => {
    const checkoutId = localStorage.getItem('checkoutId');

    if (!checkoutId) {
        document.getElementById('checkoutSummaryContainer').innerHTML = '<p>No checkout data found.</p>';
        return;
    }

    try {
        const response = await fetch(`/checkout/${checkoutId}`);
        const checkoutData = await response.json();

        if (response.ok) {
            const summaryElement = document.getElementById('checkoutSummary');
            summaryElement.innerHTML = `
                <h2>Checkout Summary</h2>
                <p><strong>Name:</strong> ${checkoutData.customer.name}</p>
                <p><strong>Email:</strong> ${checkoutData.customer.email}</p>
                <p><strong>Phone:</strong> ${checkoutData.customer.phone}</p>
                <p><strong>Address:</strong> ${checkoutData.customer.address.flat_no}, ${checkoutData.customer.address.area}, ${checkoutData.customer.address.city}, ${checkoutData.customer.address.state} - ${checkoutData.customer.address.pincode}</p>
                <h3>Vegetables Ordered:</h3>
                <ul>
                    ${checkoutData.cart.map(item => `<li>${item.name} - ${item.quantity} (Total: Rs ${item.totalCost})</li>`).join('')}
                </ul>
                <p><strong>Cart Total:</strong> Rs ${checkoutData.cartTotal}</p>
            `;
        } else {
            document.getElementById('checkoutSummaryContainer').innerHTML = '<p>Checkout not found.</p>';
        }
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('checkoutSummaryContainer').innerHTML = '<p>Error retrieving checkout data.</p>';
    }
});
*/


document.addEventListener('DOMContentLoaded', async () => {
    const checkoutId = localStorage.getItem('checkoutId');
    console.log('Checkout ID:', checkoutId);  // Add this line to debug

    if (!checkoutId) {
        document.getElementById('checkoutSummaryContainer').innerHTML = '<p>No checkout data found.</p>';
        return;
    }

    try {
        const response = await fetch(`/checkout/${checkoutId}`);
        const checkoutData = await response.json();

        if (response.ok) {
            const summaryElement = document.getElementById('checkoutSummary');
            summaryElement.innerHTML = `
                <h2>Checkout Summary</h2>
                <p><strong>Name:</strong> ${checkoutData.customer.name}</p>
                <p><strong>Email:</strong> ${checkoutData.customer.email}</p>
                <p><strong>Phone:</strong> ${checkoutData.customer.phone}</p>
                <p><strong>Address:</strong> ${checkoutData.customer.address.flat_no}, ${checkoutData.customer.address.area}, ${checkoutData.customer.address.city}, ${checkoutData.customer.address.state} - ${checkoutData.customer.address.pincode}</p>
                <h3>Vegetables Ordered:</h3>
                <ul>
                    ${checkoutData.cart.map(item => `<li>${item.name} - ${item.quantity} (Total: Rs ${item.totalCost})</li>`).join('')}
                </ul>
                <p><strong>Cart Total:</strong> Rs ${checkoutData.cartTotal}</p>
            `;
        } else {
            document.getElementById('checkoutSummaryContainer').innerHTML = '<p>Checkout not found.</p>';
        }
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('checkoutSummaryContainer').innerHTML = '<p>Error retrieving checkout data.</p>';
    }
});


document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const customer = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: {
            flat_no: document.getElementById('flat_no').value,
            area: document.getElementById('area').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
        }
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotal = cart.reduce((total, item) => total + item.totalCost, 0);

    try {
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customer, cart, cartTotal })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('checkoutId', data.checkoutId); // Store checkoutId in localStorage
            window.location.href = 'checkout-summary.html'; // Redirect to summary page
        } else {
            console.error('Checkout failed:', data.message);
        }
    } catch (err) {
        console.error('Error during checkout:', err);
    }
});
