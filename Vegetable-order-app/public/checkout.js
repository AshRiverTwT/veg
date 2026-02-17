//new new code 
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutCartTableBody = document.querySelector('#checkout-cart-items tbody');
    const totalCostElement = document.getElementById('checkout-total-cost');

    if (cart.length === 0) {
        checkoutCartTableBody.innerHTML = '<tr><td colspan="3">Your cart is empty</td></tr>';
    } else {
        let totalCost = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.totalCost}</td>
            `;
            checkoutCartTableBody.appendChild(row);
            totalCost += item.totalCost;
        });
        totalCostElement.innerText = `Total Cost: Rs ${totalCost}`;
    }

    document.getElementById('checkout-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const data = {
            customer: {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: {
                    flat_no: formData.get('flat_no'),
                    area: formData.get('area'),
                    city: formData.get('city'),
                    state: formData.get('state'),
                    pincode: formData.get('pincode')
                }
            },
            cart: cart,
            cartTotal: totalCostElement.innerText.replace('Total Cost: Rs ', '')
        };

        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                // Store the checkoutId in localStorage
                localStorage.setItem('checkoutId', result.checkoutId);
                window.location.href = 'checkout-summary.html'; // Redirect to checkout summary page
            } else {
                alert('Failed to process checkout: ' + result.error);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
});






/*new code 
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutCartTableBody = document.querySelector('#checkout-cart-items tbody');
    const totalCostElement = document.getElementById('checkout-total-cost');

    if (cart.length === 0) {
        checkoutCartTableBody.innerHTML = '<tr><td colspan="3">Your cart is empty</td></tr>';
    } else {
        let totalCost = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.totalCost}</td>
            `;
            checkoutCartTableBody.appendChild(row);
            totalCost += item.totalCost;
        });
        totalCostElement.innerText = `Total Cost: Rs ${totalCost}`;
    }

    document.getElementById('checkout-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            pincode: formData.get('pincode'),
            cart: cart,
            totalCost: totalCostElement.innerText.replace('Total Cost: Rs ', '')
        };

        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                // Save the order ID or any confirmation details in local storage
                localStorage.setItem('orderSummary', JSON.stringify({
                    orderId: result.orderId,
                    orderTotal: totalCostElement.innerText
                }));
                window.location.href = 'checkout-summary.html'; // Redirect to order summary page
                
            } else {
                alert('Failed to process checkout: ' + result.error);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
});


*/





















/*document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutCartTableBody = document.querySelector('#checkout-cart-items tbody');
    const totalCostElement = document.getElementById('checkout-total-cost');

    if (cart.length === 0) {
        checkoutCartTableBody.innerHTML = '<tr><td colspan="3">Your cart is empty</td></tr>';
    } else {
        let totalCost = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.totalCost}</td>
            `;
            checkoutCartTableBody.appendChild(row);
            totalCost += item.totalCost;
        });
        totalCostElement.innerText = `Total Cost: Rs ${totalCost}`;
    }

    document.getElementById('checkout-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            pincode: formData.get('pincode'),
            cart: cart,
            totalCost: totalCostElement.innerText.replace('Total Cost: Rs ', '')
        };

        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                // Save the order ID in local storage or any other identifier for confirmation
                localStorage.setItem('orderId', result.orderId);
                window.location.href = 'summary.html'; // Redirect to order confirmation page
            } else {
                alert('Failed to process checkout: ' + result.error);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
});
*/