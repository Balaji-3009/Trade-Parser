const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Trade = require('./models/trade');

// Create express app
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://mbalaji3009:root@cluster0.zytynrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { //Replace String
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// API endpoint to upload CSV
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;
    const trades = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const [baseCoin, quoteCoin] = row.Market.split('/');
            trades.push({
                utcTime: new Date(row.UTC_Time),
                operation: row.Operation,
                baseCoin,
                quoteCoin,
                amount: parseFloat(row['Buy/Sell Amount']),
                price: parseFloat(row.Price),
                market: row.Market
            });
        })
        .on('end', () => {
            Trade.insertMany(trades)
                .then(() => {
                    res.status(200).send('File successfully processed and data stored in the database.');
                })
                .catch((error) => {
                    res.status(500).send('Error storing data in the database: ' + error);
                });
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
