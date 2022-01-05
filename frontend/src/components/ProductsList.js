import DataTable from 'react-data-table-component';

import React, { useEffect, useState } from 'react'
import { productsTableColumns } from '../helpers/productsTableColumns';
import { getProducts } from '../services/productServices';
import { Spinner } from 'react-bootstrap';
import useDataTableColumns from '../hooks/useDataTableColumns';

function ProductsList () {

    const [products, setproducts] = useState([]);
    const [isLoading, setisLoading] = useState(false);


    const columns = useDataTableColumns({
        columns: productsTableColumns,
        onView: () => {

        },
        onEdit: (products) => {
           
        },
        onDelete: (destinations) => {
            // onDeleteDialog(() => {
            //     // deleteDestinationPlace(destinations.id).then( () => {
            //     //     displayCorrectlySaved(() => getData());
            //     // } , () => {
            //     //     displayError();
            //     // })
            // })
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
                        onClick={ () => {  } }
                    >
                        Agregar Nuevo
                    </button>
                </div>
            </div>
            <br />
            <DataTable
                pagination
                data={ products }
                columns={ columns }
                progressPending={ isLoading }
                progressComponent={ <Spinner animation='border' /> }
            />
        </>
    )
}

export default ProductsList;
