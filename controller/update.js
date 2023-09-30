const sequelize = require('../database/db');

const getUserCount = async function () {
    let count = await sequelize.query(
        `Select COUNT(*) as count from users`
    )
    return count[0][0].count;
}

const getUser = async function(req,res){
    const key = req.user_key;
    let [result, metadata] =  await sequelize.query(
        `select * from users where user-key=:key`,
        {
            replacements:{
                key:key
            }
        }
    )
    return res.status(200).send(result[0]);
}

const getGold = async function(userkey){
    let [result, metadata] = await sequelize.query(
        `select gold from users where userkey=:userkey`,{
            replacements:{
                userkey:userkey
            }
        }
    )
    if(result){
        return res.status(200).send(result[0]);
    }
    res.status(400).send({msg:"error"});
}

const addGold = async function(req,res){
    const amount = req.amount;

    let [result, metadata] = await sequelize.query(
        `update users set gold `
    )
}