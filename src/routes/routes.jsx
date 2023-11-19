import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../components/header";
import CounterBadges from "../components/counterBadges";
import Home from "../views/home";
import Vendedor from "../views/vendedor";
import Produto from "../views/produto";
import Lanterna from "../views/lanterna";
import Ferramenta from "../views/ferramenta";
import { useGlobalContext } from "../contexts/GlobalContext";
import Search from "../views/search";

export default function MainRoutes() {
  const {search} = useGlobalContext();
  return (
    <Router>
      <Header color="dark" dark expand="md" />
      <div className="container">
        <CounterBadges/>
        {search.length < 3 ?
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/vendedor" exact element={<Vendedor />} />
          <Route path="/produto" exact element={<Produto />} />
          <Route path="/lanterna" exact element={<Lanterna />} />
          <Route path="/ferramenta" exact element={<Ferramenta />} />
        </Routes>
        :
        <Search/>
        }
      </div>
    </Router>
  )
}
