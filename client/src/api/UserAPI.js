import {useState, useEffect} from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    /* 
    const [history, setHistory] = useState([]); */

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    
                    setIsLogged(true);
                    
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                                        
                    setCart(res.data.cart);
                    
                    console.log(res);

                } catch (err) {
                    alert(err.response.data.msg);
                }
            }
            getUser();
        }
    },[token]);

    const addCart = async (product) => {
        if(!isLogged) {
            return alert("Entre para continuar comprando.");
        }

        const check = cart.every(item =>{
            return item.id !== product.id;
        });

        if(check){
            setCart([...cart, {...product, quantity: 1}]);

            await axios.patch('/user/addcart', {
                cart: [...cart, {...product, quantity: 1}]},
                {headers: {
                    Authorization: token}}
                    );
        }else{
            return alert("Produto adicionado no carrinho.");
        }
    }

    return{
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        //history: [history, setHistory] 
    }
}

export default UserAPI;