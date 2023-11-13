import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap";
import { faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Ferramenta() {
  const [produtos, setProdutos] = useState([]);
  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/ferramenta/');
      if (!response.ok) {
        throw new Error('Erro ao buscar ferramentas');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar ferramentas:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [])

  const handleDelete = (codigo) => {
    console.log('Apagar', codigo)
  }

  return (
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
            <Button onClick={() => handleDelete(produto.codigo)} size="sm" color="danger" data-value={produto.codigo} title="Apagar"><FontAwesomeIcon icon={faTrash} /></Button>
          </td>
        </tr>)}
      </tbody>
    </Table>
  )
}
