import { useGlobalContext } from "../contexts/GlobalContext"

export default function FormSearch() {
  const {search, setSearch} = useGlobalContext()

  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
    <form className="form-inline my-2 my-lg-0">
      <input onChange={handleChange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search}/>
      {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
    </form>
  )
}
