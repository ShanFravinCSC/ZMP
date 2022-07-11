import joi from "joi";

export const ValidateImageId = (imageId) => {
    const Schema = joi.object({
        _id : joi.string().required(),
    });
    return Schema.validateAsync(imageId);
}

export const ValidateImageFile = (imageFile) => {
    const Schema = joi.object({
        file : joi.string().required(),
    });
    return Schema.validateAsync(imageFile);
}