import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "PASTE_YOUR_GOOGLE_CLIENT_ID_HERE";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Start on dashboard if already logged in
      setCurrentPage('dashboard'); 
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigateTo('home');
  };
  
  React.useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-slow { animation: fade-in 0.8s ease-out forwards; }
    `;
    
    document.head.appendChild(fontLink);
    document.head.appendChild(styleTag);
  }, []);

  const renderPage = () => {
      switch(currentPage) {
          case 'login':
              return <LoginPage navigateTo={navigateTo} setIsLoggedIn={setIsLoggedIn} />;
          case 'dashboard':
              return <DashboardPage navigateTo={navigateTo} />; 
          case 'profile':
              return <ProfilePage />;
          case 'home':
          default:
              return <HomePage />;
      }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="bg-green-50 font-['Inter',_sans-serif] text-slate-700">
          <Header navigateTo={navigateTo} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <main>
            {renderPage()}
          </main>
          {currentPage === 'home' && <Footer />}
        </div>
    </GoogleOAuthProvider>
  );
}