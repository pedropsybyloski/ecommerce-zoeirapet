import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './auth/Login';
import Products from './products/Products';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/NotFound';
import DetailProduct from './detailProduct/DetailProduct';
import {GlobalState} from '../../GlobalState'; 
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import Perfil from './profile/Profile';

function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Routes>
            <Route path="/" exact element={<Products></Products>} />
            <Route path="/login" exact element={isLogged ? <NotFound/> : <Login></Login>} />
            <Route path="/detail/:id" exact element={<DetailProduct></DetailProduct>} />
            <Route path="/register" exact element={isLogged ? <NotFound></NotFound> : <Register></Register>} />
            <Route path="/create_product" exact element={isAdmin ? <CreateProduct></CreateProduct> : <NotFound></NotFound>} />
            <Route path="/category" exact element={isAdmin ? <Categories></Categories> : <NotFound></NotFound>}/>
            <Route path="/cart" exact element={<Cart></Cart>} />
            <Route path="*" exact element={<NotFound></NotFound>} />
            <Route path="/edit_product/:id" exact element={isAdmin ? <CreateProduct></CreateProduct> : <NotFound></NotFound>} />
            <Route path="/perfil" exact element={isLogged ? <Perfil/> : <NotFound/>} />
        </Routes>
    );
}

export default Pages;