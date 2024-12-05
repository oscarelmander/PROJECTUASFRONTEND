const express = require('express');
const router = express.Router();
const Komentar = require('../models/komentarModel');

router.post('/add', async (req, res) => {
    try {
        const { nomorArtikel, isiKomentar, penulis } = req.body;

        // const lastComment = await Komentar.findOne({ nomorArtikel })
        //     .sort({ timestamp: -1 }) 
        //     .select('penulis'); 

        // let penulis = 'User 1';
        // if (lastComment) {
        //     const lastUserNumber = parseInt(lastComment.penulis.split(' ')[1]); 
        //     penulis = `User ${lastUserNumber + 1}`;
        // }


        const newComment = new Komentar({
            nomorArtikel,
            isiKomentar,
            penulis,
        });

        await newComment.save();
        res.status(201).json({ message: 'Komentar berhasil ditambahkan', komentar: newComment });
    } catch (error) {
        res.status(500).json({ error: 'Gagal menambahkan komentar' });
    }
});

router.get('/:nomorArtikel', async (req, res) => {
    try {
        const { nomorArtikel } = req.params;
        const comments = await Komentar.find({ nomorArtikel }).sort({ timestamp: 1 }); 
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil komentar' });
    }
});

module.exports = router;
