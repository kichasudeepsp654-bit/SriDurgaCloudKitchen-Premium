// =========================================================
// WORKZEN BACKEND API SERVER (server.js)
// Framework: Node.js & Express
// =========================================================

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database Collections (Production ನಲ್ಲಿ MongoDB ಗೆ ಲಿಂಕ್ ಮಾಡಬಹುದು)
const users = [];
const bookings = [];
const bulkRequests = [];
const investmentPitches = [];

// 1. ಹೆಲ್ತ್ ಚೆಕ್ ರೂಟ್
app.get('/', (req, res) => {
    res.json({ status: 'Online', message: 'WORKZEN API Server is running smoothly!' });
});

// 2. ಯೂಸರ್ ನೋಂದಣಿ / Waitlist API
app.post('/api/register', (req, res) => {
    const { name, phone, role } = req.body;
    
    if (!name || !phone || !role) {
        return res.status(400).json({ error: 'ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' });
    }

    const newUser = {
        id: 'WZ-' + Math.floor(10000 + Math.random() * 90000),
        name,
        phone,
        role,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    res.status(201).json({ success: true, message: 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!', user: newUser });
});

// 3. ಸರ್ವಿಸ್ ಬುಕಿಂಗ್ ಮತ್ತು Secure Payment Hold API
app.post('/api/bookings/create', (req, res) => {
    const { customerName, phone, serviceType, location, amount } = req.body;

    const newBooking = {
        bookingId: 'WZ-BOOK-' + Math.floor(1000 + Math.random() * 9000),
        customerName,
        phone,
        serviceType,
        location,
        amount: amount || 450,
        paymentStatus: 'HELD_IN_ESCROW', // Secure Hold
        workStatus: 'WORKER_ASSIGNED',
        assignedWorker: {
            workerId: 'WZ-84920',
            name: 'ಸುದೀಪ್',
            rating: 4.9
        },
        createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
});

// 4. ಪಾವತಿ ಬಿಡುಗಡೆ ಮತ್ತು WORKZEN Save (5%) ಲೆಕ್ಕಾಚಾರ API
app.post('/api/bookings/release-payment', (req, res) => {
    const { bookingId } = req.body;
    const booking = bookings.find(b => b.bookingId === bookingId);

    if (!booking) {
        return res.status(404).json({ error: 'ಬುಕಿಂಗ್ ವಿವರ ಸಿಕ್ಕಿಲ್ಲ.' });
    }

    const totalAmount = booking.amount;
    const saveDeduction = Math.round(totalAmount * 0.05); // 5% Save
    const workerPayout = totalAmount - saveDeduction;

    booking.paymentStatus = 'RELEASED_TO_WORKER';
    booking.workStatus = 'COMPLETED';

    res.json({
        success: true,
        message: 'ಹಣವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬಿಡುಗಡೆ ಮಾಡಲಾಗಿದೆ!',
        payoutDetails: {
            total: totalAmount,
            workerPayout: workerPayout,
            workzenSave: saveDeduction
        }
    });
});

// 5. ಕಂಪನಿ ಬಲ್ಕ್ ಹೈರಿಂಗ್ API
app.post('/api/business/bulk-hire', (req, res) => {
    const { companyName, hrName, contact, count, workType, location } = req.body;

    const requestData = {
        requestId: 'WZ-B2B-' + Date.now(),
        companyName,
        hrName,
        contact,
        count,
        workType,
        location,
        status: 'PENDING_REVIEW'
    };

    bulkRequests.push(requestData);
    res.status(201).json({ success: true, message: 'ಬಲ್ಕ್ ಹೈರಿಂಗ್ ಬೇಡಿಕೆ ದಾಖಲಾಗಿದೆ.', data: requestData });
});

// 6. ಬಿಸಿನೆಸ್ & ಇನ್ವೆಸ್ಟ್‌ಮೆಂಟ್ ಪ್ರಪೋಸಲ್ API
app.post('/api/business/pitch', (req, res) => {
    const { bizName, bizStage, fundAmount, bizSector, bizDesc } = req.body;

    const pitchData = {
        pitchId: 'WZ-INV-' + Date.now(),
        bizName,
        bizStage,
        fundAmount,
        bizSector,
        bizDesc,
        status: 'UNDER_VERIFICATION'
    };

    investmentPitches.push(pitchData);
    res.status(201).json({ success: true, message: 'ಹೂಡಿಕೆ ಪ್ರಪೋಸಲ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.', data: pitchData });
});

// ಸರ್ವರ್ ಪ್ರಾರಂಭ
app.listen(PORT, () => {
    console.log(`WORKZEN Server is running on port ${PORT}`);
});
const Razorpay = require('razorpay');

// Razorpay Test Keys (ನಿಮ್ಮ ಸ್ವಂತ Keys ಬಳಸಿ ಬದಲಾಯಿಸಬಹುದು)
const razorpay = new Razorpay({
    key_id: 'rzp_test_YOUR_KEY_HERE',
    key_secret: 'YOUR_SECRET_KEY_HERE'
});

// Razorpay Order Creation Route (Secure Payment Hold)
app.post('/api/payments/create-order', async (req, res) => {
    const { amount, bookingId } = req.body;

    const options = {
        amount: (amount || 450) * 100, // Amount in Paise (₹450 = 45000)
        currency: 'INR',
        receipt: bookingId || 'order_rcptid_11'
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
