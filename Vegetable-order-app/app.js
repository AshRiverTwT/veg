const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vegetable_order_app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process if connection fails
    }
};

connectToDatabase();

// Order Schema
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: {
        flat_no: String,
        area: String,
        city: String,
        state: String,
        pincode: String
    },
    vegetables: {
        brinjalQty: Number,
        tomatoQty: Number,
        carrotQty: Number,
        cucumberQty: Number,
        onionQty: Number,
        chilliQty: Number,
        spinachQuantity: Number,
        coriander: Number,
        Karvepaku: Number,
        pudina: Number
    },
    totalCost: Number
});

const Order = mongoose.model('Order', orderSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
    items: [{
        name: String,
        quantity: Number,
        totalCost: Number
    }],
    totalCartCost: Number
});

const Cart = mongoose.model('Cart', cartSchema);

// Checkout Schema
const checkoutSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        phone: String,
        address: {
            flat_no: String,
            area: String,
            city: String,
            state: String,
            pincode: String
        }
    },
    cart: [
        {
            name: String,
            quantity: Number,
            totalCost: Number
        }
    ],
    cartTotal: Number
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

// Routes
app.post('/order', async (req, res) => {
    try {
        const { name, email, phone, address, vegetables, totalCost } = req.body;
        const newOrder = new Order({ name, email, phone, address, vegetables, totalCost });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!', orderId: savedOrder._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/order/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cart Routes
app.post('/cart', async (req, res) => {
    try {
        const { items, totalCartCost } = req.body;
        const newCart = new Cart({ items, totalCartCost });
        const savedCart = await newCart.save();
        res.status(201).json({ message: 'Cart data saved successfully!', cartId: savedCart._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/cart/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await Cart.findById(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//checkout routes
app.post('/checkout', async (req, res) => {
    try {
        const { customer, cart, cartTotal } = req.body;

        // Create a new checkout entry
        const newCheckout = new Checkout({
            customer,
            cart,
            cartTotal
        });

        // Save the entry to the database
        const savedCheckout = await newCheckout.save();
        res.status(201).json({ message: 'Checkout successful!', checkoutId: savedCheckout._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/checkout/:id', async (req, res) => {
    try {
        const checkoutId = req.params.id;
        const checkout = await Checkout.findById(checkoutId);
        if (checkout) {
            res.json(checkout);
        } else {
            res.status(404).json({ message: 'Checkout not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
