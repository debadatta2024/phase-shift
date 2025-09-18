import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// --- User Model ---
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, sparse: true, unique: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const app = express();
const PORT = process.env.PORT || 3001;

// --- Database Connection ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1);
}
mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// --- DYNAMIC CORS CONFIGURATION FOR VERCEL ---
const allowedOrigins = [
    'http://localhost:5173' // Your local development URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow local development origin
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        // Dynamically allow any Vercel deployment URL (including previews)
        try {
            if (new URL(origin).hostname.endsWith('.vercel.app')) {
                return callback(null, true);
            }
        } catch (err) {
            // Malformed origin URL, deny.
        }

        callback(new Error('Not allowed by CORS'));
    }
}));

app.use(express.json());

// --- Helper function to sign our own app's token ---
const signAppToken = (user) => {
    const payload = { user: { id: user.id } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// --- API Routes ---
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the Jeevan Jyothi API server!' });
});

app.post('/api/auth/signup', async (req, res) => {
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

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password) {
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

app.post('/api/auth/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });
        const { name, email, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (user) {
            user.googleId = googleId;
            await user.save();
        } else {
            user = new User({
                name,
                email,
                googleId,
            });
            await user.save();
        }

        const token = signAppToken(user);
        res.status(200).json({ message: "Google sign-in successful!", token });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(400).json({ message: "Google authentication failed." });
    }
});

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for Vercel
export default app;
