import React from 'react';
import {Link} from 'react-router-dom'
import './Card.css'

export default function Card({nameCountry, continent, flag,id}){
  return (
    <Link to={`/country/${id}`}>
    <div className= "country">
      <h3>{nameCountry}</h3>
      <h5>{continent}</h5>
      <img src={flag} alt="No existe bandera" width="70px" height="50px" />
    </div>
    </Link>
  );
}