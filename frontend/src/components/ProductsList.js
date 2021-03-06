import DataTable from 'react-data-table-component';

import React, { useEffect, useState } from 'react'
import { productsTableColumns } from '../helpers/productsTableColumns';
import { deleteProduct, getProducts } from '../services/productServices';
import { Form, Spinner } from 'react-bootstrap';
import useDataTableColumns from '../hooks/useDataTableColumns';
import InfoModal from './modals/InfoModal';
import AddOrEditModal from './modals/AddOrEditModal';
import { onDeleteDialog } from '../helpers/onDeleteDialog';
import { displayCorrectlySaved } from '../helpers/displayCorrectlySaved';
import { displayError } from '../helpers/displayError';

function ProductsList () {

    const [products, setproducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const [ModalInfo, setModalInfo] = useState({
        show: false,
        product: {}
    });
    const [addOrEditModalState, setaddOrEditModalState] = useState({
        show:false,
        isEdit:false,
        product: {}
    });
    const [searchInput, setsearchInput] = useState({
        value: ""
    });

    const handleShowModalInfo = (product) => {
        setModalInfo(state => ({ ...state, show: !state.show, product: product }));
        getData();
    };

    const handleSearchInput = ({ target: { name, value } }) => {
        setsearchInput({ ...searchInput, [name]:value })
    };

    const handleKeyDown = (event) => {
        const filteredProducts = products.filter(p => p.name.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase()));
        setfilteredProducts(filteredProducts);
    }


    const handleShowModaladdOrEdit = (product) => {
        setaddOrEditModalState(state => ({ ...state, show: !state.show, product: product, isEdit: product ? (true): (false) }));
    };

    const resetAddModal = () => {
        setaddOrEditModalState({"addOrEditModalState.show": !addOrEditModalState.show, "product": {}, "isEdit": false});
        getData();
    }


    const columns = useDataTableColumns({
        columns: productsTableColumns,
        onView: (product) => {
            handleShowModalInfo(product);
        },
        onEdit: (product) => {
            handleShowModaladdOrEdit(product);
        },
        onDelete: (product) => {
            onDeleteDialog(() => {
                debugger;
                deleteProduct(product.id).then( () => {
                    displayCorrectlySaved(() => getData());
                } , () => {
                    displayError();
                })
            })
        }
    });

    const getData = () => {
        setisLoading(true);
        getProducts().then( products => {
            setproducts( products);
            setisLoading(false);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
         <br />
            <div className='d-flex justify-content-between w-100'>
                <div className="col-md-5">
                    <h3>Listado de productos</h3>
                </div>
                <div className="col-md-5 text-end">
                    <button
                        className='btn btn-sm btn-primary'
                        onClick={ () => { handleShowModaladdOrEdit() } }
                    >
                        Agregar Nuevo
                    </button>
                </div>
            </div>
            <br />
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="value"
                        placeholder="Buscar por nombre de producto"
                        value={searchInput.value}
                        onChange={handleSearchInput}
                        onKeyDown={handleKeyDown}
                    />
                </Form.Group>
            </Form>
            <br />
            <DataTable
                pagination
                data={ searchInput.value.length > 0 ? filteredProducts : products }
                columns={ columns }
                progressPending={ isLoading }
                progressComponent={ <Spinner animation='border' /> }
            />

            {
                ModalInfo.show ? (
                    <InfoModal  
                        product={ModalInfo.product} 
                        showModal={ModalInfo.show} 
                        handleShow={handleShowModalInfo} 
                    />
                ) : (null)
            }
            {
                addOrEditModalState.show ? 
                (
                    <AddOrEditModal 
                            product={addOrEditModalState.product} 
                            showModal={addOrEditModalState.show} 
                            handleShow={handleShowModaladdOrEdit} 
                            isEdit={addOrEditModalState.isEdit} 
                            resetModal={resetAddModal}
                    />
                ) 
                : (null)
            }
        </>
    )
}

export default ProductsList;
