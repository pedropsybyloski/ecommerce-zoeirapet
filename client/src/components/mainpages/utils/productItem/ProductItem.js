import React from 'react';
import BtnRender from './BtnRender';

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

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
            <BtnRender product={product} />
        </div>
    )
}

export default ProductItem;
