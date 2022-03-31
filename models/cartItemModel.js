const {Model, DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../DB/mysql");

//class userSchema extends Sequelize.Model{}

const CartItem = sequelize.define('CartItem', {
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
}, {
    sequelize: sequelize,
    timestamps: true,
});

/* (async ()=>{
    await sequelize.sync({force: true});
})(); */

//CartItem.sync({force: true});

console.log(CartItem === sequelize.models.CartItem);

module.exports = CartItem;