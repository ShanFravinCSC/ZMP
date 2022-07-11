import joi from "joi";

export const ValidateReviewData = (reviewData) => {
    const Schema = joi.object({
        food : joi.string(),
        restaurant : joi.string(),
        user : joi.string(),
        rating : joi.number().required(),
        reviewText : joi.string().required(),
        photos : joi.array(),
    });
    return Schema.validateAsync(reviewData);
}