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

    const dateNow = new Date();
    newPublication.opening_date = `${dateNow
      .getDate()
      .toString()
      .padStart(2, 0)}/${dateNow
      .getMonth()
      .toString()
      .padStart(
        2,
        0
      )}/${dateNow.getFullYear()} - ${dateNow.getHours()}:${dateNow.getMinutes()}`;

    newPublication.closing_date = null;

    const photoPaths = req.files.map((file) => file.path.replace(/\\/g, '/'));
    newPublication.photos_paths = photoPaths;

    publications.push(newPublication);
    return res.json({ status: 201, message: 'Publicação criada com sucesso!' });
  }
);

module.exports = publicationsRoutes;
