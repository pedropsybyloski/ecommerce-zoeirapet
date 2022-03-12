const express = require("express");
const {Sequelize} = require("sequelize");
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

app.get("/", (req, res)=>{
    res.json({msg: "Servidor está rodando!"});
});

app.use((req, res)=>{
    res.status(404).send("Pagina não encontrada");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});