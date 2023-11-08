import mongoose from 'mongoose';

// schema para o usuário, incluindo a array de publicação
const userSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    surname: String,
    cpf: String,
    email: String,
    cell: String,
    password: String,
    access: String,
    profile_path: String,
    publication: [],
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

export default User;
