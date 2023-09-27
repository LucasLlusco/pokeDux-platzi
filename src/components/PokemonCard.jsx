import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import StarButton from './StarButton'
import { useDispatch } from 'react-redux'
import { setFavorite } from '../slices/dataSlice'

const PokemonCard = ({name, image, abilities, types, id, favorite}) => {
  const dispatch = useDispatch();
  const renderAbilities = abilities.map(ability => ability.ability.name).join(", ");
  const renderTypes = types.map(type => type.type.name).join(", ");


  const handleOnFavorite = () => {
    dispatch(setFavorite({pokemonId:id}));
  }

  return (
    <Card 
      title={name} 
      cover={<img src={image} 
      alt={name} />} 
      extra={<StarButton isFavorite={favorite} onClick={handleOnFavorite}  />}
    >
      <p><b>abilities: </b>{renderAbilities}</p>
      <p><b>types: </b>{renderTypes}</p>
    </Card>
  )
}

export default PokemonCard