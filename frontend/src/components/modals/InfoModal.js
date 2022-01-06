import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

import InfoProduct from '../InfoProduct';
import ProductDetailFormModal from './ProductDetailFormModal';

function InfoModal({product={},showModal=false, handleShow= ()=> {}}){

    const hideModal = () => {
        handleShow();
    }

    const [productDetailModal, setproductDetailModal] = useState({
        show:false
    });

    const handleShowProductDetailModal = (currentId) => {
        setproductDetailModal(state => ({ ...state, show: !state.show }));
    };

    const resetModalState = () => {
        setproductDetailModal({"productDetailModal.show": !productDetailModal.show});
        hideModal();
    }

    return (
        <>
        
            <Modal
                show={showModal}
                centered
                size="lg"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detalle de producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        product.productDetails.length > 0 ? (
                            <InfoProduct product={product} resetModal={resetModalState}/>
                        ) 
                        :(
                            <Alert variant="warning">
                                Este producto no posee precio ni colores asignados, para registrarlo presione este botón 
                                <Button variant="primary" onClick={() => handleShowProductDetailModal()}>Agregar</Button>
                            </Alert>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => hideModal()}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            {
                <ProductDetailFormModal 
                    productId={product.id} 
                    showModal={productDetailModal.show} 
                    handleShow={handleShowProductDetailModal} 
                    resetModal={resetModalState}
                />
            }
        </>
    )
}

export default InfoModal;
