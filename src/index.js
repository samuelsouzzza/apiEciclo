const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});

//USUÁRIOS
const users = [
  {
    id: 0,
    name: 'Samuel',
    surname: 'Souza',
    cpf: '52928508880',
    email: 'rssamuel17@gmail.com',
    cell: '13996976851',
    password: 'sF44sribes#',
  },
  {
    id: 1,
    name: 'Fernanda',
    surname: 'Lima',
    cpf: '12345678900',
    email: 'fenandinha@gmail.com',
    cell: '11997986234',
    password: 'f44souZa#s',
  },
];
// ----------------------------------------------
function checkUser(req, res, next) {
  if (
    !req.body.name ||
    !req.body.surname ||
    !req.body.cpf ||
    !req.body.email ||
    !req.body.cell
  ) {
    res.status(400).json({
      message:
        'Algum(ns) campo(s) obrigatório(s) no cadastro do usuário está(am) vazio(s)!',
    });
  }
  return next();
}
// ----------------------------------------------
app.get('/users', (req, res) => {
  return res.json(users);
});
// ----------------------------------------------
app.post('/users', checkUser, (req, res) => {
  const { name, surname, cpf, email, cell, password } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    surname,
    cpf,
    email,
    cell,
    password,
  };
  users.push(newUser);
  return res.json({ status: 201, message: 'Usuário criado com sucesso!' });
});
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
app.put('./users/update/:id', checkUser, (req, res) => {
  const { id } = req.params;
  users[id].id = id;
  users[id].name = req.body.name;
  users[id].surname = req.body.surname;
  users[id].cpf = req.body.cpf;
  users[id].email = req.body.email;
  users[id].cell = req.body.cell;
  users[id].password = req.body.password;
  return res.json({ message: 'Informações atualizadas com sucesso!' });
});
