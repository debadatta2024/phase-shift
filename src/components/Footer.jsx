import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} Jeevan Jyothi. All Rights Reserved.</p>
                <p className="text-sm text-slate-400 mt-2">A tool for informational purposes only. Always consult a healthcare professional.</p>
            </div>
        </footer>
    );
};

export default Footer;