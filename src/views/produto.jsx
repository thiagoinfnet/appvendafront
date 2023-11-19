import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap";
import { faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  const {getQuantidadeProdutos, getLanternaQuantidade, getFerramentaQuantidade} = useGlobalContext()
  const getProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produto/');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const delProduto = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/produto/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Produto excluída com sucesso');
      } else {
        console.error('Erro ao excluir o produto:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error.message);
    }
  }

  useEffect(() => {
    getProdutos();
  }, [])

  const handleDelete = async codigo => {
    await delProduto(codigo);
    await getProdutos();
    await getQuantidadeProdutos();
    await getLanternaQuantidade();
    await getFerramentaQuantidade();
  }

  return (
    <main>
      <Table striped hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>estoque</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => <tr key={`${produto.codigo}${index}`}>
            <td>{produto.codigo}</td>
            <td>{produto.descricao}</td>
            <td>{produto.preco}</td>
            <td>{produto.estoque ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</td>
            <td>
              {/* <Button onClick={() => handleEdit(produto.codigo)} style={{marginRight: '5px'}} data-value={produto.codigo} size="sm" color="primary" title="Editar"><FontAwesomeIcon icon={faPenToSquare} /></Button> */}
              <Button onClick={() => handleDelete(produto.codigo)} size="sm" color="danger" data-value={produto.codigo} title="Apagar"><FontAwesomeIcon icon={faTrash} /></Button>
            </td>
          </tr>)}
        </tbody>
      </Table>
    </main>
  )
}
