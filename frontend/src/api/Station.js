import axios from "axios";
axios.defaults.withCredentials = false;

export const getPRDatas = async (owner, repo) => {
    const { data } = await axios.get("/pull/" + owner + "/" + repo);
    return data;
};
