document.getElementById('orderForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
        return;
    }

    // Collect form data
    const formData = {
        name: document.getElementById('Name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: {
            flat_no: document.getElementById('flat_no').value,
            area: document.getElementById('area').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value
        },
        vegetables: {
            brinjalQty: parseInt(document.getElementById('brinjalQty').value, 10),
            tomatoQty: parseInt(document.getElementById('tomatoQty').value, 10),
            carrotQty: parseInt(document.getElementById('carrotQty').value, 10),
            cucumberQty: parseInt(document.getElementById('cucumberQty').value, 10),
            onionQty: parseInt(document.getElementById('onionQty').value, 10),
            chilliQty: parseInt(document.getElementById('chilliQty').value, 10),
            spinachQuantity: parseInt(document.getElementById('spinach-quantity').value, 10),
            coriander: parseInt(document.getElementById('coriander').value, 10),
            Karvepaku: parseInt(document.getElementById('Karvepaku').value, 10),
            pudina: parseInt(document.getElementById('pudina').value, 10)
        }
    };

    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            document.getElementById('orderForm').reset();
        } else {
            alert('Error placing order');
        }
    })
    .catch(error => console.error('Error:', error));

    event.preventDefault(); // Prevent default form submission
});
// Validate form inputs
//updated code starting

function validateForm() {
    let errorMessages = [];

    // Retrieve values
    let name = document.getElementById('Name').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let pincode = document.getElementById('pincode').value.trim();

    // Patterns
    let namePattern = /^[A-Za-z]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let phonePattern = /^[6-9][0-9]{9}$/; // Ensure exactly 10 digits
    let pincodePattern = /^[1-9][0-9]{5}$/; // Ensure exactly 6 digits

    // Validate Name
    if (!name) {
        errorMessages.push('Name is required.');
    } else if (!namePattern.test(name)) {
        errorMessages.push('Name must contain only alphabetic characters.');
    }

    // Validate Email
    if (!email) {
        errorMessages.push('Email is required.');
    } else if (!emailPattern.test(email)) {
        errorMessages.push('Invalid email address.');
    }

    // Validate Phone Number
    if (!phonePattern.test(phone)) {
        errorMessages.push('Invalid phone number. Must be exactly 10 digits.');
    }

    // Validate Pincode
    if (!pincodePattern.test(pincode)) {
        errorMessages.push('Invalid pincode. Must be exactly 6 digits.');
    }

    // Check if at least one vegetable is selected
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
        errorMessages.push('Please select at least one vegetable.');
    }

    // Display Error Messages
    if (errorMessages.length > 0) {
        alert(errorMessages.join('\n')); // Display all error messages in an alert
        return false; // Prevent form submission
    } else {
        return true; // Allow form submission
    }
}

//ending of form vaidation


// Form submission event listener
//document.getElementById('orderForm').addEventListener('submit', function(event) {
    //if (!validateForm()) {
    //    event.preventDefault(); // Prevent form submission if validation fails
  //  }
//});


//updated code for Form submission event listener after gibing validation for vegetables above commented code previous version of this code
 //starting
 document.getElementById('orderForm').addEventListener('submit', function(event) {
    // Validate the form before proceeding
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
        return; // Stop further execution
    }

    // Collect form data
    const formData = {
        name: document.getElementById('Name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: {
            flat_no: document.getElementById('flat_no').value,
            area: document.getElementById('area').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value
        },
        vegetables: {
            brinjalQty: parseInt(document.getElementById('brinjalQty').value, 10),
            tomatoQty: parseInt(document.getElementById('tomatoQty').value, 10),
            carrotQty: parseInt(document.getElementById('carrotQty').value, 10),
            cucumberQty: parseInt(document.getElementById('cucumberQty').value, 10),
            onionQty: parseInt(document.getElementById('onionQty').value, 10),
            chilliQty: parseInt(document.getElementById('chilliQty').value, 10),
            spinachQuantity: parseInt(document.getElementById('spinach-quantity').value, 10),
            coriander: parseInt(document.getElementById('coriander').value, 10),
            Karvepaku: parseInt(document.getElementById('Karvepaku').value, 10),
            pudina: parseInt(document.getElementById('pudina').value, 10)
        }
    };

    // Perform form submission using fetch
    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            document.getElementById('orderForm').reset(); // Reset the form
        } else {
            alert('Error placing order');
        }
    })
    .catch(error => console.error('Error:', error));

    event.preventDefault(); // Prevent default form submission
});
//ending