import axios from "axios";
axios.defaults.withCredentials = false;

export const getPRDatas = async (owner, repo) => {
    const { data } = await axios.get("/pull/" + owner + "/" + repo);
    return data;
};

export const getPoints = async (owner, repo, branch) => {
    const { data } = await axios.get(`/point/${owner}/${repo}/${branch}`);
    return data;
};
