const express = require("express");
const sequelize = require('../database/db');

const router = express.Router();

const {getUser,getUserCount,addGold,getGold,getAllUser} = require("../controller/gold");

router.post("/gold", addGold);
router.get("/gold",getGold);
router.get("/get-all-users", getAllUser);

module.exports = router;