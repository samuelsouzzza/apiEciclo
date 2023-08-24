const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});

//USUÁRIOS
const users = [
  {
    name: 'Samuel',
    surname: 'Souza',
    cpf: '52928508880',
    email: 'rssamuel17@gmail.com',
    cell: '13996976851',
    cell_secondary: null,
    birth: '2003-06-28',
    address: {
      street: 'Barra do Ribeira',
      number: 101,
      cep: '11900000',
      neighborhood: 'Jardim Valeri',
      city: 'Registro',
      state: 'sp',
    },
    password: 'sF44sribes#',
  },
];
// ----------------------------------------------
app.get('/users', (req, res) => {
  return res.json(users);
});
// ----------------------------------------------
app.post('/users', (req, res) => {
  const {
    name,
    surname,
    cpf,
    email,
    cell,
    cell_secondary,
    birth,
    address,
    password,
  } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    surname,
    cpf,
    email,
    cell,
    cell_secondary,
    birth,
    address: {
      street: address.street,
      number: address.number,
      cep: address.cep,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
    },
    password,
  };

  users.push(newUser);

  return res.json('Usuário criado com sucesso');
});
