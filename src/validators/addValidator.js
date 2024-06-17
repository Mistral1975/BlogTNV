import joi from 'joi'; //modulo di node per validazione dei dati
import { createValidator } from 'express-joi-validation';

const validator = createValidator({passError:true});

export default [
    validator.body(
        joi.object().keys({
            title: joi.string().required(), // Titolo del Post
            description: joi.string().required(), // Descrizione del Post
            tags: joi.string().optional(), // Categoria del Post
        })
    ),
]