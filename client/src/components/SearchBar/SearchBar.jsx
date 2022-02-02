import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCountryName } from '../../actions';
import icono from '../../img/globo-terraqueo.png';
import  './SearchBar.css';

export default function SearchBar({setCurrentPage}){
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
    setCurrentPage(1);
  }
  
    return (
      <div className='navbar'>
        <NavLink to="/"><img src={icono} alt='Icono' className='icono'/></NavLink>
        <NavLink to="/TourActivity" className='actForm'>
              Crear Actividad</NavLink>
        <div className='search'>
          <input 
            type='text'
            placeholder='   Buscar pais'
            onChange={(ev)=> handleInputChange(ev)}
            className='inpser'
          />
          <button type='submit' onClick={(ev)=> handleSubmit(ev)} className='butser'>Buscar</button>
        </div>
      </div>
    )
}