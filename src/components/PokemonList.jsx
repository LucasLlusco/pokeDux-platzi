import React from 'react'
import PokemonCard from './PokemonCard'
import "./PokemonList.css"

const PokemonList = ({pokemons}) => {

  return (
    <div className="PokemonList">
      {pokemons.map((pokemon) => {
        return <PokemonCard 
          name={pokemon.name} 
          key={pokemon.name} 
          image={pokemon.sprites.other["official-artwork"].front_default} 
          abilities={pokemon.abilities}
          types={pokemon.types}
          id={pokemon.id}
          favorite={pokemon.favorite}
        />;
      })}
    </div>
  )
}

export default PokemonList