import User from "../models/users.js";
import Publication from "../models/publication.js";
import Ponto from "../models/ponto.js";

async function insertPublication(request, response) {
    const id = request.params.idUser; //id do usuario
    const idPonto = request.params.pontoId; //id do ponto
    const pub = request.body;
    const pontoLocalized = await Ponto.findById(idPonto); //localiza o ponto
    const userLocalized = await User.findById(id); //localiza o usuário
    const newPub = await Publication.create(pub); //cria uma publicacao

    const {name, endereco} = pontoLocalized;
    const {complete_name, cpf} = userLocalized;

   await Publication.updateMany(
        { _id: newPub._id },
        {
            $set: {
                ponto: {
                    name: name,
                    endereco: endereco,
                    _id: pontoLocalized._id
                },
                user: {
                    complete_name: complete_name,
                    cpf: cpf,
                    _id: userLocalized._id
                }
            }
        }
    );
    
    //insere a publicação dentro do array publication no cadastro do usuário
    await User.findByIdAndUpdate(
        {_id : id}, 
        {
            $push: {
                //publication: newPub
                
                publication: {
                    description: newPub.description,
                    category: newPub.category,
                    status: newPub.status,
                    photos: newPub.photos,
                    ponto: {
                        name: name,
                        endereco: endereco
                    },
                    criacao: newPub.criacao,
                    _id: newPub._id
                }
            }
        },
        { new: true }
    )
    
    //insere a publicação no array publications no cadastro do ponto
    await User.findByIdAndUpdate(
        {_id : idPonto},
        { $push: {
            publication: {
                /*complete_name: complete_name,
                cpf: cpf,
                description: newPub.description,
                category: newPub.category,
                status: newPub.status,
                criacao: newPub.criacao,*/
                _id: newPub._id
            }
            }
        }        
        )
    
    return response.status(200).json({response: 'New publication created'})
}

async function getPublications(request, response){
    const Publications = await Publication.find();
    return response.status(200).json(Publications);
}

async function getOnePublication(request, response){
    const idPublication = request.params.publicationId; // ID da publicação
    const PublicationLocalized = await Publication.findById(idPublication);
    return response.status(200).json(PublicationLocalized);
}

async function updatePublication(request, response) {
    const id = request.params.idUser; // ID do usuário
    const idPublication = request.params.publicationId; // ID da publicação

    // Dados a serem salvos, vindos do corpo da requisição
    const { description, category, status, photos } = request.body;

    // Atualiza a publicação
    await Publication.findByIdAndUpdate(idPublication, {
        description,
        category,
        status,
        photos
    });

    // Atualiza a publicação no usuário
    const user = await User.findOneAndUpdate(
        { _id: id, "publication._id": idPublication },
        {
            $set: {
                "publication.$.description": description,
                "publication.$.category": category,
                "publication.$.status": status,
                "publication.$.photos": photos
            }
        }
    );

    if (!user) {
        return response.status(404).json({ response: 'Usuário não encontrado.' });
    }

    if (user && !user.publication.some(pub => pub._id.toString() === idPublication)) {
        return response.status(403).json({ response: 'Publicação não pertence ao usuário.' });
    }

    return response.status(200).json({ response: 'Atualização da publicação bem-sucedida' });
}

async function deletePublication(request, response){
    const id = request.params.publicationId
    
    await Publication.findByIdAndDelete({_id : id})

    return response.status(200).json({response: 'Publication deleted'})
}


export {insertPublication, getPublications, getOnePublication, updatePublication, deletePublication}