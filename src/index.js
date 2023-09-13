const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.js');
const publicationsRoutes = require('./routes/publications.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(publicationsRoutes);

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));
