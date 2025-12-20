import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Articles from "./pages/Articles";
import Links from "./pages/Links";
import Article from "./pages/Article"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/links" element={<Links />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App