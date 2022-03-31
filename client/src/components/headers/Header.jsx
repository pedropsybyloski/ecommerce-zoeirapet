import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [name] = state.userAPI.name;
    const [id] = state.userAPI.id;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false);
    const styleMenu = {left: menu ? 0 : "-100%"}; 
    /* 
    */

    const logoutUser = async () => {
        await axios('/user/logout');
        localStorage.removeItem('firstLogin');
        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Criar Produto</Link></li>
                <li><Link to="/category">Categoria</Link></li>
            </>
        );
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">Historico</Link></li>
                <li><Link to={`/profile/${id}`}>Perfil</Link></li>
                <li><Link to="/" onClick={logoutUser} >Logout</Link></li> 
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className="logo">
                {isLogged ? 
                <h1><Link to="/">{isAdmin ? name : name}</Link></h1> : <h1><Link to="/">{!isAdmin ? "Zoeirapet": name}</Link></h1>}
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Produtos' : 'Loja'}</Link></li>

                {isAdmin && adminRouter()}
                
                {isLogged ? loggedRouter() : <li><Link to="/login">Logar / Registrar</Link></li>}

                <li>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>
            
            {isAdmin ? '' : <div className="cart-icon"> <span>{cart}</span> <Link to="/cart"> <img src={Cart} alt="" width="30" /> </Link> </div>}
            {/* 1) */}

        </header>
    );
}

export default Header;

/* 

  1)  {isAdmin ? '' : <div className="cart-icon"> <span>{cart.length}</span> <Link to="/cart"> <img src={Cart} alt="" width="30" /> </Link> </div>}

*/