import joi from 'joi'; 
import { createValidator } from 'express-joi-validation';

const validator = createValidator({passError: true}); 

export default [
    validator.body(
        joi.object().keys({
            title: joi.string().required(),
            description: joi.string().required(),
            tags: joi.string().optional(),
            updatedAt: joi.number().required(), 
        })
    ),
    validator.params(
        joi.object().keys({
            'id': joi.string().hex().length(24).required(),
        }),
    ),
    validator.headers(
        joi.object().keys({
            'content-type': joi.string().valid('application/json').required(),
        }).unknown(),
    )
]