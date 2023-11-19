import { faTrash, faArrowDownZA, faArrowDown91, faArrowDown19, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap";
import { useGlobalContext } from "../contexts/GlobalContext";
import './vendedor.css'

export default function Vendedor() {
  const [vendedores, setVendedores] = useState([]);
  const [orderedVendedores, setOrderedVendedores] = useState([])
  const {getVendedorQuantidade} = useGlobalContext()
  const [isAscending, setIsAscending] = useState(true)
  const [isIdActive, setIsIdActive] = useState(true);
  const [isNomeActive, setIsNomeActive] = useState(false);
  const [isCpfActive, setIsCpfActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isProdutosActive, setIsProdutosActive] = useState(false);
  
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

  const sort = (field, isString) => {
    let sortedVendedores = [...vendedores]
    sortedVendedores.sort((a,b) => {
      let auxA, auxB;
      if(isString) {
        auxA = a[field].toUpperCase();
        auxB = b[field].toUpperCase();
      } else {
        auxA = a[field];
        auxB = b[field];
      }

      let result = 0

      if (auxA < auxB) {
        result = -1;
      }

      if (auxA > auxB) {
        result = 1;
      }
      return isAscending ? result : -result;
    })

    setOrderedVendedores([...sortedVendedores])
  }

  const handleId = () => {
    sort('id', false);
    setIsAscending(!isAscending)
    setIsIdActive(true);
    setIsNomeActive(false)
    setIsCpfActive(false)
    setIsEmailActive(false)
    setIsProdutosActive(false)
  }
  const handleNome = () => {
    sort('nome', true);
    setIsAscending(!isAscending)
    setIsIdActive(false);
    setIsNomeActive(true)
    setIsCpfActive(false)
    setIsEmailActive(false)
    setIsProdutosActive(false)
  }
  const handleCpf = () => {
    sort('cpf', false);
    setIsAscending(!isAscending)
    setIsIdActive(false);
    setIsNomeActive(false)
    setIsCpfActive(true)
    setIsEmailActive(false)
    setIsProdutosActive(false)
  }
  const handleEmail = () => {
    sort('email', true);
    setIsAscending(!isAscending)
    setIsIdActive(false);
    setIsNomeActive(false)
    setIsCpfActive(false)
    setIsEmailActive(true)
    setIsProdutosActive(false)
  }
  const handleProdutos = () => {
    sort('produtos', false);
    setIsAscending(!isAscending)
    setIsIdActive(false);
    setIsNomeActive(false)
    setIsCpfActive(false)
    setIsEmailActive(false)
    setIsProdutosActive(true)
  }

  useEffect(() => {
    getVendedores();
  }, [])

  useEffect(() => {
    if(vendedores.length) {
      setOrderedVendedores(vendedores)
    }
  }, [vendedores])

  const handleDelete = async id => {
    await delVendedor(id)
    await getVendedores()
    await getVendedorQuantidade()
  }
  function Thead({title, isAscending, string, isActive, handleClick}) {
    const isString = !!string
    function Icone() {
      let iconComponent;
      if (isString && isAscending) {
        iconComponent = <FontAwesomeIcon icon={faArrowDownZA} />;
      } else if (isString && !isAscending) {
        iconComponent = <FontAwesomeIcon icon={faArrowDownAZ} />;
      } else if (!isString && isAscending) {
        iconComponent = <FontAwesomeIcon icon={faArrowDown91} />;
      } else {
        iconComponent = <FontAwesomeIcon icon={faArrowDown19} />;
      }
    
      return (
        <>
          {iconComponent}
        </>
      );
    }
    return (
      <th onClick={handleClick} className={`thead ${isActive ? 'active' : ''}`}>
        <div className="thead-container">{title}
        {isActive && <Icone/>}
        </div>
      </th>
    )
  }
  return (
    <main>
      <Table striped hover>
        <thead>
          <tr>
            <Thead isAscending={isAscending} isActive={isIdActive} handleClick={handleId} title="#" active/>
            <Thead isAscending={isAscending} isActive={isNomeActive} handleClick={handleNome} title="Nome" string/>
            <Thead isAscending={isAscending} isActive={isCpfActive} handleClick={handleCpf} title="CPF"/>
            <Thead isAscending={isAscending} isActive={isEmailActive} handleClick={handleEmail} title="email" string/>
            <Thead isAscending={isAscending} isActive={isProdutosActive} handleClick={handleProdutos} title="produtos"/>
            <th >ação</th>
          </tr>
        </thead>
        <tbody>
          {orderedVendedores.map(vendedor => <tr key={`${vendedor.id}`}>
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
    </main>
  )
}
