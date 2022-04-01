const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 9000;
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const uploadRouter = require("./routes/upload");
const productRouter = require("./routes/productRouter");
const sequelize = require('./DB/mysql');
const Product = require('./models/productModel');
const CartItem = require('./models/cartItemModel');
const Cart = require('./models/cartModel');
const User = require('./models/userModel');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload({useTempFiles:true}));
app.use(express.static(path.join(__dirname, '../public')));

//Routes
//app.use('/user', require("./routes/userRouter"));
app.use('/user', userRouter);
app.use('/api', categoryRouter);
app.use('/api', uploadRouter);
app.use('/api', productRouter);

/* app.get("/", (req, res)=>{
    res.json({msg: "Servidor está rodando!"});
});

app.use((req, res)=>{
    res.status(404).send("Pagina não encontrada");
}); */

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});