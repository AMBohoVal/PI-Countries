import axios from 'axios';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const GET_DETAILS = 'GET_DETAILS;'
export const ORDER_BY_COUNTRY = 'ORDER_BY_COUNTRY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION';


export function getCountry(){
  return async function (dispatch){
    try{
        var jsonCountry = await axios.get('http://localhost:3001/api/Country');
          return dispatch({
            type: "GET_COUNTRY",
            payload: jsonCountry.data
          })
    } catch (error){
      console.log(error)
    }
  }
}

export function getCountryName(countryQ){
  return async function (dispatch){
    try{
        var jsonName = await axios.get('http://localhost:3001/api/Country?countryQ=' + countryQ);
          return dispatch({
            type: "GET_COUNTRY_NAME",
            payload: jsonName.data
          })
    } catch (error){
      console.log(error)
    }
  }
}

export function getDetails(id){
  return async function(dispatch){
    try{
        var jsonDetail = await axios.get('http://localhost:3001/api/Country/' + id);
          return dispatch({
            type: GET_DETAILS,
            payload: jsonDetail.data
          })
    } catch (error){
      console.log(error)
    }
  }
}

export function orderByCountry(payload){
  return {
    type: "ORDER_BY_COUNTRY",
    payload
  }
}

export function filterCountryByContinent(payload){
  return {
    type: "FILTER_BY_CONTINENT",
    payload
  }
}

export function filterCountryByPopulation(payload){
  return {
    type: "FILTER_BY_POPULATION",
    payload
  }
}
