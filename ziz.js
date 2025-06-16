const AdmZip = require('adm-zip');

// Inisialisasi ZIP
const zip = new AdmZip("UAS.zip");

// Ekstrak ke folder tujuan
zip.extractAllTo("UAS", true); // Akan membuat folder 'UAS' jika belum ada

console.log("File berhasil diekstrak ke folder UAS");
