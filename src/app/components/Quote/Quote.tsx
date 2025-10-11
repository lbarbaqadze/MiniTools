import styles from "./Quote.module.scss"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

interface QuoteData {
    quote: string;
    author: string;
}

export default function Quote() {
    const [quoteData, setQuoteData] = useState<QuoteData>({ quote: "", author: "" });
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://dummyjson.com/quotes/random");
            const data = await res.json();
            setQuoteData({
                quote: data.quote,
                author: data.author
            });
        } catch (err) {
            console.error("Quote fetch error:", err);
            setQuoteData({ quote: "Failed to load quote", author: "" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.cont1}>
                <h1 className={styles.h1}>Quote</h1>
                <FontAwesomeIcon icon={faQuoteLeft} className={styles.icon} />
            </div>

            <div className={styles.cont2}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <p>{quoteData.quote}</p>
                        <p className={styles.p}>— {quoteData.author}</p>
                    </>
                )}
            </div>

            <button className={styles.button} onClick={fetchQuote}>
                New Quote
            </button>
        </div>
    );
}
