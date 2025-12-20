import { useEffect, useState } from "react";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";

type ArticleMeta = {
    id: string;
    title: string;
    date: string;
    summary: string;
};

function Articles() {
    const [articles, setArticles] = useState<ArticleMeta[]>([]);

    useEffect(() => {
        fetch("/articles/index.json")
        .then(res => res.json())
        .then(data => setArticles(data));
    }, []);

    return (
        <>
        <Header currentPage="Articles" />
        <section style={{ maxWidth: 900, margin: "40px auto" }}>
            <h2>記事一覧</h2>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 24,
                marginTop: 24
            }}
            >
            {articles.map(article => (
                <ArticleCard key={article.id} {...article} />
            ))}
            </div>
        </section>
        </>
    );
}

export default Articles;