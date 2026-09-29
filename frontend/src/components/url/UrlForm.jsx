import { useState } from "react";
import useShortenUrl from "../../hooks/useShortenUrl";
import "./url-form.scss";
import ResultCard from "./ResultCard";

const UrlForm = () => {
    const [originalUrl, setOriginalUrl] = useState("");

    const {
        shortenUrl,
        loading,
        error,
        result,
    } = useShortenUrl();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!originalUrl.trim()) {
            return;
        }

        await shortenUrl(originalUrl);
    };

    return (
        <div className="url-form">
            <form
                className="url-form__input-wrapper"
                onSubmit={handleSubmit}
            >
                <input
                    type="url"
                    value={originalUrl}
                    onChange={(event) => setOriginalUrl(event.target.value)}
                    placeholder="Paste your long URL here"
                    aria-label="Long URL"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Shortening..." : "Shorten URL"}
                </button>
            </form>

            {error && (
                <p className="url-form__error">
                    {error}
                </p>
            )}

            {result && <ResultCard shortCode={result.shortCode} />}
        </div>
    );
};

export default UrlForm;