const {Model, DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../DB/mysql");

//class userSchema extends Sequelize.Model{}

const Product = sequelize.define('Product', {
    product_id:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.REAL,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    content:{
        allowNull: false,
        type: DataTypes.STRING,
    }, 
    images:{
        allowNull: false,
        type: DataTypes.JSON,
    }, 
    category:{
        allowNull: false,
        type: DataTypes.STRING,
    }, 
    checked:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }, 
    sold:{
        allowNull: false,
        type: DataTypes.REAL,
        defaultValue: 0,
    }
},
{
    sequelize: sequelize,
    timestamps: true,
});

/* (async ()=>{
    await sequelize.sync({force: true});
})(); */

//Product.sync({force: true});

console.log(Product === sequelize.models.Product);

module.exports = Product;