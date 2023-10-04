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

const getGold = async function(req,res){
    const username = req.query.username;
    let [result, metadata] = await sequelize.query(
        `select SUM(gold) from gold where username=:username`,{
            replacements:{
                username:username
            }
        }
    )
    if(result){
        console.log(result[0]);
        return res.status(200).send(result[0]);
    }
    res.status(400).send({msg:"error"});
}

const addGold = async function(req,res){
    const amount = req.query.amount;
    const username = req.query.username;

    let [result, metadata] = await sequelize.query(
        `insert into gold (username,gold) values(:username, :amount)`,
        {
            replacements:{
                username:username,
                amount:amount
            }
        }
    )

    let [foo , m] = await sequelize.query(
        `select SUM(gold) as SUM from gold where username=:username`,
        {
            replacements:{
                username:username
            }
        }
    )

    return res.status(200).send({msg:"updated gold"})
}

module.exports = {getUser,getUserCount,addGold,getGold};