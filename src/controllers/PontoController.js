import Ponto from "../models/ponto.js";
import User from "../models/users.js";
import Publication from "../models/publication.js";

async function getPonto(request, response){
    const pontos = await Ponto.find();
    return response.status(200).json(pontos);
}

async function createPonto(request, response){
    const ponto = request.body;

    const newPonto = await Ponto.create(ponto);
  
    return response.status(201).json(newPonto);
}

export {getPonto, createPonto}