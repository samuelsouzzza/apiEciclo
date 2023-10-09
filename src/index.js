const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.js');
const publicationsRoutes = require('./routes/publications.js');
const extensionFix = require('./utils/extensionFix.js');

const app = express();
const PORT = 3000;

//CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(usersRoutes);
app.use(publicationsRoutes);

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));
