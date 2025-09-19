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

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const app = express();
const PORT = process.env.PORT || 3001;

// --- DYNAMIC CORS CONFIGURATION ---
const allowedOrigins = [ 'http://localhost:5173' ];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || new URL(origin).hostname.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

// --- Helper function to sign our own app's token ---
const signAppToken = (user) => {
    const payload = { user: { id: user.id } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// --- AUTHENTICATION MIDDLEWARE ---
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

// --- API Routes ---
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully.");

        app.get('/api', (req, res) => res.json({ message: 'API is running and connected to DB.' }));

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
                    return res.status(400).json({ message: "Invalid credentials. Try signing in with Google." });
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
                    user.googleId = user.googleId || googleId;
                    await user.save();
                } else {
                    user = new User({ name, email, googleId });
                    await user.save();
                }
                const token = signAppToken(user);
                res.status(200).json({ message: "Google sign-in successful!", token });
            } catch (error) {
                console.error("Google Auth Error:", error);
                res.status(400).json({ message: "Google authentication failed. Please try again." });
            }
        });

        app.get('/api/user/profile', authMiddleware, async (req, res) => {
            try {
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    hasPassword: !!user.password,
                    isGoogleConnected: !!user.googleId
                });
            } catch (error) {
                console.error("PROFILE GET ERROR:", error);
                res.status(500).json({ message: 'Server Error: Could not retrieve profile.'});
            }
        });

        app.put('/api/user/profile', authMiddleware, async (req, res) => {
           const { name } = req.body;
            try {
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                user.name = name || user.name;
                await user.save();
                res.json({ message: 'Profile updated successfully.' });
            } catch (error) {
                console.error("PROFILE UPDATE ERROR:", error);
                res.status(500).json({ message: 'Server Error: Could not update profile.'});
            }
        });
        
        app.put('/api/user/password', authMiddleware, async (req, res) => {
            const { currentPassword, newPassword } = req.body;
            try {
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                if (!user.password) {
                    if (!newPassword || newPassword.length < 6) {
                        return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
                    }
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(newPassword, salt);
                    await user.save();
                    return res.json({ message: 'Password created successfully.' });
                }
                if (!currentPassword) {
                    return res.status(400).json({ message: 'Current password is required.' });
                }
                const isMatch = await bcrypt.compare(currentPassword, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Incorrect current password.' });
                }
                if (!newPassword || newPassword.length < 6) {
                    return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
                }
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(newPassword, salt);
                await user.save();
                res.json({ message: 'Password updated successfully.' });
            } catch (error) {
                console.error("PASSWORD UPDATE ERROR:", error);
                res.status(500).send('Server Error');
            }
        });

        app.put('/api/user/connect-google', authMiddleware, async (req, res) => {
            try {
                const { credential } = req.body;
                const ticket = await client.verifyIdToken({
                    idToken: credential,
                    audience: process.env.VITE_GOOGLE_CLIENT_ID,
                });
                const { email, sub: googleId } = ticket.getPayload();

                const loggedInUser = await User.findById(req.user.id);
                
                if (loggedInUser.email !== email) {
                    return res.status(400).json({ message: "Google account email does not match your current account." });
                }
                
                const existingGoogleUser = await User.findOne({ googleId });
                if (existingGoogleUser && existingGoogleUser.id !== loggedInUser.id) {
                    return res.status(400).json({ message: "This Google account is already linked to another user." });
                }

                loggedInUser.googleId = googleId;
                await loggedInUser.save();

                res.json({ message: "Google account connected successfully." });

            } catch (error) {
                console.error("GOOGLE CONNECT ERROR:", error);
                res.status(500).json({ message: "Failed to connect Google account." });
            }
        });


        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ FAILED TO CONNECT TO MONGODB");
        console.error(error);
        process.exit(1);
    }
};

startServer();
export default app;