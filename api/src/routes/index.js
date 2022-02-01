const { Router } = require('express');
const {Country, Tourist_activity} = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/Country', async (req, res, next)=> {
  try {
    const {countryQ} = req.query;
    const list = await Country.findAll({
      attributes: ['nameCountry', 'continent', 'flag', 'id', 'capital', 'subregion', 'area', 'population', 'coatOfArms']
    });
    
    //let countriesApi = await getApiInfo();

    if(countryQ){
      const searchCountry = await list.filter(c => c.nameCountry.toLowerCase().includes(countryQ.toLowerCase()))
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
    
    res.json(countrieId || 'ID de la ciudad no existe');
  } catch(error) {
    next(error)
  }
});

router.get('/AllCountries', async(req, res, next) => {
  try{
    const allCountries = await Country.findAll({
      attributes: ['nameCountry'],
      order: [['nameCountry', 'ASC']]
    });

    res.status(200).send(allCountries)

  } catch(error) {
    next(error)
  }
});

router.post('/TourActivity', async (req, res, next)=> {
  try{
    const {nameActivity, difficulty, span, season, country} = req.body;
    const newTourActivity = await Tourist_activity.create({
      nameActivity,
      difficulty,
      span,
      season,
      country
    })
    res.send(newTourActivity)
  } catch(error){
    next(error)
  }
});

router.get('/TourActivity', async(req, res, next) => {
  try{
    const tourActivity = await Tourist_activity.findAll({
      attributes: ['id', 'nameActivity', 'difficulty', 'span', 'season', 'country']
    });

    res.status(200).send(tourActivity)

  } catch(error) {
    next(error)
  }
});

module.exports = router;
