import axios from 'axios';
export const GET_COUNTRY = 'GET_COUNTRY';

export function getCountry(){
  return async function (dispatch){
    var jsonCountry = await axios.get('http://localhost:3001/api/Country');
      return dispatch({
        type: "GET_COUNTRY",
        payload: jsonCountry.data
      })
  }
}