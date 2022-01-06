import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { displayCorrectlySaved } from '../../helpers/displayCorrectlySaved';
import { displayError } from '../../helpers/displayError';
import { postProductDetail, putProductDetail } from '../../services/productServices';
import ProductDetailForm from '../ProductDetailForm';

function ProductDetailFormModal({productId=0,productDetail={},showModal=false, handleShow= ()=> {}, isEdit=false, resetModal = () => {}}) {

    const [productDetailState, setproductDetailState] = useState({
        productId:0,
        colorId:0,
        price:0
    });
    const [isSaving, setisSaving] = useState(false);

    const hideModal = () => {
        handleShow();
    }

    const handleChange = (value) => {
        setproductDetailState((state) => ({
            ...state, ...value
         }));
    }

    const handleSaveProductDetail = () => {
        setisSaving(true);
        if( isEdit) {
            putProductDetail(productDetail?.id, productDetailState).then( () => {
                displayCorrectlySaved(resetModal());
                setisSaving(false);
            }, () => {
                displayError();   
                setisSaving(false);
            })
        } else {
            postProductDetail(productDetailState).then( () => {
                displayCorrectlySaved(resetModal());
                setisSaving(false);
            }, () => {
                displayError();   
                setisSaving(false);
            });
        }
    }

    const setExistingProductDetail = useCallback(() => {
        setproductDetailState({"productId": productDetail.productId, "colorId": productDetail.colorId, "price": productDetail.price});
    }, []);

    useEffect(() => {
        if(isEdit) {
            setExistingProductDetail();
        } else {
            setproductDetailState({"productId": productId});
        }
    }, [isEdit, productId, setExistingProductDetail]);

    return (
        <Modal
        show={showModal}
        centered
        size="lg"
        backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        isEdit ? ("Editar un producto") : ("Agregar un producto")
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductDetailForm productDetail={productDetailState} handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(e) => hideModal()}>Cerrar</Button>
                <Button 
                            type="submit" 
                            variant={ isSaving ? "secondary" : "primary" } 
                            onClick={handleSaveProductDetail}>
                        { isSaving ? (
                                    <>
                                        <Spinner
                                            className="ml-1"
                                            as="span"
                                            size="sm"
                                            role="status"
                                            animation="border"
                                        />
    
                                        ...Procesando
                                    </>
                                ) : (
                                    "Guardar"
                                ) 
                        }
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductDetailFormModal;
