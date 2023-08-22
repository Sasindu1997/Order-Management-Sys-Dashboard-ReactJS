import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/stocks", req);
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/stocks");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/stocks/${id}`);
    console.log(data);
    return data;
};

const getByProductId = async(id) => {
    const data = await axios.get(extendedUrl + `/stocks/byproduct/${id}`);
    console.log(data);
    return data;
};

const findByProductIdAndType = async(id, type) => {
    const data = await axios.get(extendedUrl + `/stocks/byproduct/${type}/${id}`);
    console.log(data);
    return data;
};

const update = async(id, req) => {
    const data = await axios.put(extendedUrl + `/stocks/${id}`, req);
    console.log(data);
    return data;
};

const deletebyId = async(stocktype, id) => {
    const data = await axios.delete(extendedUrl + `/stocks/${id}/${stocktype}`);
    console.log(data);
    return data;
};

export const StockType = {
    getAll,
    add,
    getById,
    update,
    deletebyId,
    getByProductId,
    findByProductIdAndType
}