import joi from "joi";

export const ValidateOrderId = (orderId) => {
    const Schema = joi.object({
        _id : joi.string().required(),
    });
    return Schema.validateAsync(orderId);
}

export const ValidateOrderDetails = (orderDet) => {
    const Schema = joi.object({
        food : joi.string().required(),
        quantity : joi.number().required(),
        paymode : joi.string().required(),
        status : joi.string(),
        itemTotal : joi.number().required(),
        promo : joi.number().required(),
        tax : joi.number().required(),
    });
    return Schema.validateAsync(orderDet);
}