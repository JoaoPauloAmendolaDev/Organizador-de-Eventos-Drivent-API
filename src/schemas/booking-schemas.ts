import joi from "joi"

export const bookingSchema = joi.object({
    roomId: joi.number().required()
})