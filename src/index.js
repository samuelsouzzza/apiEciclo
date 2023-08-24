const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => console.log(`Servidor aberto na porta ${PORT}`));

app.get('/', (req, res) => {
  res.send('API do projeto E-Ciclo');
});
