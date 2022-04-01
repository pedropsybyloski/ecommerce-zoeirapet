const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

let sequelize;

if(process.env.CLEARDB_DATABASE_URL){
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else{
    sequelize = new Sequelize(
        process.env.MYSQL_DB,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD,
        {
            host: process.env.MYSQL_HOST,
            dialect: "mysql",
            port: process.env.MYSQL_PORT,
            timezone: '-03:00'
        }
    );
}

sequelize.authenticate().then(()=>{
    console.log("Connection to MYSQL successful!");
}).catch((err)=>{
    console.log("Erro: ", err);
});

module.exports = sequelize;