import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap";
import { faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Ferramenta() {
  const [ferramentas, setFerramentas] = useState([]);
  const {getFerramentaQuantidade} = useGlobalContext();
  const getFerramentas = async () => {
    try {
      const response = await fetch('http://localhost:8080/ferramenta/');
      if (!response.ok) {
        throw new Error('Erro ao buscar ferramentas');
      }
      const data = await response.json();
      setFerramentas(data);
    } catch (error) {
      console.error('Erro ao buscar ferramentas:', error);
    }
  };

  const delFerramenta = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/ferramenta/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Ferramenta excluída com sucesso');
      } else {
        console.error('Erro ao excluir a ferramenta:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error.message);
    }
  }


  useEffect(() => {
    getFerramentas();
  }, [])

  const handleDelete = async codigo => {
    await delFerramenta(codigo);
    await getFerramentas();
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
          {ferramentas.map((ferramenta, index) => <tr key={`${ferramenta.codigo}${index}`}>
            <td>{ferramenta.codigo}</td>
            <td>{ferramenta.descricao}</td>
            <td>{ferramenta.preco}</td>
            <td>{ferramenta.estoque ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</td>
            <td>
              <Button onClick={() => handleDelete(ferramenta.codigo)} size="sm" color="danger" data-value={ferramenta.codigo} title="Apagar"><FontAwesomeIcon icon={faTrash} /></Button>
            </td>
          </tr>)}
        </tbody>
      </Table>
    </main>
  )
}
