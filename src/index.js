const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const storageProfiles = multer.diskStorage({
  destination: 'uploads/profiles',
  filename: function (req, file, cb) {
    cb(null, `user-${users.length + 1}_${Date.now()}${file.originalname}`);
  },
});

const uploadProfiles = multer({ storage: storageProfiles });

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});

//USUÁRIOS
const users = [];
// ----------------------------------------------
// function checkUser(req, res, next) {
//   if (
//     !req.body.name ||
//     !req.body.surname ||
//     !req.body.cpf ||
//     !req.body.email ||
//     !req.body.cell ||
//     !req.body.password
//   ) {
//     res.status(400).json({
//       message:
//         'Algum(ns) campo(s) obrigatório(s) no cadastro do usuário está(am) vazio(s)!',
//     });
//   }
//   return next();
// }
// ----------------------------------------------
app.get('/users', (req, res) => {
  return res.json(users);
});
// ----------------------------------------------
app.post(
  '/users' /*, checkUser */,
  uploadProfiles.single('profilePic'),
  (req, res) => {
    const newUser = JSON.parse(req.body.user);
    newUser.id = users.length + 1;

    const profilePicPath = req.file ? req.file.path.replace(/\\/g, '/') : null;
    newUser.profile_path = profilePicPath;

    users.push(newUser);
    return res.json({ status: 201, message: 'Usuário criado com sucesso!' });
  }
);
// ----------------------------------------------
app.get('/users/:id', (req, res) => {
  return res.json(users[req.params.id]);
});
// ----------------------------------------------
app.delete('/users/delete/:id', (req, res) => {
  users.splice(req.params.id, 1);
  return res.json({ message: 'Usuário deletado com sucesso!' });
});
// ----------------------------------------------
app.put('./users/update/:id' /*, checkUser */, (req, res) => {
  // Lógica de atualização
  return res.json({ message: 'Informações atualizadas com sucesso!' });
});
