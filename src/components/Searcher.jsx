import { Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setPokemonsFiltered } from '../slices/dataSlice';

const Searcher = () => {
  const dispatch = useDispatch();

  const handleSearchInput = (e) => {    
    dispatch(setPokemonsFiltered(e.target.value))  
  }

  return (
    <Input.Search 
      placeholder='buscar...' 
      style={{marginBottom: 40}} 
      onChange={e => handleSearchInput(e)} 
    />
  )
}

export default Searcher