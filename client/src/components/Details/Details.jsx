import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../actions';

export default function Details(){
  const {id} = useParams();
  
  const dispatch = useDispatch();
  const countryDetail = useSelector((state)=> state.details);
  
  
  useEffect(()=> {
    dispatch(getDetails(id));
  },[])
  

  return (
    <div>
      {
        countryDetail.hasOwnProperty("nameCountry") ?
        <div>
          <img src={countryDetail.flag} alt='Bandera' width="80px" height="50px"/>
          <h2>{countryDetail.nameCountry}</h2>
          <h3>Capital: {countryDetail.capital[0]}</h3>
          <h4>Codigo: {countryDetail.id}</h4>
          <h4>Subregión: {countryDetail.subregion}</h4>
          <h4>Área: {parseInt(countryDetail.area).toLocaleString('de-DE')} Km2</h4>
          <h4>Población: {countryDetail.population.toLocaleString('de-DE')}</h4>
        </div> : <p>Buscando.....</p>
      }

      
          <button><Link to='/home'>Volver</Link></button>
      
    </div>
  )
}

