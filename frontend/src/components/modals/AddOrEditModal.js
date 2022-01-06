import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { displayCorrectlySaved } from '../../helpers/displayCorrectlySaved';
import { displayError } from '../../helpers/displayError';
import { postProduct, putProduct } from '../../services/productServices';
import AddOrEditProduct from '../AddOrEditProduct';

function AddOrEditModal({product={},showModal=false, handleShow= ()=> {}, isEdit=false, resetModal = () => {}}){

    const [isSaving, setisSaving] = useState(false);

    const [productData, setproductData] = useState({
        name:"",
        description: ""
    });

    const handleChange = (value) => {
        setproductData((state) => ({
            ...state, ...value
         }));
    }

    const hideModal = () => {
        handleShow();
    }

    const handleSaveProduct = () => {
        setisSaving(true);
        debugger;
        if( isEdit) {
            putProduct(product?.id, productData).then( () => {
                displayCorrectlySaved(resetModal());
                setisSaving(false);
            }, () => {
                displayError();   
                setisSaving(false);
            })
        } else {
            postProduct(productData).then( () => {
                displayCorrectlySaved(resetModal());
                setisSaving(false);
            }, () => {
                displayError();   
                setisSaving(false);
            });
        }
       
    }

    useEffect(() => {
        if(isEdit) {
            setproductData({"name": product.name, "description": product.description});
        }
    }, [isEdit])

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
                <AddOrEditProduct productState={productData} handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(e) => hideModal()}>Cerrar</Button>
                <Button 
                            type="submit" 
                            variant={ isSaving ? "secondary" : "primary" } 
                            onClick={handleSaveProduct}>
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

export default AddOrEditModal;
