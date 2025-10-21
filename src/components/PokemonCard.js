import React from "react";
import "./PokemonCard.css";

function getColorPorTipo(tipo) {
const colores = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    normal: "#A8A878",
};

  return colores[tipo] || "#68A090"; // color por defecto
}

function PokemonCard({ pokemon }) {
const tipo = pokemon.types[0]?.type.name;
const colorFondo = getColorPorTipo(tipo);

return (
    <div className="pokemon-card" style={{ backgroundColor: colorFondo }}>
    <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="pokemon-img"
    />
    <h3 className="pokemon-nombre">{pokemon.name}</h3>
    <p className="pokemon-tipo">
        Tipo: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
    </p>
    </div>
);
}

export default PokemonCard;

