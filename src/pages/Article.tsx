import Header from "../components/Header";
import ArticleView from "../components/ArticleView";
import { useParams } from "react-router-dom";

function Article() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <>
        <Header currentPage="Articles" />
        <p>記事IDが不正です</p>
      </>
    );
  }

  return (
    <>
      <Header currentPage="Articles" />
      <ArticleView articleId={id} />
    </>
  );
}

export default Article;