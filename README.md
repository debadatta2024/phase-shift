# Jeevan Jyothi - AI Medical Report Simplifier 🩺

Jeevan Jyothi ("Light of Life") is a web application designed to demystify complex medical lab reports for the average person. Users can sign up, paste the text from their medical reports (like a Complete Blood Count or Lipid Profile), and receive a simple, color-coded explanation of what each value means in plain English.

This project was built from the ground up, featuring a secure backend with user authentication and a dynamic, responsive frontend built with React.

**Live Demo:** `[https://phase-shift-six.vercel.app/]`

---

## ✨ Features

* **Secure User Authentication:**
    * Standard email and password signup.
    * Seamless "Sign in with Google" (OAuth 2.0).
* **Complete User & Profile Management:**
    * Users can view and update their name.
    * Users who signed up with a password can change it.
    * Users who signed up with Google can **create a password** to enable email/password login.
    * Users who signed up with email can **connect their Google account** for future one-click logins.
* **AI-Powered Report Analysis:**
    * Integrates with a task-specific **Biomedical Named Entity Recognition (NER) model** from Hugging Face to intelligently extract medical terms and values.
    * Uses a robust rule-based engine to provide safe, accurate, and simple explanations for the extracted data.
* **User Dashboard:**
    * A central hub for users to manage their profiles and reports.
    * Users can submit new reports for analysis.
    * Analyzed reports are saved to the user's account in the database.
* **Modern & Responsive UI:**
    * Built with Tailwind CSS for a clean, professional, and mobile-friendly experience.
    * Features a beautiful, data-rich dashboard with charts and statistics (mock data for now).

---

## 🛠️ Technology Stack

* **Frontend:**
    * **React** (with Vite)
    * **Tailwind CSS**
    * **@react-oauth/google** for Google Sign-In
* **Backend:**
    * **Node.js** & **Express**
    * **MongoDB** with **Mongoose** for database management
    * **JSON Web Tokens (JWT)** for secure session management
    * **bcrypt.js** for password hashing
    * **Hugging Face Inference API** for AI-powered text analysis
* **Deployment:**
    * **Vercel** (for both frontend and serverless backend functions)

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine for development and testing.

### Prerequisites

* Node.js (v18 or newer recommended)
* npm
* A MongoDB Atlas account (or a local MongoDB instance)
