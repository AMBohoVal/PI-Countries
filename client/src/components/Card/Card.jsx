import React from 'react';

export default function Card({nameCountry, continent, flag}){
  return (
    <div>
      <h3>{nameCountry}</h3>
      <h5>{continent}</h5>
      <img src={flag} alt="No existe bandera" width="70px" height="50px" />
    </div>
  );
}