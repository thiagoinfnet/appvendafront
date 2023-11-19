import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const {search} = useGlobalContext()
  const [searchData, setSearchData] = useState([]);

  const getBusca = async () => {
    try {
      const response = await fetch(`http://localhost:8080/busca/${search}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar por ${search}`);
      }
      const data = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error(`Erro ao buscar por: ${search}`, error);
    }
  };

  useEffect(() => {
    getBusca()
  },[search])
  return (
    <>
      <h2>Resultado da busca por: {search}</h2>
      <h3>Encontrados {searchData?.vendedores?.length} vendedores</h3>
      {searchData?.vendedores && <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>email</th>
            <th>produtos</th>
          </tr>
        </thead>
        <tbody>
          {searchData?.vendedores?.map(vendedor => <tr key={`${vendedor.id}`}>
            <td>{vendedor.id}</td>
            <td>{vendedor.nome}</td>
            <td>{vendedor.cpf}</td>
            <td>{vendedor.email}</td>
            <td>{vendedor.produtos.length}</td>
          </tr>)}
        </tbody>
      </Table>}
      <h3>Encontrados {searchData?.produtos?.length} produtos</h3>
      {searchData?.produtos && <Table striped hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>estoque</th>
          </tr>
        </thead>
        <tbody>
          {searchData?.produtos?.map((produto, index) => <tr key={`${produto.codigo}${index}`}>
            <td>{produto.codigo}</td>
            <td>{produto.descricao}</td>
            <td>{produto.preco}</td>
            <td>{produto.estoque ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</td>
          </tr>)}
        </tbody>
      </Table>}
    </>
  )
}
