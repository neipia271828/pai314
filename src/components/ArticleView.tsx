import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
    articleId: string;
};

function ArticleView({ articleId }: Props) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/articles/${articleId}.md`)
        .then(res => {
            if (!res.ok) {
            throw new Error("記事が見つかりません");
            }
            return res.text();
        })
        .then(text => {
            // frontmatter を単純に削除
            const body = text.replace(/^---[\s\S]*?---/, "").trim();
            setContent(body);
        })
        .catch(() => {
            setContent("# 記事が見つかりません");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [articleId]);

    if (loading) return <p>読み込み中...</p>;

    return (
        <article>
        <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    );
}

export default ArticleView;