import express from 'express';
import usersRoutes from './routes/users.js';
import publicationsRoutes from './routes/publications.js';
import connectDatabase from '../src/database/db.js';

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
await connectDatabase().then(() => console.log('Conectado ao banco de dados.'));
