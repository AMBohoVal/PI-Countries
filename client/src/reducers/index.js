import { GET_COUNTRY, GET_COUNTRY_NAME, GET_DETAILS, FILTER_BY_CONTINENT, FILTER_BY_POPULATION, ORDER_BY_COUNTRY, GET_ONLY_COUNTRIES } from "../actions/index";

const initialState = {
  country : [],
  allCountries : [],
  details : {},
  onlyCountries: []
}

function rootReducer(state = initialState, action){
  switch(action.type){
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
        allCountries: action.payload
      };
    
    case GET_COUNTRY_NAME:
      return {
        ...state,
        country: action.payload
      }
    
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload
      }

    case ORDER_BY_COUNTRY:
      let sortCountries = action.payload === 'asc' ?
      state.country.sort(function (a,b) {
        if (a.nameCountry > b.nameCountry){
          return 1;
        }
        if (b.nameCountry > a.nameCountry){
          return -1;
        }
        return 0;
      }) :
      state.country.sort(function (a,b) {
        if (a.nameCountry > b.nameCountry){
          return -1;
        }
        if (b.nameCountry > a.nameCountry){
          return 1;
        }
        return 0;
      })
      return {
        ...state,
        country: sortCountries
      }
        
    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(con=> con.continent === action.payload);
      return {
        ...state,
        country: continentFiltered
      }
    
    case FILTER_BY_POPULATION:
      let sortPopulation = action.payload === "less" ?
        state.country.sort(function (a,b) {
          if (a.population > b.population){
            return 1;
          }
          if (b.population > a.population){
            return -1;
          }
          return 0;
        }) :
        state.country.sort(function (a,b) {
          if (a.population > b.population){
            return -1;
          }
          if (b.population > a.population){
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        country: sortPopulation
      }
    
    case GET_ONLY_COUNTRIES:  
      return {
        ...state,
        onlyCountries: action.payload
      }
    
    // case POST_TOUR_ACTIVITY:
    //   return {
    //     ...state,
    //   }

    default:
      return state;
  }
}

export default rootReducer;