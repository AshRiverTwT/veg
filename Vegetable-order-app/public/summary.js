
document.addEventListener('DOMContentLoaded', async () => {
    const orderId = localStorage.getItem('orderId');

    if (!orderId) {
        document.getElementById('orderSummaryContainer').innerHTML = '<p>No order data found.</p>';
        return;
    }

    try {
        const response = await fetch(`/order/${orderId}`);
        const orderData = await response.json();

        if (response.ok) {
            const summaryElement = document.getElementById('orderSummary');
            summaryElement.innerHTML = `
                <h2>Order Summary</h2>
                <p><strong>Name:</strong> ${orderData.name}</p>
                <p><strong>Email:</strong> ${orderData.email}</p>
                <p><strong>Phone:</strong> ${orderData.phone}</p>
                <p><strong>Address:</strong> ${orderData.address.flat_no}, ${orderData.address.area}, ${orderData.address.city}, ${orderData.address.state} - ${orderData.address.pincode}</p>
                <h3>Vegetables Ordered:</h3>
                <ul>
                    ${Object.entries(orderData.vegetables)
                        .filter(([_, qty]) => qty > 0)
                        .map(([key, qty]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)} - ${qty}</li>`)
                        .join('')}
                </ul>
                <p><strong>Total Cost:</strong> Rs ${orderData.totalCost}</p>
            `;
        } else {
            document.getElementById('orderSummaryContainer').innerHTML = '<p>Order not found.</p>';
        }
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('orderSummaryContainer').innerHTML = '<p>Error retrieving order data.</p>';
    }
});


// new code for order not found error

document.addEventListener('DOMContentLoaded', async () => {
    const orderId = localStorage.getItem('orderId');

    if (!orderId) {
        document.getElementById('orderSummaryContainer').innerHTML = '<p>No order data found.</p>';
        return;
    }

    try {
        const response = await fetch(`/order/${orderId}`);
        const orderData = await response.json();

        if (response.ok) {
            const summaryElement = document.getElementById('orderSummary');
            summaryElement.innerHTML = `
                <h2>Order Summary</h2>
                <p><strong>Name:</strong> ${orderData.name}</p>
                <p><strong>Email:</strong> ${orderData.email}</p>
                <p><strong>Phone:</strong> ${orderData.phone}</p>
                <p><strong>Address:</strong> ${orderData.address.flat_no}, ${orderData.address.area}, ${orderData.address.city}, ${orderData.address.state} - ${orderData.address.pincode}</p>
                <h3>Vegetables Ordered:</h3>
                <ul>
                    ${Object.entries(orderData.vegetables)
                        .filter(([_, qty]) => qty > 0)
                        .map(([key, qty]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)} - ${qty}</li>`)
                        .join('')}
                </ul>
                <p><strong>Total Cost:</strong> Rs ${orderData.totalCost}</p>
            `;
        } else {
            document.getElementById('orderSummaryContainer').innerHTML = '<p>Order not found.</p>';
        }
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('orderSummaryContainer').innerHTML = '<p>Error retrieving order data.</p>';
    }
});

// new updated code for ckeckout from your cart 

document.addEventListener('DOMContentLoaded', () => {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));
    const orderSummaryContainer = document.getElementById('orderSummary');

    if (orderSummary) {
        orderSummaryContainer.innerHTML = `
            <p>Order ID: ${orderSummary.orderId}</p>
            <p>Total Cost: ${orderSummary.orderTotal}</p>
        `;
        localStorage.removeItem('orderSummary'); // Clear the summary from local storage
    } else {
        orderSummaryContainer.innerHTML = '<p>No order summary available.</p>';
    }
});
