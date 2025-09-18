import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { SparklesIcon, MailIcon, LockIcon, UserIcon } from '../components/Icons.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const LoginPage = ({ navigateTo, setIsLoggedIn }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential: credentialResponse.credential }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
            navigateTo('dashboard');
        } catch (err) {
            setError(err.message || 'Google sign-in failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const name = e.target.name ? e.target.name.value : null;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!isLoginView) {
            const confirmPassword = e.target['confirm-password'].value;
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                setLoading(false);
                return;
            }
        }
        
        const endpoint = isLoginView ? 'login' : 'signup';
        const body = isLoginView ? { email, password } : { name, email, password };
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (isLoginView) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
                navigateTo('dashboard');
            } else {
                setIsLoginView(true);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-green-50/50 p-4">
            <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md border border-slate-200/60">
                <div className="hidden md:flex flex-col justify-center items-center p-12 bg-teal-600 text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-white/10"></div>
                    <SparklesIcon className="h-16 w-16 mb-4 text-white" />
                    <h2 className="text-3xl font-bold text-center mb-2">Jeevan Jyothi</h2>
                    <p className="text-center text-teal-100">Your personal health record, simplified. Access your dashboard to track your progress.</p>
                </div>

                <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                        {isLoginView ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-slate-600 mb-6">
                        {isLoginView ? 'Sign in to access your dashboard.' : 'Get started by creating a new account.'}
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLoginView && (
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input id="name" name="name" type="text" required placeholder="Full Name" className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" />
                            </div>
                        )}
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input id="email-address" name="email" type="email" autoComplete="email" required placeholder="Email Address" className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" />
                        </div>
                         <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" />
                        </div>
                        {!isLoginView && (
                             <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input id="confirm-password" name="confirm-password" type="password" required placeholder="Confirm Password" className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" />
                            </div>
                        )}

                        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
                        
                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105 disabled:bg-teal-300">
                                {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white/0 backdrop-blur-sm text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                           <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap
                            />
                        </div>
                    </div>

                    <p className="mt-8 text-sm text-center text-slate-600">
                        {isLoginView ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-semibold text-teal-600 hover:text-teal-500">
                            {isLoginView ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;