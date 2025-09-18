const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the Jeevan Jyothi API server!' });
});


app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Signup attempt:', { name, email });
    // In a real app, you would add database logic here.
    res.status(201).json({ message: `User ${name} created successfully!` });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });
    // In a real app, you would add database logic here.
    res.status(200).json({ message: 'Login successful!', token: 'sample-jwt-token-for-testing' });
});

app.get('/api/dashboard/data', (req, res) => {
    console.log('Fetching dashboard data for a user...');
    // Sending back the same mock data as the frontend for now
     res.json({
        stats: {
            tsh: { value: 2.5, unit: "μIU/mL", trend: "-0.4 from last test" },
            hemoglobin: { value: 11.9, unit: "g/dL", trend: "-0.2 from last test" }
        },
        history: {
            "TSH": [
                { date: "Jan 2024", value: 4.8 },
                { date: "Jul 2024", value: 3.5 },
                { date: "Jan 2025", value: 2.5 },
            ]
        },
        reports: [
            { id: 1, name: "Full_Panel_Jan2025.pdf", date: "January 28, 2025" },
            { id: 2, name: "CBC_Report_Jul2024.pdf", date: "July 05, 2024" },
        ]
    });
});


// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('This is a placeholder server. Routes are set up but do not connect to a database yet.');
});
