import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/orders", req);
    console.log(data);
    return data;
};

const getAll = async(limit, offset) => {
    console.log(limit, offset)
    const data = await axios.get(extendedUrl + `/orders/${limit}/${offset}`);
    console.log(data);
    return data;
};

const findAllBySupplier = async(id, req) => {
    const data = await axios.get(extendedUrl + `/orders/findAllBySupplier/${id}`);
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

const getAllExchanged = async() => {
    const data = await axios.get(extendedUrl + "/orders/exchanged");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/orders/${id}`);
    console.log(data);
    return data;
};

const getBySupplierId = async(id) => {
    const data = await axios.get(extendedUrl + `/orders/supplier/get/${id}`);
    console.log(data);
    return data;
};

const getByBarcode = async(barcode) => {
    const data = await axios.get(extendedUrl + `/barcode/${barcode}`);
    console.log(data);
    return data;
};

const searchBy = async(value, searchby) => {
    const data = await axios.get(extendedUrl + `/orders/${searchby}/${value}`);
    console.log(data);
    return data;
};

const multipleSearch = async(limit, offset, req) => {
    const data = await axios.get(extendedUrl + `/orders/multipleSearch/${limit}/${offset}`, {
        params: req
    });
    console.log(data);
    return data;
};

const multipleSearchReport = async(req) => {
    const data = await axios.get(extendedUrl + `/orders/multipleSearchReport`, {
        params: req
    });
    console.log(data);
    return data;
};

const multipleSearchC = async(req) => {
    const data = await axios.get(extendedUrl + `/orders/multipleSearchC`, {
        params: req
    });
    console.log(data);
    return data;
};


const multipleSearchDash = async(req) => {
    const data = await axios.get(extendedUrl + `/orders/multipleSearchDash`, {
        params: req
    });
    console.log(data);
    return data;
};

const multipleSearchDashPr = async(req) => {
    const data = await axios.get(extendedUrl + `/orders/multipleSearchDashProd`, {
        params: req
    });
    console.log(data);
    return data;
};

const multipleSearchOrderCount = async(req) => {
    const data = await axios.get(extendedUrl + `/orders/multipleSearchOrderCount`, {
        params: req
    });
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

const updateExchanged = async(id, req) => {
    const data = await axios.put(extendedUrl + `/orders/exchange/${id}`, req);
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
    updateCancelled,
    multipleSearch,
    multipleSearchDash,
    getBySupplierId,
    findAllBySupplier,
    getAllExchanged,
    updateExchanged,
    multipleSearchDashPr,
    multipleSearchOrderCount,
    multipleSearchC,
    multipleSearchReport
}