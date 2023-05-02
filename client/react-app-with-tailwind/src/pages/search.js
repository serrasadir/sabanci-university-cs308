import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
  
export  function Search() {
const navigate  = useNavigate()

const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
console.log("search func activated")
const handleSearch = async (e) => {
  console.log("search func activated2")
  e.preventDefault();
  const response = await axios.get(`http://localhost:3001/product/search?q=${query}`);
  setResults(response.data);
  navigate("/s")
};

  return (
    <form onSubmit={handleSearch}>
    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
    <button type="submit">Search</button>
  </form>
  );
}
export default Search;