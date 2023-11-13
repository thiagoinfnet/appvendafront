import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header'
import Home from './views/home';
import Vendedor from './views/vendedor';
import Produto from './views/produto';
import Lanterna from './views/lanterna';
import Ferramenta from './views/ferramenta';

function App() {

  return (
    <Router>
      <Header color="dark" dark expand="md" />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/vendedor" exact element={<Vendedor />} />
        <Route path="/produto" exact element={<Produto />} />
        <Route path="/lanterna" exact element={<Lanterna />} />
        <Route path="/ferramenta" exact element={<Ferramenta />} />

      </Routes>
    </Router>
  )
}

export default App
