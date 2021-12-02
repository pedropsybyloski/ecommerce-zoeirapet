import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';


function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        console.log("re render");
        console.log(products.images);
        if (params.id) {
            products.forEach(product => {
                if (product.id == params.id) setDetailProduct(product);
            });
        }
    }, [params.id, products]);

    if (detailProduct.length === 0) {
        return null;
    }

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>R$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Vendidos: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart" >
                        Comprar
                    </Link>
                </div>
            </div>
            <div>
                <h2>Produtos Similares</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category ? <ProductItem key={product.id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct;