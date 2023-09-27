import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPokemon, getPokemonDetails } from '../api';
import { setLoading } from './uiSlice';

const initialState = {
  pokemons: [], 
  pokemonsFiltered: [] 
}

export const fetchPokemonsWithDetails = createAsyncThunk(
  "data/fetchPokemonsWithDetails",
  async(_, {dispatch}) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemon(); 
    const pokemonsDetailed = await Promise.all(
      pokemonsRes.map(pokemon => getPokemonDetails(pokemon))
    );
    dispatch(setPokemons(pokemonsDetailed))
    dispatch(setLoading(false));    
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemons: (state, action) => { 
      state.pokemons = action.payload; 
      state.pokemonsFiltered = action.payload;
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
        return pokemon.id === action.payload.pokemonId 
      })
      if(currentPokemonIndex >= 0) { 
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;
        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
      }

      
      const currentFilteredPokemonIndex = state.pokemonsFiltered.findIndex((pokemon) => { 
        return pokemon.id === action.payload.pokemonId 
      })
      if(currentFilteredPokemonIndex >= 0) {
        const isFavorite = state.pokemonsFiltered[currentFilteredPokemonIndex].favorite;
        state.pokemonsFiltered[currentFilteredPokemonIndex].favorite = !isFavorite;
      }
    },
    setPokemonsFiltered: (state, action) => {
      const newPokemons = state.pokemons.filter((pokemon) => {
        const name = pokemon.name.toLowerCase();
        const searchText = action.payload.toLowerCase();;
        return name.includes(searchText)
      });
      state.pokemonsFiltered = newPokemons;
    }
  }
});
export const { setFavorite, setPokemons, setPokemonsFiltered } = dataSlice.actions;

export default dataSlice.reducer 