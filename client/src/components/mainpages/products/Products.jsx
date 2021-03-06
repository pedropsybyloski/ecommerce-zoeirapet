import React, {useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback
    
    return (
        <>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product.id}
                        product={product}
                        isAdmin={isAdmin}
                        token={token}
                        callback={callback}
                        setCallback={setCallback}/>
                    })
                }
            </div>
            {products.length === 0 && <h1>Nenhum produto disponivel</h1>}
        </>
    )
}

export default Products;