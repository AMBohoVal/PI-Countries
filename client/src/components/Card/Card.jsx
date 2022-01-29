import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import './Card.css'

const Pais = styled.h2`
  text-align: center;
  font-size: 20px;
  color: rgb(6, 6, 75);
`;

const Continente = styled.h4`
  font-size: 17px;
  color: rgb(6, 6, 75);
`;

const Bandera = styled.img`
  border-radius: 60px;
  width: 210px;
  height: 120px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

export default function Card({nameCountry, continent, flag,id}){
  return (
    <div className= "country">
      <Link to={`/country/${id}`}><Bandera src={flag} alt="No existe bandera"/></Link>
      <Pais>{nameCountry}</Pais>
      <Continente>{continent}</Continente>
    </div>
  );
}
