const express = require("express");
const sequelize = require('../database/db');

const router = express.Router();

const {getUser,getUserCount,addGold,getGold} = require("../controller/gold");

router.post("/gold", addGold);
router.get("/gold",getGold);

module.exports = router;