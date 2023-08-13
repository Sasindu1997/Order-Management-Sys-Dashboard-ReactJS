import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/expenses", req);
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/expenses");
    console.log(data);
    return data;
};

const getAllThisMonth = async() => {
    const data = await axios.get(extendedUrl + "/expenses/thisMonth");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/expenses/${id}`);
    console.log(data);
    return data;
};

const update = async(id, req) => {
    const data = await axios.put(extendedUrl + `/expenses/${id}`, req);
    console.log(data);
    return data;
};

const deletebyId = async(id) => {
    const data = await axios.delete(extendedUrl + `/expenses/${id}`);
    console.log(data);
    return data;
};

export const ExpenseType = {
    getAll,
    add,
    getById,
    update,
    deletebyId,
    getAllThisMonth
}