const Joi = require("joi");

module.exports.ListingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().uri().allow(""),
            filename: Joi.string().allow("")
        }).optional(),
        category : Joi.string().required()
    }).required(),
})

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().integer().min(1).max(5).required(),
        comment : Joi.string().required()
    }).required()
}).options({ convert : true});