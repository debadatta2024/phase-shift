import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UploadCloudIcon, FileTextIcon } from '../components/Icons.jsx';

// --- Mock Data ---
// In a real app, this data would be fetched from your server.
const userHistory = {
    "TSH": [
        { date: "Jan 2024", value: 4.8 },
        { date: "Apr 2024", value: 4.2 },
        { date: "Jul 2024", value: 3.5 },
        { date: "Oct 2024", value: 2.9 },
        { date: "Jan 2025", value: 2.5 },
    ],
    "Hemoglobin": [
        { date: "Jan 2024", value: 11.5 },
        { date: "Jul 2024", value: 12.1 },
        { date: "Jan 2025", value: 11.9 },
    ]
};

const userReports = [
    { id: 1, name: "Full_Panel_Jan2025.pdf", date: "January 28, 2025" },
    { id: 2, name: "Lipid_Profile_Oct2024.pdf", date: "October 15, 2024" },
    { id: 3, name: "CBC_Report_Jul2024.pdf", date: "July 05, 2024" },
];

// --- Sub-components for the Dashboard ---

const StatCard = ({ title, value, unit, trend }) => {
    const trendColor = trend.startsWith('+') ? 'text-red-500' : 'text-emerald-500';
    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
            <div className="flex items-baseline space-x-2 mt-2">
                <p className="text-3xl font-bold text-slate-800">{value}</p>
                <span className="text-slate-600 font-medium">{unit}</span>
            </div>
            <p className={`text-sm font-semibold mt-1 ${trendColor}`}>{trend}</p>
        </div>
    );
};

const HistoryChart = ({ data, dataKey, name, color }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/60 h-80">
             <h3 className="text-lg font-semibold text-slate-800 mb-4">{name} Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.75rem'
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- Main Dashboard Page Component ---

const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-green-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">Welcome back, User!</h1>
                    <button className="flex items-center space-x-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                        <UploadCloudIcon className="h-5 w-5"/>
                        <span>Upload New Report</span>
                    </button>
                </div>
                
                {/* Stat Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Latest TSH Level" value="2.5" unit="μIU/mL" trend="-0.4 from last test" />
                    <StatCard title="Latest Hemoglobin" value="11.9" unit="g/dL" trend="-0.2 from last test" />
                    <StatCard title="Reports Stored" value={userReports.length} unit="Files" trend="+1 this month" />
                </div>
                
                {/* Chart Section */}
                <div className="mb-8">
                    <HistoryChart data={userHistory.TSH} dataKey="value" name="TSH Level" color="#0d9488" />
                </div>

                {/* Reports List Section */}
                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Reports</h2>
                    <div className="space-y-4">
                        {userReports.map(report => (
                            <div key={report.id} className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md hover:border-teal-300 transition-all">
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
                        ))}
                    </div>
                </div>
            </div>
            {/* Developer Note: This component requires the 'recharts' library. Install it with 'npm install recharts' */}
        </div>
    );
}

export default DashboardPage;
