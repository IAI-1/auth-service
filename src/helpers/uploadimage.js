import multer from "multer";

// Membuat konfigurasi diskStorage multer
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname
      );
    },
  });
  
  // Middleware multer untuk menangani pengunggahan file gambar
  export const upload = multer({ storage: diskStorage });