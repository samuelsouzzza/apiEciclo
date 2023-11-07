import { Router } from 'express';
import {
  getUsers,
  createUser,
  deleteUser,
} from './controllers/UserController.js';
import {
  insertPublication,
  getPublications,
  getOnePublication,
  updatePublication,
  deletePublication,
} from './controllers/PublicationController.js';
import { createPonto, getPonto } from './controllers/PontoController.js';

const routes = Router();

routes.get('/users', getUsers);
routes.post('/users', createUser);
routes.delete('/users/:id', deleteUser);
routes.post('/users/:idUser/publications/:pontoId', insertPublication);
routes.get('/publications', getPublications);
routes.get('/publications/:publicationId', getOnePublication);
routes.post('/publications/:publicationId/:idUser', updatePublication);
routes.delete('/publications/:publicationId', deletePublication);
routes.post('/ponto', createPonto);
routes.get('/ponto', getPonto);

export default routes;
