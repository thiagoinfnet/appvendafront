import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap";

export default function Vendedor() {
  const [vendedores, setVendedores] = useState([]);
  
  const getVendedores = async () => {
    try {
      const response = await fetch('http://localhost:8080/vendedor/');
      if (!response.ok) {
        throw new Error('Erro ao buscar vendedores');
      }
      const data = await response.json();
      setVendedores(data);
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error);
    }
  };

  const delVendedor = async id => {
    try {
      const response = await fetch(`http://localhost:8080/vendedor/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Vendedor excluída com sucesso');
      } else {
        console.error('Erro ao excluir o vendedor:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error.message);
    }
  }

  useEffect(() => {
    getVendedores();
  }, [])

  const handleDelete = async id => {
    await delVendedor(id)
    await getVendedores()
  }
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>email</th>
          <th>produtos</th>
          <th>ação</th>
        </tr>
      </thead>
      <tbody>
        {vendedores.map(vendedor => <tr key={`${vendedor.id}`}>
          <td>{vendedor.id}</td>
          <td>{vendedor.nome}</td>
          <td>{vendedor.cpf}</td>
          <td>{vendedor.email}</td>
          <td>{vendedor.produtos.length}</td>
          <td>
          <Button onClick={() => handleDelete(vendedor.id)} size="sm" color="danger" data-value={vendedor.id} title="Apagar"><FontAwesomeIcon icon={faTrash} /></Button>
          </td>
        </tr>)}
      </tbody>
    </Table>
  )
}
