import axios from "axios";

export async function getProducts() {
    const {data} = await axios.get("https://localhost:7220/api/products");
    return data
}

export async function getColors() {
    const {data} = await axios.get("https://localhost:7220/api/products/colors");
    return data;
}

export async function getProduct(id) {
    const {data} = await axios.get(`https://localhost:7220/api/products/${id}`);
    return data;
}

export async function postProduct(product) {
    const action = axios.post("https://localhost:7220/api/products", product);
    await action;
}

export async function putProduct(id, product) {
    const action = axios.put(`https://localhost:7220/api/products/${id}`, {...product});
    await action;
}

export async function deleteProduct(id) {
    const action = axios.delete(`https://localhost:7220/api/products/${id}`);
    await action;
}