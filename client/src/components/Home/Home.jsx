import React from 'react';
import { useEffect } from 'react'; //useState
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from '../../actions';
import Card from '../Card/Card.jsx';
import './Home.css'

export default function Home(){
  const dispatch = useDispatch();
  const allCountries = useSelector((state)=> state.country);

  useEffect(()=> {
    dispatch(getCountry());
  }, [dispatch])

  function handleClick(ev){
    ev.preventDefault();
    dispatch(getCountry());
  }

  return (
    <div className= "home">
        <h1>Titulo</h1>
        <button onClick= {ev=> {handleClick(ev)}}>
          Limpiar filtro
        </button>
        <div>
          <select>
            <option value='asc'>Ascendente</option>
            <option value='desc'>Descendente</option>
          </select>
          <select>
            <option value='Africa'>África</option>
            <option value='Americas'>América</option>
            <option value='Antarctic'>Antártica</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europa</option>
            <option value='Oceania'>Oceanía</option>
          </select>
          {/* <select>
            <option value=''></option>
            <option value=''></option>
          </select> */}
          {
            allCountries?.map(co=> {
              return (
                <Card nameCountry={co.nameCountry} continent={co.continent} flag={co.flag} />
              );
            })
          }
        </div>
    </div>
  )
}