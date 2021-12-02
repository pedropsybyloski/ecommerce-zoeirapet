const express = require("express");
const {Sequelize} = require("sequelize");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 9000;
const User = require("./controllers/userController");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload({useTempFiles:true}));
app.use(express.static(path.join(__dirname, '../public')));

//Routes
app.use('/user', require("./routes/userRouter"));
app.use('/api', require("./routes/categoryRouter"));
app.use('/api', require("./routes/upload"));
app.use('/api', require("./routes/productRouter"));

app.get("/", (req, res)=>{
    res.json({msg: "Olá, server is running!"});
});

app.use((req, res)=>{
    res.status(404).send("Pagina não encontrada");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});