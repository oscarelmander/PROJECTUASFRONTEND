const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5001',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/registerPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'register.html')); 
});


app.get('/profilePage', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'profile.html')); 
});

app.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'login.html')); 
});

app.get('/adminPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'admin.html')); 
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'index.html')); 
});

app.get('/artikel2', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel2.html')); 
});

app.get('/artikel3', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel3.html')); 
});

app.get('/artikel4', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel4.html')); 
});

app.get('/artikel5', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel5.html')); 
});

app.get('/artikel6', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel6.html')); 
});

app.get('/artikel7', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel7.html')); 
});

app.get('/artikel8', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel8.html')); 
});

app.get('/artikel9', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel9.html')); 
});

app.get('/artikel1', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/pages', 'artikel1.html')); 
});

const PORT = 5001;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));

