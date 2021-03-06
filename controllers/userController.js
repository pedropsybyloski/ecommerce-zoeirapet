const Users = require("../models/userModel");
const connection = require("../DB/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cartModel");

const userController = {
    register: async (req, res) =>{
        try {
            const {name, email, password, repeatPassword} = req.body;

            const user = await Users.findOne({where: {email, password}});

            if (user) {
                return res.status(400).json({msg: "O Email já existe."});
            }
            if (password.length < 6) {
                return res.status(400).json({msg: "A senha tem que ter mais que 6 caracteres."});
            }
            if(repeatPassword !== password){
                return res.status(400).json({msg: "As senhas estão diferentes."})
            }

            //Encriptação de senha
            const passwordHash = await bcrypt.hash(password, 10);
            
            const newUser = await Users.create({name: name, email: email, password: passwordHash});

            /* await newUser.save(); */
            
            const accesstoken = createAccessToken({id: newUser.id});
            const refreshtoken = createRefreshToken({id: newUser.id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000
            });

            res.json({newUser, accesstoken});
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({"Erro: ": error});
        }
    },
    refreshToken: (req, res)=>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({msg: "Por favor faça login ou registre-se."});
            }
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_PASSWORD, (err, users) => {
                if (err) {
                    return res.status(400).json({msg: "Por favor faça login ou registre-se."}, err);
                }
                const accesstoken = createAccessToken({id: users.id});
                res.json({users, accesstoken});
            });

            //res.json({rf_token});
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: error});
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;
            console.log(email, password);

            const user = await Users.findOne({where: {email}});

            if(!user) {
                return res.status(400).json({msg: "Usuario não existe."});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({msg: "Senha e/ou Usuario incorreto."});
            }

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user.id});
            const refreshtoken = createRefreshToken({id: user.id});
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            });
            
            res.json({msg: "Login efetuado com sucesso!", accesstoken});

        } catch (error) {
            console.log(error);
            return res.status(500).json({"Error message ": error});
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
            return res.json({msg: "Logout efetuado com sucesso."});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getUser: async (req, res) =>{
        try {
            const _id = req.user.id;
            const user = await Users.findOne({where: {id: _id}, attributes:{exclude: ['password']}}); // order:[['id', 'DESC']]
            
            if(!user) {
                return res.status(400);
            }

            return res.json(user);

        } catch (err) {
            return res.status(500);
        }
    },
    addCart: async (req, res) =>{
        try {
            //const user = await Users.findOne({where: {id: req.user.id}});
            
            /* if(!user) {
                return res.status(400).json({msg: "Usuario não existe."});
            } */
            
            //const cart = await Cart.create({where: {UserId: req.user.id}});
            res.json({user: user, product: "cart"});
            /* const user = await Users.findOne({where:{id: req.user.id}});
            if(!user) {
                return res.status(400).json({msg: "Usuario não existe."});
            }

            const cart = await Cart.create({where: {UserId: req.user.id}});
            //cart.set({cart: JSON.stringify(req.body.cart)});
            console.log(req.user.id);
            //await cart.save();

            return res.json({msg: "Adicionado ao carrinho"}); */
        } catch (err) {
            return res.status(400).json({msg: err.message});
        }
    },
    updateUser: async (req, res) => {
        try {
            const { name, cep, bairro, cidade, estado, numero } = req.body;
            
            await Users.update({ name, cep, bairro, cidade, estado, numero }, { where: { id: req.user.id } });

            res.json({ msg: "Usuário atualizado com sucesso." });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) =>{
        try {
            const { name, cep, bairro, cidade, estado, numero } = req.body;

            const user = await Users.findOne({where: {id: req.user.id}});
                        
            //const newUser = await Users.create({name, cep, bairro, cidade, estado, numero});

            /* await newUser.save(); */
            
            res.end();
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({"Erro: ": error});
        }
    }
}

function createAccessToken (user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_PASSWORD, {expiresIn: '11m'});
}
function createRefreshToken (user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_PASSWORD, {expiresIn: '7d'});
}

module.exports = userController;