import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/orders", req);
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/orders");
    console.log(data);
    return data;
};

const getAllReturned = async() => {
    const data = await axios.get(extendedUrl + "/orders/returned");
    console.log(data);
    return data;
};

const getAllCancelled = async() => {
    const data = await axios.get(extendedUrl + "/orders/cancelled");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/orders/${id}`);
    console.log(data);
    return data;
};

const getByBarcode = async(barcode) => {
    const data = await axios.get(extendedUrl + `/orders/barcode/${barcode}`);
    console.log(data);
    return data;
};

const searchBy = async(value, searchby) => {
    const data = await axios.get(extendedUrl + `/orders/${searchby}/${value}`);
    console.log(data);
    return data;
};

const update = async(id, req) => {
    const data = await axios.put(extendedUrl + `/orders/${id}`, req);
    console.log(data);
    return data;
};

const updateCancelled = async(id, req) => {
    const data = await axios.put(extendedUrl + `/orders/cancel/${id}`, req);
    console.log(data);
    return data;
};

const updateReturned = async(id, req) => {
    const data = await axios.put(extendedUrl + `/orders/return/${id}`, req);
    console.log(data);
    return data;
};

const deletebyId = async(id) => {
    const data = await axios.delete(extendedUrl + `/orders/${id}`);
    console.log(data);
    return data;
};

const weeklyOrderCount = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/weeklyOrderCount");
    console.log(data);
    return data;
};
const yearlyOrderCount = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/yearlyOrderCount");
    console.log(data);
    return data;
};
const getAllProductOrders = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/getAllProductOrders");
    console.log(data);
    return data;
};
const thisMonthOrderCount = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/thisMonthOrderCount");
    console.log(data);
    return data;
};
const monthlyOrderCount = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/monthlyOrderCount");
    console.log(data);
    return data;
};
const todayOrderCount = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/todayOrderCount");
    console.log(data);
    return data;
};
const newCustomersCount = async() => {
    const data = await axios.get(extendedUrl + "/dashboard/newCustomersCount");
    console.log(data);
    return data;
};


export const OrderType = {
    getAll,
    add,
    getById,
    getByBarcode,
    update,
    deletebyId,
    searchBy,
    weeklyOrderCount,
    yearlyOrderCount,
    getAllProductOrders,
    thisMonthOrderCount,
    monthlyOrderCount,
    todayOrderCount,
    newCustomersCount,
    getAllReturned,
    getAllCancelled,
    updateReturned,
    updateCancelled
}