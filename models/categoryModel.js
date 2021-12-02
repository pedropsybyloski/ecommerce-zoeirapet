const {DataTypes, Sequelize, Model} = require("sequelize");
const sequelize = require("../DB/mysql");


const Category = sequelize.define('Category', {
    name:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    }
},
{
    sequelize: sequelize,
    timestamps: true,
});

//Category.sync({force: true});

console.log(Category === sequelize.models.Category);

module.exports = Category;