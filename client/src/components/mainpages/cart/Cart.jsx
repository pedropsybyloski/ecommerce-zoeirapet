import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    const [token] = state.token;

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {headers: {Authorization: token}});
    }

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => { 
                return prev + (item.price * item.quantity)
            },0);
            setTotal(total);
        }
        getTotal(); 

    },[cart]);

    const increment = (id) =>{
        cart.forEach(item => {
            if(item.id === id){
                item.quantity += 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item.id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    }

    const removeProduct = id =>{
        if(window.confirm("Tem certeza que quer deletar esse produto?")){
            cart.forEach((item, index) => {
                if(item.id === id){
                    cart.splice(index, 1);
                }
            })

            setCart([...cart]);
            addToCart(cart);
        }
    }

    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Carrinho Vazio</h2>
    }

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product.id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>R$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product.id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product.id)}> + </button>
                            </div>

                            <div className="delete" onClick={() => removeProduct(product.id)}> X </div>

                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>Total: R$ {total}</h3>
                <Link to="#">Pagamento</Link>
            </div>
        </div>
    );
}

export default Cart;