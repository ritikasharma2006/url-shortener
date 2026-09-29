import { useEffect, useState } from "react";
import urlService from "../services/urlService";

const useUrlHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await urlService.getHistory();
            setHistory(data);
        } catch (error) {
            setError("Failed to load URL history.");
        } finally {
            setLoading(false);
        }
    };

    const deleteUrl = async (id) => {
        try {
            await urlService.deleteUrl(id);

            setHistory((currentHistory) =>
                currentHistory.filter((item) => item._id !== id)
            );
        } catch (error) {
            setError("Failed to delete URL.");
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return {
        history,
        loading,
        error,
        fetchHistory,
        deleteUrl,
    };
};

export default useUrlHistory;