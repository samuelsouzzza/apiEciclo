import express from 'express';
import multer from 'multer';
import fs from 'fs';
import extensionFix from '../utils/extensionFix.js';
import PublicationModel from '../models/PublicationModel.js';
import mongoose from 'mongoose';

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

publicationsRoutes.put(
  '/updatePublication/:idPublication',
  uploadImgs.array('publication_photos', 5),
  async (req, res) => {
    const { idPublication } = req.params;
    const updatingPublication = JSON.parse(req.body.updatingPublication);

    const photoPaths = req.files.map((file) =>
      file.path.replace(/\\/g, '/').replaceAll(' ', '')
    );
    updatingPublication.photos_paths = photoPaths;

    try {
      await PublicationModel.findByIdAndUpdate(
        idPublication,
        {
          $set: {
            title: updatingPublication.title,
            category: updatingPublication.category,
            collect_receipt: updatingPublication.collect_receipt,
            description: updatingPublication.description,
            photos_paths: updatingPublication.photos_paths,
          },
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ status: 202, message: 'Publicação atualizada com sucesso!' });
    } catch {
      return res.json({
        status: 505,
        message: 'Não foi possível atualizar a publicação pelo servidor!',
      });
    }
  }
);

publicationsRoutes.delete(
  '/deletePublication/:idPublication',
  async (req, res) => {
    const { idPublication } = req.params;

    try {
      await PublicationModel.deleteOne({ _id: idPublication });
      return res
        .status(202)
        .json({ status: 202, message: 'Publicação excluída com sucesso!' });
    } catch {
      return res.status(404).json({
        status: 404,
        message: 'Não foi possível excluir a publicação!',
      });
    }
  }
);

publicationsRoutes.get('/myPublications/:userCpf/:status', async (req, res) => {
  const { userCpf, status } = req.params;

  try {
    const allPublications = await PublicationModel.find({
      'owner.cpf': `${userCpf}`,
      'status.opened': `${status}`,
    });
    return res.json(allPublications);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

publicationsRoutes.get('/feedPublications/:userCpf', async (req, res) => {
  const { userCpf } = req.params;

  try {
    const allPublications = await PublicationModel.find({
      'owner.cpf': { $ne: `${userCpf}` },
    });
    return res.json(allPublications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});
// ----------------------------------------------
publicationsRoutes.post(
  '/publications',
  uploadImgs.array('publication_photos', 5),
  (req, res) => {
    const newPublication = JSON.parse(req.body.publication);
    // newPublication.id = publications.length + 1;
    newPublication.status = {
      opened: true,
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

    // publications.push(newPublication);
    PublicationModel.create(newPublication);
    return res.json({ status: 201, message: 'Publicação criada com sucesso!' });
  }
);

export default publicationsRoutes;
