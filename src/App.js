import React, { useEffect, useState } from "react";
import "./App.css";
import Splash from "./Splash";
import PokemonCard from "./components/PokemonCard";

const LIMITE_POR_PAGINA = 20;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setCargando(true);
        const offset = pagina * LIMITE_POR_PAGINA;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMITE_POR_PAGINA}&offset=${offset}`
        );
        const data = await res.json();

        const detalles = await Promise.all(
          data.results.map(async (p) => {
            const resDet = await fetch(p.url);
            return await resDet.json();
          })
        );

        setPokemons(detalles);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener Pokémon:", error);
        setCargando(false);
      }
    };

    fetchPokemons();
  }, [pagina]);

  const pokemonsFiltrados = pokemons.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSiguiente = () => setPagina((prev) => prev + 1);
  const handleAnterior = () => setPagina((prev) => (prev > 0 ? prev - 1 : 0));

  if (cargando) {
    return <Splash onFinish={() => setCargando(false)} />;
  }

  return (
    <div className="contenedor">
      <h1>PokéDex Api</h1>

      <input
        type="text"
        className="buscador"
        placeholder="Buscar Pokémon..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="grid">
        {pokemonsFiltrados.length > 0 ? (
          pokemonsFiltrados.map((p) => <PokemonCard key={p.id} pokemon={p} />)
        ) : (
          <p>No se encontró ningún Pokémon UnU</p>
        )}
      </div>

      <div className="paginacion">
        <button onClick={handleAnterior} disabled={pagina === 0}>
          ◀ Anterior
        </button>
        <span>Página {pagina + 1}</span>
        <button onClick={handleSiguiente}>Siguiente ▶</button>
      </div>
    </div>
  );
}

export default App;

