//Library
import express from "express";
import passport from "passport";
//import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user"

//Initializing Router
const Router = express.Router();

//Signup Validation
import { ValidateSignup, ValidateSignin } from "../../Validation/auth"

/*
Route   /signup
des     Register New User
params   none
Access   public
method   POST
*/

Router.post("/signup", async(req, res) => {

    try{
        await ValidateSignup(req.body.credentials);

        await UserModel.findByEmailAndPhone(req.body.credentials);

       const newUser = await UserModel.create(req.body.credentials);

        const token = newUser.generateJwtToken();

        return res.status(200).json({ token, status: "success"});

    }   catch(error){
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /signin
des     Sign in using email and password
params   none
Access   public
method   POST
*/

Router.post("/signin", async(req, res) => {
    try{
        await ValidateSignin(req.body.credentials);

        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );

        const token = user.generateJwtToken();

        return res.status(200).json({ token, status: "success" });
    }   catch(error){
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /google
des     Google Sign in
params   none
Access   Public
method   GET
*/
Router.get("/google", passport.authenticate("google", { 
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
    );

    /*
Route   /google/callback
des     Google Sign in callback
params   none
Access   Public
method   GET
*/

Router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}),
(req, res) => {
    return res.json({ token : req.session.passport.user.token });
    }
);

export default Router;