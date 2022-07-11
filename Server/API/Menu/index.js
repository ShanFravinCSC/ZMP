// Libraries
import express from "express";
import passport from "passport";

//Database model
import { MenuModel, ImageModel } from "../../database/menu";

//Validation
import { ValidateMenuId } from "../../Validation/menu";

//Router Setup
const Router = express.Router();

/*
Route   /list
des     Get all list menu based on id
params   _id
Access   Public
method   GET
*/
Router.get("/list/:_id", async (req, res) => {
    try{
        await ValidateMenuId(req.params);
        const { _id } = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });
    }catch(error){
        return res.status(500).json({ error: error.message});
    }
});

/*
Route   /image
des     Get all menu images based on id
params   _id
Access   Public
method   GET
*/
Router.get("/image/:_id", async (req, res) => {
    try{
        await ValidateMenuId(req.params);
        const { _id } = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.json({ menus })
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});

export default Router;