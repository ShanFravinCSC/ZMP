//libraries
import express from "express";
import passport from "passport";

//Database Model
import { UserModel } from "../../database/allModels";

//Router Setup
const Router = express.Router();

//Validation
import { ValidateUserData, ValidateUserId } from "../../Validation/user"; 

/*
Route   /
des     Get User Data
params   _id
body     none
Access   Public
method   GET
*/
Router.get("/:_id", async (req, res) => {
    try{
        await ValidateUserId(req.params);

        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
    
        return res.json({ user: getUser });    
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /
des     Update User Data
params   userId
body     userdata
Access   Public
method   put
*/
Router.put("/:userid", async(req, res) => {
    try{
        await ValidateUserId(req.params);
        await ValidateUserData(req.body);
        const { userId } = req.params;
        const { userData } = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId, 
            {
                $set : userData,
            },
            { new: true },
        );
        return res.json({ updateUserData });
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});

export default Router;