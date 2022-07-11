//Importing env variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";


var session = require('express-session')

//configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//setup - microservice routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Image from "./API/Image";
import Order from "./API/Orders";
import Review from "./API/Reviews";
import User from "./API/User";
import Menu from "./API/Menu";
import MailService from "./API/Mail";

//database connection
import ConnectDB from "./database/connection";

const zomato = express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(session({ secret: 'ShaKau' }));
zomato.use(passport.initialize());
zomato.use(passport.session());


//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/mail", MailService);


zomato.get("/", (req, res) => res.json({ message: "Setup Success" }));

zomato.listen(4000, () => 
ConnectDB()
    .then (() => console.log("Server is running"))
    .catch(() => 
    console.log("Server is running, but database connection failed"))
); 
