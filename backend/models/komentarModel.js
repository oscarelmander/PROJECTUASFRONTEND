const mongoose = require('mongoose');

const KomentarSchema = new mongoose.Schema({
    nomorArtikel: { type: String, required: true }, 
    isiKomentar: { type: String, required: true }, 
    timestamp: { type: Date, default: Date.now }, 
    penulis: { type: String, required: true },
});

module.exports = mongoose.model('Komentar', KomentarSchema);
