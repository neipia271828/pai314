import { Link } from "react-router-dom";
import styles from "../styles/ArticleCard.module.css";

type Props = {
    id: string;
    title: string;
    date: string;
    summary: string;
};

function ArticleCard({ id, title, date, summary }: Props) {
    return (
        <Link to={`/articles/${id}`} className={styles.card}>
        <h3>{title}</h3>
        <time>{date}</time>
        <p>{summary}</p>
        </Link>
    );
}

export default ArticleCard;