const sequelize = require('../database/db');

const getUserCount = async function () {
    let count = await sequelize.query(
        `Select COUNT(*) as count from users`
    )
    return count[0][0].count;
}

const getUser = async function(req,res){
    const key = req.user_key;
    try {
        let [result, metadata] =  await sequelize.query(
            `select * from users where user-key=:key`,
            {
                replacements:{
                    key:key
                }
            }
        )
        return res.status(200).send(result[0]);
    } catch (error) {
        return res.status(404).send({msg:"user not found"});
    }
}

const getAllUser = async function (req,res){
    try {
        let [result, metadata] = await sequelize.query(
            `SELECT username, SUM(gold) as total_gold
            FROM gold
            GROUP BY username
            ORDER BY total_gold DESC;`
        )
        if(result){
            console.log(result);
            return res.status(200).send(result);
        }
        return res.status(200).send([]) //send empty array
    } catch (error) {
        return res.status(400).send({msg:"error"});
    }
}

const getGold = async function(req,res){
    console.log('get-gold called');
    const username = req.query.username;
    try {
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
        return res.status(200).send({data:{
            "SUM(gold)":0
        }})
    } catch (error) {
        res.status(400).send({msg:"error"});
    }
}

const getLastAttack = async function(req,res){
    console.log("get-last-attack called");
    const username = req.query.username;
    try {
        let [result, metadata] = await sequelize.query(
        `select * from gold where username=:username and username!=sender ORDER BY id DESC LIMIT 1`,{
            replacements:{
                username:username
            }
        })
        if(result[0]){
            return res.status(200).send(result[0]);
        }  
        res.status(404).send({msg:"no attack"});
    } catch (error) {
        res.status(400).send({msg:"error"});
    }
}

const seeAttack = async function(req,res){
    const id = req.query.id;
    try {
        let [result, metadata] = await sequelize.query(
            `update gold set seen=1 where id=:id`,{
                replacements:{
                    id:id
                }
            }
        )
        return res.status(200).send({msg:`seen ${id}`})
    } catch (error) {
        return res.status(400).send({"msg":"error"})
    }
}

const inflasi = async function(req,res){
    let pengguna = req.query.pengguna;
    if(pengguna=="admin"){
        try {
            let [result, metadata] = await sequelize.query(
                `select username from gold group by username`
            )
            console.log(result);
            for(let i = 0;i<result[0].length;i++){
                let [foo, m] = await sequelize.query(
                    `insert into gold (username,gold,sender,seen) values(:username, 100, "inflasi", 0)`,
                    {
                        replacements:{
                            username:result[0][i].username
                        }
                    }
                )
            }
            return res.status(200).send({msg:"inflasi"});
        } catch (error) {
            return res.status(400).send({msg:"sapa kau anjing"});
        }
    }
    return res.status(400).send({msg:"sapa kamu anjing"});
}

const addGold = async function(req,res){
    const amount = req.query.amount;
    const username = req.query.username;
    const sender = req.query.sender;

    try {
        let [result, metadata] = await sequelize.query(
            `insert into gold (username,gold,sender) values(:username, :amount, :sender)`,
            {
                replacements:{
                    username:username,
                    amount:amount,
                    sender:sender
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
    } catch (error) {
        return res.status(400).send({msg:"error"});
    }
}

module.exports = {getUser,getUserCount,addGold,getGold,getAllUser, getLastAttack, seeAttack, inflasi};