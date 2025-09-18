import React from 'react';
import { UploadCloudIcon, FileTextIcon } from '../components/Icons.jsx';

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

export default DashboardPage;