import React, { useState, useEffect } from 'react';

// --- SVG Icon Components ---
const UploadCloudIcon = ({ className = "h-10 w-10 text-slate-500" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const FileTextIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const BotIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z"/>
      <path d="M12 3v.01"/>
      <path d="M21 12h-.01"/>
      <path d="M3 12h.01"/>
      <path d="M12 21v-.01"/>
    </svg>
);

const StatusIcon = ({ status }) => {
    switch (status) {
        case 'low':
            return <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>;
        case 'high':
            return <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>;
        default:
            return <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>;
    }
}

const LogOutIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);


// --- Header Component ---
const Header = ({ navigateTo, isLoggedIn, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div onClick={() => navigateTo('home')} className="flex items-center space-x-3 cursor-pointer">
                         <SparklesIcon className="h-8 w-8 text-teal-600" />
                        <span className="text-2xl font-bold text-slate-800">Jeevan Jyothi</span>
                    </div>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {!isLoggedIn ? (
                          <>
                            <a href="#simplifier" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Simplifier</a>
                            <a href="#how-it-works" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">How It Works</a>
                            <a href="#features" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Features</a>
                            <button onClick={() => navigateTo('login')} className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105">
                                Login / Sign Up
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => navigateTo('dashboard')} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Dashboard</button>
                            <button onClick={onLogout} className="bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-600 transition-all duration-300 transform hover:scale-105">
                                Logout
                            </button>
                          </>
                        )}
                    </nav>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur-lg pb-4">
                     <nav className="flex flex-col items-center space-y-4 pt-2">
                        {!isLoggedIn ? (
                          <>
                            <a href="#simplifier" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Simplifier</a>
                            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">How It Works</a>
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Features</a>
                            <button onClick={() => { navigateTo('login'); setIsMenuOpen(false); }} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors w-1/2">
                                Login / Sign Up
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { navigateTo('dashboard'); setIsMenuOpen(false); }} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Dashboard</button>
                            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="bg-rose-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-rose-600 transition-colors w-1/2">
                                Logout
                            </button>
                          </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

// --- Hero Section Component ---
const Hero = () => {
    return (
        <section className="relative py-20 md:py-32 bg-green-50/50 overflow-hidden">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-tr from-teal-200 to-green-200 opacity-40 blur-3xl"></div>
            </div>
             <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
                <div className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-bl from-cyan-200 to-green-100 opacity-50 blur-3xl"></div>
            </div>
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    Understand Your Medical Reports. <br className="hidden md:inline" />
                    <span className="text-teal-600">Finally, in plain English.</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                    Tired of confusing medical jargon? Our AI-powered tool translates complex lab reports into simple, easy-to-understand explanations. Upload your report and get clarity in seconds.
                </p>
                <div className="mt-10">
                    <a href="#simplifier" className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg hover:shadow-teal-300">
                        Simplify Your Report Now
                    </a>
                </div>
            </div>
        </section>
    );
};

// --- Main Simplifier Tool Component ---
const Simplifier = () => {
    const [inputType, setInputType] = useState('text');
    const [reportText, setReportText] = useState('');
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "application/pdf") {
                setFileName(file.name);
                setError('');
            } else {
                setError("Please upload a valid PDF file.");
                setFileName('');
            }
        }
    };
    
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setFileName(file.name);
            setError('');
        } else {
            setError("Please drop a valid PDF file.");
            setFileName('');
        }
    }

    const handleSimplify = () => {
        if (inputType === 'text' && !reportText.trim()) {
            setError('Please paste your report text before simplifying.');
            return;
        }
        if (inputType === 'file' && !fileName) {
            setError('Please select a file before simplifying.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);

        setTimeout(() => {
            setResult({
                summary: "This is a sample Complete Blood Count (CBC) report. Overall, most of your values are within the normal range, but there are a few points to note.",
                keyFindings: [
                    {
                        test: "Hemoglobin (HGB)",
                        value: "11.2 g/dL",
                        normalRange: "12.0 - 16.0 g/dL",
                        interpretation: "Your hemoglobin is slightly low.",
                        implication: "This could be a sign of anemia, which can cause fatigue or weakness. It means your blood has fewer red blood cells than normal to carry oxygen.",
                        status: "low"
                    },
                    {
                        test: "White Blood Cell Count (WBC)",
                        value: "7.5 x 10^9/L",
                        normalRange: "4.5 - 11.0 x 10^9/L",
                        interpretation: "Your white blood cell count is normal.",
                        implication: "This is a good sign that your body isn't actively fighting a major infection.",
                        status: "normal"
                    },
                    {
                        test: "Platelet Count (PLT)",
                        value: "350 x 10^9/L",
                        normalRange: "150 - 450 x 10^9/L",
                        interpretation: "Your platelet count is normal.",
                        implication: "This suggests your blood's clotting ability is fine.",
                        status: "normal"
                    }
                ],
                disclaimer: "This is an AI-generated summary and not a substitute for professional medical advice. Please consult your doctor to discuss your results."
            });
            setIsLoading(false);
        }, 2000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'low': return 'bg-amber-100 text-amber-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-emerald-100 text-emerald-800';
        }
    }
    
    const getStatusBorderColor = (status) => {
        switch (status) {
            case 'low': return 'border-amber-400';
            case 'high': return 'border-red-400';
            default: return 'border-emerald-400';
        }
    }


    return (
        <section id="simplifier" className="py-24 bg-green-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Input Section */}
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50 animate-fade-in transition-all duration-300 hover:shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Submit Your Report</h2>
                            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                                <button
                                    onClick={() => setInputType('text')}
                                    className={`w-1/2 py-2 text-center rounded-md font-semibold transition-all duration-300 ${inputType === 'text' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}>
                                    Paste Text
                                </button>
                                <button
                                    onClick={() => setInputType('file')}
                                    className={`w-1/2 py-2 text-center rounded-md font-semibold transition-all duration-300 ${inputType === 'file' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}>
                                    Upload File
                                </button>
                            </div>

                            {inputType === 'text' ? (
                                <textarea
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)}
                                    className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white/80"
                                    placeholder="Paste your medical report text here..."
                                ></textarea>
                            ) : (
                                <div 
                                    className="relative w-full h-64 border-2 border-dashed border-slate-300 rounded-lg flex flex-col justify-center items-center text-center p-4 hover:border-teal-500 bg-slate-100/50 transition-colors"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <UploadCloudIcon />
                                    <p className="mt-2 text-slate-600">
                                      <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-slate-500">PDF files only</p>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {fileName && (
                                      <div className="mt-4 flex items-center bg-teal-50 text-teal-700 px-3 py-2 rounded-lg text-sm">
                                          <FileTextIcon className="h-5 w-5 mr-2"/>
                                          <span className="font-medium">{fileName}</span>
                                      </div>
                                    )}
                                </div>
                            )}
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <button onClick={handleSimplify} className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 disabled:bg-teal-300 transform hover:scale-105 shadow-md hover:shadow-lg" disabled={isLoading}>
                                {isLoading ? 'Simplifying...' : 'Simplify Report'}
                            </button>
                        </div>

                        {/* Output Section */}
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50 animate-fade-in-slow transition-all duration-300 hover:shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Simplified Results</h2>
                            <div className="w-full h-[25rem] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                               {isLoading && (
                                   <div className="flex justify-center items-center h-full">
                                       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
                                   </div>
                               )}
                               {!isLoading && !result && (
                                   <div className="flex flex-col justify-center items-center h-full text-center text-slate-500">
                                      <BotIcon className="h-12 w-12 mb-4"/>
                                      <p>Your easy-to-read report summary will appear here.</p>
                                   </div>
                               )}
                               {result && (
                                    <div className="animate-fade-in">
                                        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg shadow-inner-soft">
                                            <h3 className="font-bold text-teal-900">Overall Summary</h3>
                                            <p className="text-teal-800 mt-1">{result.summary}</p>
                                        </div>

                                        <h3 className="font-bold text-slate-800 mt-6 mb-3">Key Findings</h3>
                                        {result.keyFindings.map((finding, index) => (
                                          <div key={index} className={`border-l-4 p-4 mb-3 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 ${getStatusBorderColor(finding.status)}`}>
                                              <div className="flex justify-between items-start">
                                                  <div>
                                                      <p className="font-semibold text-slate-800">{finding.test}</p>
                                                      <p className="text-slate-500 text-sm">Your result: <span className="font-bold text-slate-700">{finding.value}</span> | Normal: {finding.normalRange}</p>
                                                  </div>
                                                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center space-x-1.5 ${getStatusColor(finding.status)}`}>
                                                    <StatusIcon status={finding.status} />
                                                    <span>{finding.status.charAt(0).toUpperCase() + finding.status.slice(1)}</span>
                                                  </span>
                                              </div>
                                              <div className="mt-3 pt-3 border-t border-slate-200/80">
                                                  <p className="text-sm text-slate-700"><strong className="font-semibold text-slate-800">What this means:</strong> {finding.interpretation}</p>
                                                  <p className="text-sm text-slate-700 mt-1"><strong className="font-semibold text-slate-800">Why it matters:</strong> {finding.implication}</p>
                                              </div>
                                          </div>
                                        ))}

                                        <div className="mt-6 text-xs text-slate-500 bg-slate-100 p-3 rounded-lg">
                                            <strong>Disclaimer:</strong> {result.disclaimer}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- "How It Works" Section Component ---
const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSJyZ2JhKDQ1LDIxMiwxOTEsMC4wNSkiIGQ9Ik0xNiAwIEwxNiAzMiBNMCwxNiBMMzIsMTYiPjwvcGF0aD48L3N2Zz4=')]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How It Works in 3 Simple Steps</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Getting clarity on your health has never been easier.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto text-3xl font-bold ring-8 ring-white">1</div>
            <h3 className="mt-6 text-xl font-semibold text-slate-800">Upload or Paste</h3>
            <p className="mt-2 text-slate-600">Securely upload your report PDF or simply paste the text content into the tool.</p>
          </div>
          <div className="text-center p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in" style={{animationDelay: '150ms'}}>
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto text-3xl font-bold ring-8 ring-white">2</div>
            <h3 className="mt-6 text-xl font-semibold text-slate-800">AI Analysis</h3>
            <p className="mt-2 text-slate-600">Our advanced AI reads and analyzes the complex medical terms, values, and ranges.</p>
          </div>
          <div className="text-center p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in" style={{animationDelay: '300ms'}}>
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto text-3xl font-bold ring-8 ring-white">3</div>
            <h3 className="mt-6 text-xl font-semibold text-slate-800">Get Simple Explanations</h3>
            <p className="mt-2 text-slate-600">Receive a clear, color-coded summary that explains what each result means for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Features Section Component ---
const Features = () => {
  return (
    <section id="features" className="py-24 bg-green-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Powerful Features for Your Peace of Mind</h2>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-slate-200/50 transition-all duration-300 hover:shadow-lg hover:border-teal-200 animate-fade-in">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Easy to Understand</h3>
              <p className="mt-1 text-slate-600">We translate jargon into simple language, using analogies and clear explanations to help you understand your health.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-slate-200/50 transition-all duration-300 hover:shadow-lg hover:border-blue-200 animate-fade-in" style={{animationDelay: '150ms'}}>
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3c4.526 0 8.35-2.91 9.618-7.016z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Secure & Private</h3>
              <p className="mt-1 text-slate-600">Your privacy is our priority. Your reports are not stored, and all data is processed securely.</p>
            </div>
          </div>
           <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-slate-200/50 transition-all duration-300 hover:shadow-lg hover:border-violet-200 animate-fade-in" style={{animationDelay: '300ms'}}>
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Instant Results</h3>
              <p className="mt-1 text-slate-600">No more waiting. Get your simplified report in seconds, anytime you need it.</p>
            </div>
          </div>
           <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-slate-200/50 transition-all duration-300 hover:shadow-lg hover:border-amber-200 animate-fade-in" style={{animationDelay: '450ms'}}>
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Supports Multiple Reports</h3>
              <p className="mt-1 text-slate-600">Works with a wide range of common lab reports, including blood tests, lipid profiles, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer Component ---
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

// --- HomePage Wrapper Component ---
const HomePage = () => (
    <>
      <Hero />
      <Simplifier />
      <HowItWorks />
      <Features />
    </>
);

// --- NEW: Login Page Component ---
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

// --- NEW: Dashboard Page Component ---
const DashboardPage = () => {
    // Mock data for user's reports
    const reports = [
        { id: 1, name: "CBC_Report_Sept2025.pdf", date: "September 18, 2025" },
        { id: 2, name: "Lipid_Profile_June2025.pdf", date: "June 12, 2025" },
        { id: 3, name: "Thyroid_Test_Jan2025.pdf", date: "January 05, 2025" },
    ];
    
    return (
        <div className="min-h-screen bg-green-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Welcome to your Dashboard</h1>
                    <button className="flex items-center space-x-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                        <UploadCloudIcon className="h-5 w-5"/>
                        <span>Upload New Report</span>
                    </button>
                </div>

                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Reports</h2>
                    <div className="space-y-4">
                        {reports.length > 0 ? (
                            reports.map(report => (
                                <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md hover:border-teal-300 transition-all">
                                    <div className="flex items-center space-x-4">
                                        <FileTextIcon className="h-6 w-6 text-teal-600" />
                                        <div>
                                            <p className="font-medium text-slate-800">{report.name}</p>
                                            <p className="text-sm text-slate-500">Uploaded on {report.date}</p>
                                        </div>
                                    </div>
                                    <button className="bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold border border-teal-200 hover:bg-teal-50 transition-colors">
                                        View Simplified Report
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <p>You haven't uploaded any reports yet.</p>
                                <p>Click "Upload New Report" to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main App Component ---
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
      {currentPage === 'home' && <Footer />}
    </div>
  )
}

