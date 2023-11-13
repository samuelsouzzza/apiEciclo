import express from 'express';
import multer from 'multer';
import extensionFix from '../utils/extensionFix.js';
import UserModel from '../models/UserModel.js';

const storageUserProfiles = multer.diskStorage({
  destination: 'uploads/profiles',
  filename: (req, file, cb) => {
    cb(
      null,
      `user_${Math.round(Math.random())}.${extensionFix(file.originalname)}`
    );
  },
});

const uploadProfiles = multer({ storage: storageUserProfiles });
const usersRoutes = express.Router();

const users = [];

usersRoutes.get('/users', async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.json(allUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});
// ----------------------------------------------
usersRoutes.post('/users', uploadProfiles.single('profilePic'), (req, res) => {
  const newUser = JSON.parse(req.body.user);

  const profilePicPath = req.file
    ? req.file.path.replace(/\\/g, '/').replaceAll(' ', '')
    : null;
  newUser.profile_path = profilePicPath;
  newUser.access = 'default';
  newUser.publication = [];

  UserModel.create(newUser);
  return res.json({ status: 201, message: 'Usuário criado com sucesso!' });
});
// ----------------------------------------------
usersRoutes.post('/userLogin', async (req, res) => {
  const { email, password } = req.body;

  const userExists = await UserModel.findOne({ email, password });

  if (userExists) return res.status(201).json(userExists);

  return res.json({
    status: 404,
    message: 'Não foi possível acessar essa conta!',
  });
});
// ----------------------------------------------
usersRoutes.delete('/users/delete/:id', (req, res) => {
  users.splice(req.params.id, 1);
  return res.json({ message: 'Usuário deletado com sucesso!' });
});
// ----------------------------------------------
usersRoutes.put('./users/update/:id', (req, res) => {
  return res.json({ message: 'Informações atualizadas com sucesso!' });
});

export default usersRoutes;
