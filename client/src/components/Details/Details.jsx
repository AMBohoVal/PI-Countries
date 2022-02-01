import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../actions';
import './Details.css'

export default function Details(){
  const {id} = useParams();
  
  const dispatch = useDispatch();
  const countryDetail = useSelector((state)=> state.details);
  
  
  useEffect(()=> {
    dispatch(getDetails(id));
  },[])
  

  return (
    <div className='details'>
      {
        countryDetail.hasOwnProperty("nameCountry") ?
        <div className='counDet'>
          <img src={countryDetail.flag} alt='Bandera'/>
          <h2>{countryDetail.nameCountry}</h2>
          <h3><i>Capital:</i>  {countryDetail.capital[0]}</h3>
          <h4><i>Codigo:</i>  {countryDetail.id}</h4>
          <h4><i>Subregión:</i>  {countryDetail.subregion}</h4>
          <h4><i>Área:</i>  {parseInt(countryDetail.area).toLocaleString('de-DE')} Km2</h4>
          <h4><i>Población:</i>  {countryDetail.population.toLocaleString('de-DE')}</h4>
        </div> : <p>Buscando.....</p>
      }

      
          <button className='back'><Link to='/home'style={{ textDecoration: 'none' , color:'white'}}>Volver</Link></button>
      
    </div>
  )
}

