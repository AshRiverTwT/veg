//updated code for no vegetbale selected then order should not be confirmed

async function calculateTotalCost() {
    const rates = {
        brinjal: 35,
        tomato: 25,
        carrot: 40,
        cucumber: 80,
        onion: 35,
        chilli: 80,
        spinach: 10,
        coriander: 10,
        Karvepaku: 10,
        pudina: 20
    };

    let totalCost = 0;
    totalCost += (document.getElementById('brinjalQty').value || 0) * rates.brinjal;
    totalCost += (document.getElementById('tomatoQty').value || 0) * rates.tomato;
    totalCost += (document.getElementById('carrotQty').value || 0) * rates.carrot;
    totalCost += (document.getElementById('cucumberQty').value || 0) * rates.cucumber;
    totalCost += (document.getElementById('onionQty').value || 0) * rates.onion;
    totalCost += (document.getElementById('chilliQty').value || 0) * rates.chilli;
    totalCost += (document.getElementById('spinach-quantity').value || 0) * rates.spinach;
    totalCost += (document.getElementById('coriander').value || 0) * rates.coriander;
    totalCost += (document.getElementById('Karvepaku').value || 0) * rates.Karvepaku;
    totalCost += (document.getElementById('pudina').value || 0) * rates.pudina;

    document.getElementById('totalCost').value = totalCost;
    document.getElementById('totalCostDisplay').innerText = `Total Cost: Rs ${totalCost}`;
}

// Attach event listeners to quantity inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculateTotalCost);
});

