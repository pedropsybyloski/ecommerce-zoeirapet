import axios from 'axios';
import React from 'react';
import BtnRender from './BtnRender';

function ProductItem({ product, isAdmin, token, callback, setCallback }) {

    const deleteProduct = async ()=>{
        try {
            const destroyImg = axios.post('/api/destroy', {public_id: product.images.public_id}, {
                headers: {Authorization: token}
            });
            
            const deleteProduct = axios.delete(`/api/products/${product.id}`, {
                headers: {Authorization: token}
            });
            
            await destroyImg;
            await deleteProduct;
            setCallback(!callback);
            alert("Produto excluido com sucesso, recarregue a página.");
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>R${product.price}</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct}/>
        </div>
    )
}

export default ProductItem;
