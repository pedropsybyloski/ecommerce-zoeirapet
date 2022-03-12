const {Model, DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../DB/mysql");

//class userSchema extends Sequelize.Model{}

const User = sequelize.define('User', {
    name:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    email:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    role:{
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }, 
    cart:{
        allowNull: false,
        type: DataTypes.JSON,
        defaultValue: []
    },
    cep: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
    }, 
    bairro: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
    },
    cidade: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
    },
    estado: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
    }, 
    numero: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
    }
    //cep, rua, numero, bairro, cidade, estado
},
{
    sequelize: sequelize,
    timestamps: true,
    modelName: 'users'
});

/* (async ()=>{
    await User.sync({force: true});
})(); */

//User.sync({force: true});

console.log(User === sequelize.models.User);

module.exports = User;