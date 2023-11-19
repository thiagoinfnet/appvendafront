import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({})

export function useGlobalContext() {
  const context = useContext(GlobalContext)
  return context
}

export function GlobalProvider({children}) {
  const [vendedorQuantidade, setVendedorQuantidade] = useState(0);
  const [produtoQuantidade, setProdutoQuantidade] = useState(0);
  const [lanternaQuantidade, setLanternaQuantidade] = useState(0);
  const [ferramentaQuantidade, setFerramentaQuantidade] = useState(0);
  const [search, setSearch] = useState('');

  const getVendedorQuantidade = async () => {
    try {
      const response = await fetch('http://localhost:8080/vendedor/count/');
      if (!response.ok) {
        throw new Error('Erro ao buscar quantidade de vendedores');
      }
      const data = await response.json();
      setVendedorQuantidade(data);
    } catch (error) {
      console.error('Erro ao buscar quantidade de vendedores:', error);
    }
  }

  const getQuantidadeProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produto/count/');
      if (!response.ok) {
        throw new Error('Erro ao buscar quantidade de produtos');
      }
      const data = await response.json();
      setProdutoQuantidade(data);
    } catch (error) {
      console.error('Erro ao buscar quantidade de produtos:', error);
    }
  };

  const getLanternaQuantidade = async () => {
    try {
      const response = await fetch('http://localhost:8080/lanterna/count/');
      if (!response.ok) {
        throw new Error('Erro ao buscar lanternas');
      }
      const data = await response.json();
      setLanternaQuantidade(data);
    } catch (error) {
      console.error('Erro ao buscar lanternas:', error);
    }
  };

  const getFerramentaQuantidade = async () => {
    try {
      const response = await fetch('http://localhost:8080/ferramenta/count/');
      if (!response.ok) {
        throw new Error('Erro ao buscar ferramentas');
      }
      const data = await response.json();
      setFerramentaQuantidade(data);
    } catch (error) {
      console.error('Erro ao buscar ferramentas:', error);
    }
  };

  useEffect(() => {
    getVendedorQuantidade();
    getQuantidadeProdutos();
    getLanternaQuantidade();
    getFerramentaQuantidade();
  }, [])
  
  return (
    <GlobalContext.Provider value={{
      vendedorQuantidade,
      getVendedorQuantidade,
      produtoQuantidade,
      getQuantidadeProdutos,
      lanternaQuantidade,
      getLanternaQuantidade,
      ferramentaQuantidade,
      getFerramentaQuantidade,
      search,
      setSearch
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
