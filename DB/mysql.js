const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        dialect: "mysql",
        port: process.env.MYSQL_PORT
    }
);

sequelize.authenticate().then(()=>{
    console.log("Connection to MYSQL successful!");
}).catch((err)=>{
    console.log("Erro: ", err);
});

module.exports = sequelize;