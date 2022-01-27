import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryName } from '../../actions';

export default function SearchBar(){
  const dispatch = useDispatch();
  const [countryQ, setCountryQ] = useState("");
  
  function handleInputChange(ev){
    console.log(ev.target.value)
    ev.preventDefault();
    setCountryQ(ev.target.value)
  }

  function handleSubmit(ev){
    ev.preventDefault();
    dispatch(getCountryName(countryQ))
  }

    return (
      <div>
        <input 
          type='text'
          placeholder='Buscar pais'
          onChange={(ev)=> handleInputChange(ev)}
        />
        <button type='submit' onClick={(ev)=> handleSubmit(ev)}>Buscar</button>
      </div>
    )
}