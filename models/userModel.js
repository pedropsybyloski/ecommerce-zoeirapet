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
    }
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