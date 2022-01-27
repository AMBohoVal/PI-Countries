import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry, filterCountryByContinent, orderByCountry } from '../../actions';
import './Home.css'
import Card from '../Card/Card.jsx';
import Pages from '../Pages/Pages.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';


export default function Home(){
  const dispatch = useDispatch();
  const allCountries = useSelector((state)=> state.country);
  const [currentPage, setCurrentPage] = useState(1);
  const [countryByPage, setCountryByPage] = useState(10);
  const [inOrder, setInOrder] = useState('');

  const indexOfLastCountry = currentPage * countryByPage;
  const indexOfFirstCountry = indexOfLastCountry - countryByPage;
  const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry);

  const showPages = (pageNumber)=> {
    setCurrentPage(pageNumber);
  }

  useEffect(()=> {
    dispatch(getCountry());
  }, [dispatch])

  function handleClick(ev){
    ev.preventDefault();
    dispatch(getCountry());
  }

  function handleFilterContinent(ev){
    ev.preventDefault();
    dispatch(filterCountryByContinent(ev.target.value));
  }
  
  function handleSort(ev){
    ev.preventDefault();
    dispatch(orderByCountry(ev.target.value))
    setCurrentPage(1);
    setInOrder(`Ordenado ${ev.target.value}`)
  }

  return (
    <div className= "home">
        <SearchBar />
        <h1>¡Bienvenidos a Paises!</h1>
        <button onClick= {ev=> {handleClick(ev)}}>
          Limpiar filtro
        </button>
        <div>
          <select onChange={ev=> handleSort(ev)}>
            <option value='asc'>Ascendente</option>
            <option value='desc'>Descendente</option>
          </select>
          
          <select onChange={ev=> handleFilterContinent(ev)}>
            <option value='All'>Todos</option>
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

          <Pages 
              countryByPage = {countryByPage}
              allCountries = {allCountries.length}
              showPages = {showPages}
            />
          <div className= "cards">
            {
              currentCountry?.map(co=> {
                return (
                  <Card nameCountry={co.nameCountry} continent={co.continent} flag={co.flag} id={co.id} key={co.id}/>
                );
              })
            }
          </div>
        </div>
    </div>
  )
}