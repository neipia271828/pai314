import Header from "../components/Header"
import { Link } from "react-router-dom"

function Articles() {
    return(
        <>
            <Header currentPage="Articles"/>
            <Link to="/articles/12-20-0">記事タイトル</Link>
        </>
    )
}

export default Articles