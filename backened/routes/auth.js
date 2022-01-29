const express = require("express");
const User = require("../models/User")
const cors = require("cors");

const router = express.Router();
router.use(cors());
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT = "AbhishaKumarChittore"

// ROUTER 1 :Creating a user with POST request and Authentication is not required.ENDPOINT:-- /api/auth/createuser
//validation
router.post("/createuser", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('Username', 'Enter a valid username').isLength({ min: 3 }),
], async(req, res) => {
    let success = false
        // throwing an error if the validation is not accede by
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
            //Check whether a user exist with this email already or not
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists." })
        }
        let salt = await bcrypt.genSalt(10)
        let secpass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            Username: req.body.Username,
            email: req.body.email,
            password: secpass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT)
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        success = false
        res.status(500).json(success, "Internal Server occured an error")
    }
})



// ROUTER 2 : Authenticate a user with POST "/api/auth/login " NO LOGIN REQUIRED
router.post("/login", [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password can not be blank').exists(),

    ], async(req, res) => {
        let success = false
            // throwing an error if the validation is not accede by
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //Finding if user exists
            let user = await User.findOne({ email })
            if (!user) {

                res.status(400).json({ success, error: "Please login with correct Credentials" })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            //Comparing if user's password is matched
            if (!passwordCompare) {

                res.status(400).json({ success, error: "Please login with correct Credentials" })
            }
            //Sending a authtoken in response
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT)
            success = true
            res.json({ success, authtoken })

        } catch (error) {
            success = false
            res.status(500).json(success, "Internal Server occured an error")
        }


    })
    //ROUTER 3 : Get details of user by using a middleware POST "/api/auth/getuser"
router.post("/getuser", fetchuser, async(req, res) => {
    try {
        let success = true
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(success, user)
    } catch (error) {
        let success = false
        res.status(500).json(success, "Internal Server occured an error")
    }
})


module.exports = router