import mongoose from 'mongoose';

// schema para o usuário, incluindo a propriedade de publicação
const pontoSchema = new mongoose.Schema({
    name: String,
    call: String,
    email: String,
    CNPJ: String,
    endereco: String,
    publication: []
},
{collection: "users"});

const Ponto = mongoose.model('Ponto', pontoSchema);

export default Ponto;
