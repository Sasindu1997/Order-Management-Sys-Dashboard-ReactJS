import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/rawMats", req);
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/rawMats");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/rawMats/${id}`);
    console.log(data);
    return data;
};

const update = async(id, req) => {
    const data = await axios.get(extendedUrl + `/rawMats/${id}`, req);
    console.log(data);
    return data;
};

const deletebyId = async(id) => {
    const data = await axios.get(extendedUrl + `/rawMats/${id}`);
    console.log(data);
    return data;
};

export const RawMatsType = {
    getAll,
    add,
    getById,
    update,
    deletebyId
}