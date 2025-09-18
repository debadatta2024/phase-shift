import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library'; // <-- NEW IMPORT

dotenv.config();

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID); // <-- NEW OAUTH CLIENT

// --- User Model ---
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Password is not required for Google users
    googleId: { type: String, sparse: true, unique: true } // Store Google's unique ID
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// --- Express App Initialization ---
const app = express();
const PORT = process.env.PORT || 3001;

// --- Database Connection ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("FATAL ERROR: MONGO_URI is not defined. Please check your .env file.");
    process.exit(1);
}
mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Helper function to sign our own app's token ---
const signAppToken = (user) => {
    const payload = { user: { id: user.id } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/*
 * =========================================
 * AUTHENTICATION ROUTES
 * =========================================
 */

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
    // ... no changes to this route ...
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: `User ${name} created successfully!` });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error during signup." });
    }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    // ... no changes to this route ...
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password) { // Check if user exists and has a password
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const token = signAppToken(user);
        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

// --- NEW GOOGLE AUTH ROUTE ---
app.post('/api/auth/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });
        const { name, email, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        // If user exists, log them in. If not, create a new user account.
        if (user) {
            user.googleId = googleId; // Link googleId if they exist
            await user.save();
        } else {
            user = new User({
                name,
                email,
                googleId,
                // No password needed for Google sign-in
            });
            await user.save();
        }

        // Sign and return our application's own JWT
        const token = signAppToken(user);
        res.status(200).json({ message: "Google sign-in successful!", token });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(400).json({ message: "Google authentication failed." });
    }
});


/*
 * =========================================
 * USER DATA ROUTES (Placeholder)
 * =========================================
 */
app.get('/api/dashboard/data', (req, res) => {
    // ... no changes here ...
});

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

