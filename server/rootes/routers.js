import express from "express";

// import User from "../models/user";
import House from "../models/house";

import signin from "../services/signin";
import signup from "../services/signup";
import createHouse from "../services/createHouse";
import getHouse from "../services/getHouse";
import search from "../services/search"

const router = express.Router();


// Router fro signin
router.post('/signin', signin);

// Router for signup
router.post('/signup', signup)

//Router for create pages
router.post('/add-house', createHouse)

//Router for get pages
router.get('/getHouse', getHouse, )

//Search
router.get('/search', search)


export default router;