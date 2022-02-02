import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postTourActivity, getOnlyCountries } from '../../actions';
import styled from 'styled-components';
import './TourActivity.css';

const Pais= styled.h4`
  color: rgb(6, 6, 75);
  font-family: Tahoma;
  float:inline-start;
  position: relative;
 `; 

function validate(input){
  let error = {};
  if(!input.nameActivity){
    error.nameActivity = "Se requiere el nombre de la actividad";
  } else if(!input.span){
      error.span = "Se requiere la duracion";
     } 
    //else if(!input.season){
    //     error.season = "Debe seleccionar uno";
    // } else if(!input.country){
    //     error.country = "Debe seleccionar al menos un pais";
    //   }

  return error;
}

export default function TourActivity(){
  const dispatch = useDispatch();
  const getBack = useNavigate();
  const onlyCountries = useSelector((state)=> state.onlyCountries);
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    nameActivity: "",
    difficulty: "",
    span: "",
    season: "",
    country: []
  })

  useEffect(()=> {
    dispatch(getOnlyCountries());
  },[]);

  function handleChange(ev){
    setInput({
      ...input,
      [ev.target.name]: ev.target.value
    })
    setError(validate({
      ...input,
      [ev.target.name]: ev.target.value
    }));
  }

  function handleCheck(ev){
    if(ev.target.checked){
      setInput({
        ...input,
        season: ev.target.value
      })
    }
    setError(validate({
      ...input,
      [ev.target.name]: ev.target.value
    }));
  }

  function handleSelect(ev){
    setInput({
      ...input,
      country: [...input.country, ev.target.value]
    })
    console.log("Selec: " + input.country);
  }

  function handleDelete(el){
    setInput({
      ...input,
      country: input.country.filter(oc => oc !== el)
    })
  }

  function handleSubmit(ev){
    ev.preventDefault();
    console.log("InputSub " + input)
    dispatch(postTourActivity(input))
    alert("Se creo la actividad");
    setInput({
      nameActivity: "",
      difficulty: "",
      span: "",
      season: "",
      country: []
    })
    
    getBack('/home')
    
  }

  return (
    <div className='tourActivity'>
      <h1 className='tourTit'>Creación de actividad turística</h1>
      <form className='formulario' onSubmit={(ev)=> handleSubmit(ev)}>
        <div>
          <label>Actividad Turistica: </label>
          <input 
            type= "text"
            value= {input.nameActivity}
            name= "nameActivity"
            onChange={(ev)=> handleChange(ev)}
            placeholder="Digite el nombre de la actividad turistica"
            
          />
          {error.nameActivity && (<p className='error'>{error.nameActivity}</p>)}
        </div>
        <div>
          <label>Dificultad: </label>
          <input 
            type= "number"
            value= {input.difficulty}
            name= "difficulty"
            onChange={(ev)=> handleChange(ev)}
            min="1" max="5"
          />
        </div>
        <div>
          <label>Duración:</label>
          <input 
            type= "text"
            value= {input.span}
            name= "span"
            onChange={(ev)=> handleChange(ev)}
            placeholder="Tiempo en horas"
          />
          {error.span && (<p className='error'>{error.span}</p>)}
        </div>
        <div>
          <label>Temporada:</label>
          <span><input 
            type= "checkbox"
            value= "summer"
            name= "summer"
            onChange={(ev)=> handleCheck(ev)}
          />Verano</span>
          <span><input 
            type= "checkbox"
            value= "autumn"
            name= "autumn"
            onChange={(ev)=> handleCheck(ev)}
          />Otoño</span>
          <span><input 
            type= "checkbox"
            value= "winter"
            name= "winter"
            onChange={(ev)=> handleCheck(ev)}
          />Invierno</span>
          <span><input 
            type= "checkbox"
            value= "spring"
            name= "spring"
            onChange={(ev)=> handleCheck(ev)}
          />Primavera</span>
          <span><input 
            type= "checkbox"
            value= "anyone"
            name= "anyone"
            onChange={(ev)=> handleCheck(ev)}
          />Cualquiera</span>
        </div>
        <div>
          <label>Paises:  
            <select onChange={(ev)=> handleSelect(ev)} className='selForm'>
              {onlyCountries.map((oc)=> (
                <option key={oc.nameCountry} value={oc.nameCountry}>{oc.nameCountry}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button type='submit'>Crear</button>
          <Link to='/home' style={{ textDecoration: 'none' }}>
          <button>Regresar</button>
          </Link>
        </div>
        {input.country.map(el => 
            <div key={el} className='pais'>
              <Pais>{el}</Pais>
              <button className='botonX' onClick={()=> handleDelete(el)}>x</button>
            </div>)}
      </form>
    </div>
  );
}