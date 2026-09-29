import { useState } from "react";
import API_BASE_URL from "../../config/app";
import "./result-card.scss";

const ResultCard = ({ shortCode }) => {
    const [copied, setCopied] = useState(false);

    const shortUrl = `${API_BASE_URL}/${shortCode}`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="result-card">
            <div className="result-card__header">
                <span className="result-card__label">
                    SHORTENED URL
                </span>

                <span className="result-card__status">
                    Ready
                </span>
            </div>

            <div className="result-card__url-row">
                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="result-card__url"
                >
                    {shortUrl}
                </a>

                <button
                    type="button"
                    onClick={handleCopy}
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            <div className="result-card__footer">
                <span>
                    Redirects to your original URL
                </span>

                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open →
                </a>
            </div>
        </div>
    );
};

export default ResultCard;