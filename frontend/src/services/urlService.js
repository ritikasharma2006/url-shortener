import apiClient from "../api/apiClient";

const shortenURL = async (originalUrl) => {
    const response = await apiClient.post("/api/shorten", {
        originalUrl,
    });

    return response.data;
};

const getHistory = async () => {
    const response = await apiClient.get("/api/history");

    return response.data;
};

const deleteUrl = async (id) => {
    const response = await apiClient.delete(`/api/history/${id}`);

    return response.data;
};

export default {
    shortenURL,
    getHistory,
    deleteUrl,
};