import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import style from "../styles/ArticleView.module.css";

type Props = {
    articleId: string;
};

function ArticleView({ articleId }: Props) {
    const [content, setContent] = useState("");
    const [loadedArticleId, setLoadedArticleId] = useState<string | null>(null);
    const loading = loadedArticleId !== articleId;

    useEffect(() => {
        let cancelled = false;

        fetch(`${import.meta.env.BASE_URL}articles/${articleId}.md`)
        .then(res => {
            if (!res.ok) {
            throw new Error("記事が見つかりません");
            }
            return res.text();
        })
        .then(text => {
            if (cancelled) return;
            // frontmatter を単純に削除
            const body = text.replace(/^---[\s\S]*?---/, "").trim();
            setContent(body);
            setLoadedArticleId(articleId);
        })
        .catch(() => {
            if (cancelled) return;
            setContent("# 記事が見つかりません");
            setLoadedArticleId(articleId);
        })

        return () => {
            cancelled = true;
        };
    }, [articleId]);

    if (loading) return <p>読み込み中...</p>;

    return (
        <article className={style.article}>
        <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    );
}

export default ArticleView;
