import { response } from 'express';
import User from '../models/UserModel.js';

async function getUsers(request, response) {
  const users = await User.find();
  if (users) return response.status(200).json(users);

  return response.status(404);
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const existsUser = await User.findOne({ email, password });
  console.log('kjdjefwkj');
  if (existsUser) return response.status(200).json(existsUser);

  return response.status(400).send({ message: 'dh' });
}

async function createUser(request, response) {
  const user = request.body;

  const newUser = await User.create(user);
  return response.status(201).json(newUser);
}

async function deleteUser(request, response) {
  const id = request.params.id;

  await User.findByIdAndDelete({ _id: id });

  return response.status(200).json({ response: 'User deleted' });
}

export { getUsers, loginUser, createUser, deleteUser };
