import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap";
import { faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Lanterna() {
  const [produtos, setProdutos] = useState([]);
  const getLanternas = async () => {
    try {
      const response = await fetch('http://localhost:8080/lanterna/');
      if (!response.ok) {
        throw new Error('Erro ao buscar lanternas');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar lanternas:', error);
    }
  };
  
  const delLanterna = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/lanterna/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Lanterna excluída com sucesso');
      } else {
        console.error('Erro ao excluir a lanterna:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error.message);
    }
  }

  useEffect(() => {
    getLanternas();
  }, [])

  const handleDelete = (codigo) => {
    delLanterna(codigo)
    getLanternas();
  }

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Código</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>estoque</th>
          <th>led</th>
          <th>bateria</th>
          <th>ação</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, index) => <tr key={`${produto.codigo}${index}`}>
          <td>{produto.codigo}</td>
          <td>{produto.descricao}</td>
          <td>{produto.preco}</td>
          <td>{produto.estoque ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</td>
          <td>{produto.led}</td>
          <td>{produto.bateria}</td>
          <td>
            <Button onClick={() => handleDelete(produto.codigo)} size="sm" color="danger" data-value={produto.codigo} title="Apagar"><FontAwesomeIcon icon={faTrash} /></Button>
          </td>
        </tr>)}
      </tbody>
    </Table>
  )
}
