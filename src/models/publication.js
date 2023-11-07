import mongoose, { isValidObjectId } from 'mongoose';

// schema para a publicação
const publicationSchema = new mongoose.Schema({    
        description: String,
        category: String,
        status: Number,
        photos: [String],
        ponto: {
            name: String,
            endereco: String,
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ponto' // Referência para o modelo de Ponto
              }
        },
        criacao: { type: Date, default: new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }) },
        user: {
            complete_name: String,
            cpf: String,
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario' // Referência para o modelo de Usuario
              }
        }
    }, { collection: 'publications' }
);

const Publication = mongoose.model('insertPublication', publicationSchema);

export default Publication;
