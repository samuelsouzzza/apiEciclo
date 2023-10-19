const express = require('express');
const multer = require('multer');
const fs = require('fs');
const extensionFix = require('../utils/extensionFix.js');

const publications = [];

let publicationId = publications.length + 1;

const storagePublicationsImgs = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = `uploads/publications/pub${publicationId}`;

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: async (req, file, cb) => {
    try {
      const filename = `pub_${publicationId}.${extensionFix(
        file.originalname
      )}`;
      cb(null, filename);
      publicationId++;
    } catch (error) {
      cb(error);
    }
  },
});

const uploadImgs = multer({ storage: storagePublicationsImgs });
const publicationsRoutes = express.Router();

publicationsRoutes.get('/publications', (req, res) => {
  return res.json(publications);
});
// ----------------------------------------------
publicationsRoutes.post(
  '/publications',
  uploadImgs.array('publication_photos', 5),
  (req, res) => {
    const newPublication = JSON.parse(req.body.publication);
    newPublication.id = publications.length + 1;
    newPublication.status = {
      was_received: false,
      was_delivered: false,
    };

    const now = new Date();
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, '0');
    const d = now.getDate().toString().padStart(2, '0');

    newPublication.opening_date = `${y}-${m}-${d}`;
    newPublication.closing_date = null;

    const photoPaths = req.files.map((file) =>
      file.path.replace(/\\/g, '/').replaceAll(' ', '')
    );
    newPublication.photos_paths = photoPaths;

    publications.push(newPublication);
    return res.json({ status: 201, message: 'Publicação criada com sucesso!' });
  }
);

module.exports = publicationsRoutes;
