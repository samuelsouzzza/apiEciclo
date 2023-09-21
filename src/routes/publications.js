const express = require('express');
const multer = require('multer');

const storagePublicationsImgs = multer.diskStorage({
  destination: 'uploads/publications',
  filename: async function (req, file, cb) {
    try {
      const filename = `pub-${publications.length + 1}_${Date.now()}${
        file.originalname
      }`;
      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

const uploadImgs = multer({ storage: storagePublicationsImgs });
const publicationsRoutes = express.Router();

const publications = [];

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
    newPublication.status = 1;

    newPublication.opening_date = new Date().toLocaleString('pt-br', {
      timeZoneName: 'short',
    });

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
