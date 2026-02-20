import Header from "../components/Header"
import Me from "../components/Me"
import Link from "../components/Link"
import MonteCarloPi from "../components/MonteCarloPi"

function Home() {
    return (
        <>
            <Header currentPage="Pai314" transparent />
            <MonteCarloPi />
            <Me />
            <Link />
        </>
    )
}

export default Home