import React  from 'react'
import {  Form } from 'react-bootstrap';


function AddOrEditProduct ({productState={}, handleChange = () => {}}) {

    const onChange = ({ target: { name, value } }) => {
        handleChange({ ...productState, [name]: value });
    };

    return (
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="name" onChange={onChange} type="text" value={productState?.name} placeholder="Nombre del producto" />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" >
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="description" onChange={onChange} type="text" value={productState?.description} placeholder="Descripción del producto" />
        </Form.Group>
        <br />
        </Form>
    )
}

export default AddOrEditProduct;
