import mongoose from 'mongoose';
import UserModel from './UserModel.js';

// schema para a publicação
const publicationSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    collect_receipt: String,
    description: String,
    owner: {
      _id:{type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'},
      complete_name: String,
      cell: String,
      profile: String,
      cpf: String,
    },
    status: {
      opened: Boolean,
      was_received: Boolean,
      was_delivered: Boolean,
    },
    opening_date: String,
    closing_date: String,
    photos_paths: [String],
  },
  { collection: 'publications' }
);

// publicationSchema.add({ owner: UserModel });
const PublicationModel = mongoose.model('insertPublication', publicationSchema);


export default PublicationModel;
