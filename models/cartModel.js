const {Model, DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../DB/mysql");

//class userSchema extends Sequelize.Model{}

const Cart = sequelize.define('Cart', {
}, {
    sequelize: sequelize,
    timestamps: true,
});

/* (async ()=>{
    await sequelize.sync({force: true});
})(); */

//Cart.sync({force: true});

console.log(Cart === sequelize.models.Cart);

module.exports = Cart;