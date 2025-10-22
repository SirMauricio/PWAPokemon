import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const limit = 20;

  const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };

  const fetchPokemons = async () => {
    setLoading(true);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (p) => {
        const res = await fetch(p.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          type: details.types[0].type.name,
          types: details.types.map((t) => t.type.name),
          sprite: details.sprites.other["official-artwork"].front_default,
          stats: details.stats,
          abilities: details.abilities.map((a) => a.ability.name),
        };
      })
    );

    setPokemons(detailedPokemons);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="title">Pokédex API</h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="loading-text">Cargando Pokémon...</p>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemons.map((p) => (
            <div
              key={p.id}
              className="pokemon-card"
              style={{
                background: `linear-gradient(145deg, ${typeColors[p.type]} 70%, #ffffff 100%)`,
              }}
              onClick={() => setSelectedPokemon(p)}
            >
              <img src={p.sprite} alt={p.name} className="pokemon-img" />
              <h2>{p.name}</h2>
              <p>#{p.id}</p>
              <span className="pokemon-type">{p.type}</span>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          ◀ Anterior
        </button>
        <button onClick={() => setOffset(offset + limit)}>Siguiente ▶</button>
      </div>

      {selectedPokemon && (
        <div className="modal" onClick={() => setSelectedPokemon(null)}>
          <div
            className="modal-content"
            style={{
              background: `linear-gradient(145deg, ${
                typeColors[selectedPokemon.type]
              } 60%, #ffffff 100%)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedPokemon(null)}
            >
              ✖
            </button>
            <img
              src={selectedPokemon.sprite}
              alt={selectedPokemon.name}
              className="modal-img"
            />
            <h2>{selectedPokemon.name}</h2>
            <p className="pokemon-id">#{selectedPokemon.id}</p>

            <div className="modal-section">
              <h3>Tipo</h3>
              <div className="type-list">
                {selectedPokemon.types.map((t) => (
                  <span key={t} className="pokemon-type">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3>Estadísticas</h3>
              <ul>
                {selectedPokemon.stats.map((s) => (
                  <li key={s.stat.name}>
                    {s.stat.name.toUpperCase()}: {s.base_stat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>Habilidades</h3>
              <ul>
                {selectedPokemon.abilities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
