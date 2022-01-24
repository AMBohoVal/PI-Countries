// let countryQ = "LesoTHo";
// let countries = [{
//   nameCountry: 'Niue',
//   flag: 'https://flagcdn.com/w320/nu.png',
//   continent: 'Oceania',
//   capital: [ 'Alofi' ],
//   subregion: 'Polynesia',
//   area: 260,
//   population: 1470,
//   coatOfArms: undefined
// },
// {
//   nameCountry: 'China',
//   flag: 'https://flagcdn.com/w320/cn.png',
//   continent: 'Asia',
//   capital: [ 'Beijing' ],
//   subregion: 'Eastern Asia',
//   area: 9706961,
//   population: 1402112000,
//   coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/cn.png'
// },
// {
//   nameCountry: 'Lesotho',
//   flag: 'https://flagcdn.com/w320/ls.png',
//   continent: 'Africa',
//   capital: [ 'Maseru' ],
//   subregion: 'Southern Africa',
//   area: 30355,
//   population: 2142252,
//   coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/ls.png'
// },
// {
//   nameCountry: 'Curaçao',
//   flag: 'https://flagcdn.com/w320/cw.png',
//   continent: 'Americas',
//   capital: [ 'Willemstad' ],
//   subregion: 'Caribbean',
//   area: 444,
//   population: 155014,
//   coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/cw.png'
// },
// {
//   nameCountry: 'Mexico',
//   flag: 'https://flagcdn.com/w320/mx.png',
//   continent: 'Americas',
//   capital: [ 'Mexico City' ],
//   subregion: 'North America',
//   area: 1964375,
//   population: 128932753,
//   coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/mx.png'
// },]

// const searchCountry = countries.filter(c => c.nameCountry.toLowerCase().includes(countryQ.toLowerCase()));
// console.log(countries);
// console.log(countryQ);
// console.log(searchCountry);

//const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

// const filterItems = query => {
//   return fruits.filter((el) =>
//     el.toLowerCase().indexOf(query.toLowerCase()) > -1
//   );
// }

// const result = fruits.filter(f => f.includes('ra'));


// console.log(result);
//console.log(filterItems('an'));

const axios = require('axios');
const {Country, Tourist_activity} = require('../api/src/db');

const getApiInfo = async() => {
  const apiGet = await axios.get('https://restcountries.com/v3.1/all');
  const apiInfo = await apiGet.data.map(c => {
    return {
      id: c.cca3,
      nameCountry: c.name.common,
      flag: c.flags.png,
      continent: c.region,
      capital: c.capital || ['No tiene capital'],
      subregion: c.subregion,
      area: c.area,
      population: c.population,
      coatOfArms: c.coatOfArms.png,
    }
  })
  return apiInfo;
}

async function apiDB (){
  const infoApi = await getApiInfo();
  //console.log(infoApi);

  const infoDB = await infoApi.map(co => {
    Country.create({
      id: co.id,
      nameCountry: co.nameCountry,
      flag: co.flag,
      continent: co.continent,
      capital: co.capital,
      subregion: co.subregion,
      area: co.area,
      population: co.population,
      coatOfArms: co.coatOfArms,
    })
  })
  console.log('Pais guardado')
  //console.log(infoDB);
}

apiDB();
