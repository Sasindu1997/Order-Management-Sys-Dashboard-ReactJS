import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/subCategory", req);
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/subCategory");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/subCategory/${id}`);
    console.log(data);
    return data;
};

const update = async(req) => {
    const data = await axios.get(extendedUrl + `/subCategory/${id}`, req);
    console.log(data);
    return data;
};

const deletebyId = async(id) => {
    const data = await axios.get(extendedUrl + `/subCategory/${id}`);
    console.log(data);
    return data;
};

export const SubCategoryType = {
    getAll,
    add,
    getById,
    update,
    deletebyId
}