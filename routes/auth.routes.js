const express = require("express");
const login = require("../controllers/login.controller");
const { getUsers, register } = require("../controllers/register.controller");
const router = express.Router();

router.get("/users",getUsers);
router.post("/register",register);
router.post("/login",login),
/* router.get("/test/user",(req,res)=>{}), */

module.exports = router;
