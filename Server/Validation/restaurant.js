import joi from "joi";

export const ValidateRestaurantCity = (restaurantcity) => {
    const Schema = joi.object({
        city : joi.string().required(),
    });
    return Schema.validateAsync(restaurantcity);
}

export const ValidateRestaurantSearchString = (restaurantsearch) => {
    const Schema = joi.object({
        searchString : joi.string().required(),
    });
    return Schema.validateAsync(restaurantsearch);
}