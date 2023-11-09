import express from 'express';
import connectDatabase from './database/db.js';
import routes from './routes.js';

const app = express();
const PORT = 3000;
const PORTDB = 8000;

// CORS;
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.set('json escape', true);
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));

connectDatabase()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((error) => console.log(error));
