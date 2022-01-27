const { Router } = require('express');
const axios = require('axios');
const {Country, Tourist_activity} = require('../db');
// const countryRoute = require('./Country')
// const tourActRoute = require('./Tour_Activity')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
//Funciones
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
  console.log('Paises guardado')
}

//Routes
// router.get('/Country', async (req, res, next)=> {
//   try{
    
//     res.send(list);
//   } catch(error) {
//     next(error)
//   }
//   //res.send(apiDB());
// })

router.get('/Country', async (req, res, next)=> {
  //apiDB();
  const {countryQ} = req.query;
  
  const list = await Country.findAll({
    attributes: ['nameCountry', 'continent', 'flag', 'id', 'capital', 'subregion', 'area', 'population', 'coatOfArms']
  });
  
  try {
    let countriesApi = await getApiInfo();
    
    if(countryQ){
      const searchCountry = await countriesApi.filter(c => c.nameCountry.toLowerCase().includes(countryQ.toLowerCase()))
      searchCountry.length ?
      res.status(200).send(searchCountry) : 
      res.status(404).send("No existe pais");
    } else {
      res.status(200).send(list)
    }
  } catch(error) {
    next(error)
  }
})

router.get('/Country/:id', async (req, res, next) => {
  try{
    const {id} = req.params;

    const countrieId = await Country.findByPk(id.toUpperCase());
    console.log(countrieId.dataValues);
    
    res.json(countrieId || 'ID de la ciudad no existe');
  } catch(error) {
    next(error)
  }
});

// MiddleWares routers
// router.use('/Country', countryRoute);
// router.use('/TourActivity', tourActRoute);

module.exports = router;
//module.exports = apiDB;
