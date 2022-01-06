import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap';
import ProductDetailFormModal from './modals/ProductDetailFormModal';

function InfoProduct({product={}, resetModal= () => {}}) {

    const [productDetailModal, setproductDetailModal] = useState({
        show:false,
        isEdit:false,
        product: {}
    });

    const handleShowProductDetailModal = (product) => {
        setproductDetailModal(state => ({ ...state, show: !state.show, product: product, isEdit: product ? (true) : (false) }));
    };




    return (
        <div>
            <div className="justify-content-center mb-2">
                <h4>{product?.name}</h4>
                <h5>{product?.description}</h5>
            </div>
            <br />
            <div>
                {
                    product.productDetails.map((i, index) => (
                        <Card onClick={() =>handleShowProductDetailModal(i)} key={index} style={{ width: '18rem', cursor:'pointer' }}>
                            <Card.Body>
                                <Card.Title> <strong>Color: </strong> {i?.color.name}</Card.Title>
                                <Card.Text>
                                    <strong>Precio: $</strong>{i.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
            <br />

            <Button onClick={() => handleShowProductDetailModal()}>
                Agregar nuevo
            </Button>


            {
                productDetailModal.show ? 
                (
                    <ProductDetailFormModal 
                            productId={product.id}
                            productDetail={productDetailModal.product}
                            showModal={productDetailModal.show}
                            handleShow={handleShowProductDetailModal}   
                            resetModal={resetModal} 
                            isEdit={productDetailModal.isEdit}
                    />
                )
                :(null)
            }  
        </div>

    )
}

export default InfoProduct;
