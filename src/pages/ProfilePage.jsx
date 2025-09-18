import React, { useState, useEffect } from 'react';
import { UserIcon, LockIcon, MailIcon } from '../components/Icons.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const ProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [name, setName] = useState('');
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [hasPassword, setHasPassword] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view this page.');
                setLoading(false);
                return;
            }
            
            // --- NEW: AbortController for Timeout ---
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

            try {
                const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
                    headers: { 'x-auth-token': token },
                    signal: controller.signal // Pass the signal to the fetch request
                });

                // Clear the timeout if the request completes
                clearTimeout(timeoutId);

                if (!res.ok) {
                    let errorMsg = `An error occurred: ${res.statusText} (Status: ${res.status})`;
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await res.json();
                        errorMsg = errorData.message || errorMsg;
                    }
                    throw new Error(errorMsg);
                }

                const data = await res.json();
                setUser(data);
                setName(data.name);
                setHasPassword(data.hasPassword);
            } catch (err) {
                if (err.name === 'AbortError') {
                    setError("Request timed out. The server might be down or unresponsive.");
                } else {
                    setError(err.message);
                }
            } finally {
                // This block will now always execute
                clearTimeout(timeoutId);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleNameUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ name })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSuccess(data.message);
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            return setError('New passwords do not match.');
        }

        try {
            const token = localStorage.getItem('token');
            const body = { newPassword: passwords.newPassword };
            if (hasPassword) {
                body.currentPassword = passwords.currentPassword;
            }

            const res = await fetch(`${API_BASE_URL}/api/user/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            
            setSuccess(data.message);
            setHasPassword(true);
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Profile</h1>
                
                {error && !user.email && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg" role="alert">
                        <p className="font-bold">Could not load profile</p>
                        <p>{error}</p>
                    </div>
                )}

                {user.email && (
                    <>
                        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/60 mb-8">
                            <h2 className="text-xl font-semibold text-slate-700 mb-4">Account Details</h2>
                            <form onSubmit={handleNameUpdate} className="space-y-4">
                                <div className="relative">
                                     <MailIcon className="absolute left-3 top-1/2 -translate-y-1/y text-slate-400" />
                                     <input type="email" value={user.email} disabled className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-slate-100 cursor-not-allowed" />
                                </div>
                                 <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">Update Name</button>
                            </form>
                        </div>

                        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/60">
                             <h2 className="text-xl font-semibold text-slate-700 mb-4">
                                {hasPassword ? 'Change Password' : 'Create a Password'}
                             </h2>
                             <p className="text-sm text-slate-500 mb-4">
                                {hasPassword 
                                    ? 'Update your existing password.' 
                                    : 'You signed up with Google. Create a password below to enable standard email & password login.'}
                             </p>
                             <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                {hasPassword && (
                                    <div className="relative">
                                        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="password" placeholder="Current Password" value={passwords.currentPassword} onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})} required className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                                    </div>
                                )}
                                 <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="password" placeholder="New Password" value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} required className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="password" placeholder="Confirm New Password" value={passwords.confirmPassword} onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} required className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <button type="submit" className="w-full bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition">
                                    {hasPassword ? 'Update Password' : 'Create Password'}
                                </button>
                             </form>
                        </div>
                    </>
                )}
                
                {success && <p className="text-center text-emerald-500 mt-4 font-medium">{success}</p>}
                {error && user.email && <p className="text-center text-red-500 mt-4 font-medium">{error}</p>}
            </div>
        </div>
    );
};

export default ProfilePage;