// Single form submission handler
document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent actual form submission

    // Validation
    let vegetablesSelected = false;
    const vegetableQuantities = [
        'brinjalQty', 'tomatoQty', 'carrotQty', 'cucumberQty', 'onionQty', 'chilliQty',
        'spinach-quantity', 'coriander', 'Karvepaku', 'pudina'
    ];

    vegetableQuantities.forEach(id => {
        let qty = parseInt(document.getElementById(id).value, 10);
        if (qty > 0) {
            vegetablesSelected = true;
        }
    });

    if (!vegetablesSelected) {
        alert('Please select at least one vegetable.');
        return; // Stop further execution if validation fails
    }

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('Name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: {
            flat_no: formData.get('flat_no'),
            area: formData.get('area'),
            city: formData.get('city'),
            state: formData.get('state'),
            pincode: formData.get('pincode')
        },
        vegetables: {
            brinjalQty: parseInt(formData.get('brinjalQty') || 0, 10),
            tomatoQty: parseInt(formData.get('tomatoQty') || 0, 10),
            carrotQty: parseInt(formData.get('carrotQty') || 0, 10),
            cucumberQty: parseInt(formData.get('cucumberQty') || 0, 10),
            onionQty: parseInt(formData.get('onionQty') || 0, 10),
            chilliQty: parseInt(formData.get('chilliQty') || 0, 10),
            spinachQuantity: parseInt(formData.get('spinach-quantity') || 0, 10),
            coriander: parseInt(formData.get('coriander') || 0, 10),
            Karvepaku: parseInt(formData.get('Karvepaku') || 0, 10),
            pudina: parseInt(formData.get('pudina') || 0, 10)
        },
        totalCost: document.getElementById('totalCost').value
    };

    try {
        const response = await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            const orderId = result.orderId;
            localStorage.setItem('orderId', orderId); // Store orderId
            window.location.href = 'summary.html'; // Redirect to summary page
        } else {
            alert('Failed to place the order: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});


//2nd updated code for cart functionality
// Function to toggle visibility of quantity selector
function showQuantity(button, quantityId, name, price) {
    const quantityDiv = button.nextElementSibling;
    quantityDiv.style.display = quantityDiv.style.display === 'none' ? 'block' : 'none';
    
    // Event listener for when user adds quantity
    quantityDiv.querySelector('input').addEventListener('change', function() {
        addToCart(name, quantityId, price);
    });
}

// Function to add item to the cart


function addToCart(name, qtyId, price) {
    const qty = parseInt(document.getElementById(qtyId).value, 10);
    if (qty > 0) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += qty;
            existingItem.totalCost = existingItem.quantity * price;
        } else {
            cart.push({
                name: name,
                quantity: qty,
                totalCost: qty * price
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
        
        // Optionally, reset the quantity input to 0
        document.getElementById(qtyId).value = 0;
        // Hide the quantity selector again
        button.nextElementSibling.style.display = 'none';
    } else {
        alert('Please select a quantity.');
    }
}
    






























/*
async function calculateTotalCost() {
    const rates = {
        brinjal: 35,
        tomato: 25,
        carrot: 40,
        cucumber: 80,
        onion: 35,
        chilli: 80,
        spinach: 10,
        coriander: 10,
        Karvepaku: 10,
        pudina: 20
    };

    let totalCost = 0;
    totalCost += (document.getElementById('brinjalQty').value || 0) * rates.brinjal;
    totalCost += (document.getElementById('tomatoQty').value || 0) * rates.tomato;
    totalCost += (document.getElementById('carrotQty').value || 0) * rates.carrot;
    totalCost += (document.getElementById('cucumberQty').value || 0) * rates.cucumber;
    totalCost += (document.getElementById('onionQty').value || 0) * rates.onion;
    totalCost += (document.getElementById('chilliQty').value || 0) * rates.chilli;
    totalCost += (document.getElementById('spinach-quantity').value || 0) * rates.spinach;
    totalCost += (document.getElementById('coriander').value || 0) * rates.coriander;
    totalCost += (document.getElementById('Karvepaku').value || 0) * rates.Karvepaku;
    totalCost += (document.getElementById('pudina').value || 0) * rates.pudina;

    document.getElementById('totalCost').value = totalCost;
    document.getElementById('totalCostDisplay').innerText = `Total Cost: Rs ${totalCost}`;
}

// Attach event listeners to quantity inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculateTotalCost);
});

document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent actual form submission

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('Name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: {
            flat_no: formData.get('flat_no'),
            area: formData.get('area'),
            city: formData.get('city'),
            state: formData.get('state'),
            pincode: formData.get('pincode')
        },
        vegetables: {
            brinjalQty: parseInt(formData.get('brinjalQty') || 0, 10),
            tomatoQty: parseInt(formData.get('tomatoQty') || 0, 10),
            carrotQty: parseInt(formData.get('carrotQty') || 0, 10),
            cucumberQty: parseInt(formData.get('cucumberQty') || 0, 10),
            onionQty: parseInt(formData.get('onionQty') || 0, 10),
            chilliQty: parseInt(formData.get('chilliQty') || 0, 10),
            spinachQuantity: parseInt(formData.get('spinach-quantity') || 0, 10),
            coriander: parseInt(formData.get('coriander') || 0, 10),
            Karvepaku: parseInt(formData.get('Karvepaku') || 0, 10),
            pudina: parseInt(formData.get('pudina') || 0, 10)
        },
        totalCost: document.getElementById('totalCost').value
    };

    try {
        const response = await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            // Save the order ID in local storage to retrieve it on the summary page
            const orderId = result.orderId;
            localStorage.setItem('orderId', orderId);
            window.location.href = 'summary.html'; // Redirect to summary page
        } else {
            alert('Failed to place the order: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});


// new code for order not found error

document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('Name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: {
            flat_no: formData.get('flat_no'),
            area: formData.get('area'),
            city: formData.get('city'),
            state: formData.get('state'),
            pincode: formData.get('pincode')
        },
        vegetables: {
            brinjalQty: parseInt(formData.get('brinjalQty') || 0, 10),
            tomatoQty: parseInt(formData.get('tomatoQty') || 0, 10),
            carrotQty: parseInt(formData.get('carrotQty') || 0, 10),
            cucumberQty: parseInt(formData.get('cucumberQty') || 0, 10),
            onionQty: parseInt(formData.get('onionQty') || 0, 10),
            chilliQty: parseInt(formData.get('chilliQty') || 0, 10),
            spinachQuantity: parseInt(formData.get('spinach-quantity') || 0, 10),
            coriander: parseInt(formData.get('coriander') || 0, 10),
            Karvepaku: parseInt(formData.get('Karvepaku') || 0, 10),
            pudina: parseInt(formData.get('pudina') || 0, 10)
        },
        totalCost: document.getElementById('totalCost').value
    };

    try {
        const response = await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            const orderId = result.orderId;
            localStorage.setItem('orderId', orderId); // Store orderId
            window.location.href = 'summary.html'; // Redirect to summary page
        } else {
            alert('Failed to place the order: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

*/