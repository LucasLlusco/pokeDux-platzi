export const logger = (store) => (next) => (action) => {
  console.log(action)
  next(action)
};

export const nameUpperCase = (store) => (next) => (action) => {   
  if(action.type === "data/setPokemons") {
    const pokemons = [...action.payload]; 
    pokemons.map(pokemon => {
      const firstChar = pokemon.name[0]; 
      const [_, name] = pokemon.name.split(firstChar); 
      const formattedName = firstChar.toUpperCase() + name; 
      pokemon.name = formattedName; 
    });

    const updatedAction = {
      ...action,
      payload:pokemons
    };
    next(updatedAction)
  }
  next(action) 
}

