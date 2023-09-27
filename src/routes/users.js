const express = require('express');
const multer = require('multer');

const storageUserProfiles = multer.diskStorage({
  destination: 'uploads/profiles',
  filename: function (req, file, cb) {
    cb(null, `user-${users.length + 1}_${Date.now()}${file.originalname}`);
  },
});

const uploadProfiles = multer({ storage: storageUserProfiles });
const usersRoutes = express.Router();

const users = [];

usersRoutes.get('/users', (req, res) => {
  return res.json(users);
});
// ----------------------------------------------
usersRoutes.post('/users', uploadProfiles.single('profilePic'), (req, res) => {
  const newUser = JSON.parse(req.body.user);
  newUser.id = users.length + 1;

  const profilePicPath = req.file
    ? req.file.path.replace(/\\/g, '/').replaceAll(' ', '')
    : null;
  newUser.profile_path = profilePicPath;
  newUser.access = 'default';

  users.push(newUser);
  return res.json({ status: 201, message: 'Usuário criado com sucesso!' });
});
// ----------------------------------------------
usersRoutes.get('/users/:id', (req, res) => {
  return res.json(users[req.params.id]);
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

module.exports = usersRoutes;
