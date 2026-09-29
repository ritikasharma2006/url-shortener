import { useState } from "react";
import useUrlHistory from "../../hooks/useUrlHistory";
import API_BASE_URL from "../../config/app";
import "./history.scss";

const History = () => {
    const {
        history,
        loading,
        error,
        deleteUrl,
    } = useUrlHistory();

    const [expanded, setExpanded] = useState(false);

    const visibleHistory = expanded
        ? history
        : history.slice(0, 3);

    const handleCopy = async (shortUrl) => {
        await navigator.clipboard.writeText(shortUrl);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this URL?"
        );

        if (!confirmed) {
            return;
        }

        await deleteUrl(id);
    };

    return (
        <section className="history">
            <div className="history__header">
                <div>
                    <p className="history__eyebrow">
                        RECENT LINKS
                    </p>

                    <h2>URL History</h2>
                </div>

                {history.length > 0 && (
                    <button
                        type="button"
                        className="history__toggle"
                        onClick={() =>
                            setExpanded((current) => !current)
                        }
                    >
                        {history.length} links
                        <span>
                            {expanded ? "↑" : "↓"}
                        </span>
                    </button>
                )}
            </div>

            {loading && (
                <p className="history__message">
                    Loading history...
                </p>
            )}

            {error && (
                <p className="history__message history__message--error">
                    {error}
                </p>
            )}

            {!loading && !error && history.length === 0 && (
                <p className="history__message">
                    No shortened URLs yet.
                </p>
            )}

            {!loading && !error && history.length > 0 && (
                <>
                    <div className="history__list">
                        {visibleHistory.map((item) => {
                            const shortUrl =
                                `${API_BASE_URL}/${item.shortCode}`;

                            return (
                                <div
                                    className="history__item"
                                    key={item._id}
                                >
                                    <div className="history__details">
                                        <span className="history__code">
                                            {item.shortCode}
                                        </span>

                                        <p className="history__original">
                                            {item.originalUrl}
                                        </p>
                                    </div>

                                    <div className="history__meta">
                                        <span>
                                            {item.clicks} clicks
                                        </span>

                                        <div className="history__actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleCopy(shortUrl)
                                                }
                                            >
                                                Copy
                                            </button>

                                            <a
                                                href={shortUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Open →
                                            </a>

                                            <button
                                                type="button"
                                                className="history__delete"
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {history.length > 3 && (
                        <button
                            type="button"
                            className="history__show-more"
                            onClick={() =>
                                setExpanded((current) => !current)
                            }
                        >
                            {expanded
                                ? "Show less ↑"
                                : "Show more ↓"}
                        </button>
                    )}
                </>
            )}
        </section>
    );
};

export default History;