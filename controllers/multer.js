const multer = require("multer");
const sanitize = require("sanitize-filename");

// Source : https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

const MIME = {
    "image/png": ".png",
    "image/gif": ".gif",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, sanitize(file.fieldname) + "-" + Date.now() + MIME[file.mimetype]);
    }
})

module.exports = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (MIME[file.mimetype]) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
}).single("image");