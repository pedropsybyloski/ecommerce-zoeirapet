import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

function BtnRender({ product, deleteProduct }) {
   const state = useContext(GlobalState);
   const [isAdmin] = state.userAPI.isAdmin;
   const addCart = state.userAPI.addCart;

    return (
        <div className="row_btn">
            {
                isAdmin ?
                    <>
                        <Link to="#" id="btn_buy" className="exclude" >
                            Excluir
                        </Link>
                        <Link id="btn_view" to={`/edit_product/${product.id}`}>
                            Editar
                        </Link>
                    </>
                    :  <>
                    <Link id="btn_buy" className="buy" to="#!" onClick={() => addCart(product)} >
                        Comprar
                    </Link>
                    <Link id="btn_view" to={`/detail/${product.id}`}>
                        Visualizar
                    </Link>
                </>
            }
        </div>
    )
}

export default BtnRender;
