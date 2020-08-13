import * as joi from '@hapi/joi';

export const postSchema = joi.object().keys({
    name: joi.string().required(),
    age: joi.number().positive().optional(),
    breed: joi.string().optional(),
});
