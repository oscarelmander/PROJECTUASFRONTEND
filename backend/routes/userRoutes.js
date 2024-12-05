const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id, nama: user.name, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login berhasil', token, nama: user.name });
            // res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
router.put('/:id', async (req, res) => {
    try {
    
        const userId = req.params.id;
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: 'Error updating profile' });
    }
});


module.exports = router;
