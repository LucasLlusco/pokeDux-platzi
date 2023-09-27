import 'antd/dist/reset.css';
import "./App.css";
import Searcher from './components/Searcher'
import { Col, Spin } from 'antd';
import PokemonList from './components/PokemonList';
import logo from './statics/logo.svg';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsWithDetails } from './slices/dataSlice';

function App() {
  const pokemons = useSelector(state => state.data.pokemonsFiltered, shallowEqual);
  const loading = useSelector(state => state.ui.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonsWithDetails());
  }, [])
  

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt="Pokedux logo" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher pokemons={pokemons} />
      </Col>
      {loading && 
        <Col offset={12}>
          <Spin spinning size='large' />
        </Col>
      }
      <PokemonList pokemons={pokemons}/>
    </div>
  )
}

export default App;