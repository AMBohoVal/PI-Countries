import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
  return (
    <div className= "landing">
      <h1 className= "titleLand" >¡Bienvenidos a Paises!</h1>
      <Link exact to= "/home">
          <button className= "buttonLand" >Ingresar</button>
      </Link>
    </div>
  );
}