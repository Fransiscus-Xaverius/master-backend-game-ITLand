const express = require("express");
const sequelize = require('../database/db');

const router = express.Router();

const {getUser,getUserCount,addGold,getGold,getAllUser,getLastAttack, seeAttack, inflasi} = require("../controller/gold");

router.post("/gold", addGold);
router.get("/gold",getGold);
router.get("/last-attack",getLastAttack);
router.get("/get-all-users", getAllUser);
router.put("/see-attack",seeAttack);
router.post("/inflasi",inflasi);

module.exports = router;