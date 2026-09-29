import { useState } from "react";
import urlService from "../services/urlService";

const useShortenUrl = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const shortenUrl = async (originalUrl) => {
        setLoading(true);
        setError(null);

        try {
            const data = await urlService.shortenURL(originalUrl);

            setResult(data);

            return data;
        } catch (error) {
            setError(
                error.response?.data?.error ||
                "Something went wrong. Please try again."
            );

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        shortenUrl,
        loading,
        error,
        result,
    };
};

export default useShortenUrl;