import { useState, useEffect } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token },
                    });

                    setName(res.data.name);
                    setId(res.data.id);
                    setIsLogged(true);

                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                } catch (err) {
                    alert(err);
                }
            }
            getUser();
        }
    }, [token]);

    const addCart = async (product) => {
        if (!isLogged) {
            return alert("Entre para continuar comprando.");
        }

        //const check = cart.every(item => item.id !== product.id);

        if (product) {
            setCart([...cart, { ...product, quantity: 1 }]);

            await axios.patch('/user/addcart', {
                cart: [...cart, { ...product, quantity: 1 }]
            },
            {headers: {Authorization: token}
        });
        } else {
            return alert("Produto adicionado no carrinho.");
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        name: [name, setName],
        id: [id, setId],
        addCart: addCart,
        //history: [history, setHistory] 
    }
}

export default UserAPI;