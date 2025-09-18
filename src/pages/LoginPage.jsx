import React, { useState } from 'react';

const LoginPage = ({ navigateTo }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, any login/signup attempt succeeds and navigates to dashboard
        navigateTo('dashboard');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50/50 py-12 px-4 sm:px-6 lg:px-8">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSJyZ2JhKDQ1LDIxMiwxOTEsMC4wNSkiIGQ9Ik0xNiAwIEwxNiAzMiBNMCwxNiBMMzIsMTYiPjwvcGF0aD48L3N2Zz4=')]"></div>
            <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-slate-200/60 z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        {isLoginView ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {!isLoginView && (
                             <div>
                                <label htmlFor="name" className="sr-only">Full Name</label>
                                <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 ${isLoginView ? 'rounded-t-md' : ''} focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`} placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            {isLoginView ? 'Sign in' : 'Sign up'}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-teal-600 hover:text-teal-500">
                        {isLoginView ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;