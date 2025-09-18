import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'dashboard'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This effect ensures that when the page changes, the view scrolls to the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  // Navigation function
  const navigateTo = (page) => {
    if (page === 'dashboard') {
        setIsLoggedIn(true);
    }
    setCurrentPage(page);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('home');
  }

  // Effect for styling and fonts (runs once)
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in-slow {
            animation: fade-in 0.8s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        .shadow-inner-soft {
            box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
        }
    `;
    
    document.head.appendChild(fontLink);
    document.head.appendChild(styleTag);
  }, []);

  const renderPage = () => {
      switch(currentPage) {
          case 'login':
              return <LoginPage navigateTo={navigateTo} />;
          case 'dashboard':
              return <DashboardPage />;
          case 'home':
          default:
              return <HomePage />;
      }
  }

  return (
    <div className="bg-green-50 font-['Inter',_sans-serif] text-slate-700">
      <Header navigateTo={navigateTo} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        {renderPage()}
      </main>
      {/* Only show the Footer on the homepage */}
      {currentPage === 'home' && <Footer />}
    </div>
  )
}