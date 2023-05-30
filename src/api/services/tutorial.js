import axios from "axios";
import { BASE_URL } from '../../config.env'
const swapapi = "https://swapi.dev/api";

const baseUrl = BASE_URL;

const fetchDataWithAxios = async() => {
    console.log(process.env)
    const { data } = await axios.get(baseUrl + "/people");
    console.log(data);
};

const getAllTutorials = async() => {
    const { data } = await axios.get(BASE_URL + "/api/tutorials");
    console.log(data);
};

export const tutorialType = {
    fetchDataWithAxios,
    getAllTutorials
}