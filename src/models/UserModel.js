import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
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

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
