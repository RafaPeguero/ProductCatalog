import React, { useEffect, useState } from 'react'
import {  Form } from 'react-bootstrap';
import { getColors } from '../services/productServices';


function ProductDetailForm({productDetail={}, handleChange = () => {}}) {

    const [colors, setcolors] = useState([]);


    const getData = () => {
        getColors().then( colors => {
            setcolors(colors);
        });
    };

    useEffect(() => {
            getData();
    }, []);

    const onChange = ({ target: { name, value } }) => {
        handleChange({ ...productDetail, [name]: value });
    };

     return (
        <Form>
            <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Select  onChange={onChange} name="colorId" value={productDetail?.colorId} aria-label="Default select example">
                    <option>Seleccione un color</option>
                    {
                        colors.map( (i, index) => (
                            <option key={index} value={i?.id}>{i?.name}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <br />
    
            <Form.Group className="mb-3" >
                <Form.Label>Precio</Form.Label>
                <Form.Control name="price" onChange={onChange} type="number" value={productDetail?.price} placeholder="Precio del producto" />
            </Form.Group>
        </Form>
    )
}

export default ProductDetailForm;
