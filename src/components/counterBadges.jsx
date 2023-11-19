import { Badge } from "reactstrap";
import { useGlobalContext } from "../contexts/GlobalContext"

export default function CounterBadges() {
  const {vendedorQuantidade, produtoQuantidade, lanternaQuantidade, ferramentaQuantidade} = useGlobalContext();
  return (
    <section>
      <Badge color="primary" style={{marginLeft: '10px'}} className="mt-3 mb-4">Quantidade de Vendedores: {vendedorQuantidade}</Badge>
      <Badge style={{marginLeft: '10px'}} className="mt-3 mb-4">Quantidade de Produtos: {produtoQuantidade}</Badge>
      <Badge color="success" style={{marginLeft: '10px'}} className="mt-3 mb-4">Quantidade de Lanternas: {lanternaQuantidade}</Badge>
      <Badge color="danger" style={{marginLeft: '10px'}} className="mt-3 mb-4">Quantidade de Ferramentas: {ferramentaQuantidade}</Badge>
    </section>
  )
}
