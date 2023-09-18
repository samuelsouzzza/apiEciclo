const express = require('express');
const multer = require('multer');

const storagePublicationsImgs = multer.diskStorage({
  destination: 'uploads/publications',
  filename: function (req, file, cb) {
    cb(
      null,
      `pub-${publications.length + 1}_${Date.now()}${file.originalname}`
    );
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

    publications.push(newPublication);
    return res.json({ status: 201, message: 'Publicação criada com sucesso!' });
  }
);

module.exports = publicationsRoutes;
