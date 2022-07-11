import express from "express";
import passport from "passport";

//Database Model
import { ReviewModel } from "../../database/allModels";

//Router Setup
const Router = express.Router();

//Validation
import { ValidateReviewData } from "../../Validation/review"

/*
Route   /new
des     add new review rating
params   none
body     reviewobject
Access   Public
method   Post
*/
Router.post("/new", async (req, res) =>{
    try{
        await ValidateReviewData(req.body);
        const { reviewData } = req.body;

        await ReviewModel.create(reviewData);

        return res.json({ review: "Successsfully Created Review" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

/*
Route   /delete
des      delete review rating
params   _id
Access   Public
method   delete
*/
Router.delete("/delete/:_id", async (req, res) =>{
    try{
        await ValidateReviewData(req.body);
        const { _id } = req.params;

        await ReviewModel.findByIdAndDelete(_id);

        return res.json({ review: "Successfully Deleted the Review "});
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});

export default Router;