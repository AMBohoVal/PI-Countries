// Importar todos los routers;
const { Router } = require('express');
const {Tourist_activity} = require('../db');

const router = Router();

// Configurar los routers
router.get('/', (req, res, next)=> {
  res.send('Soy el get de /TourActivity')
})

router.post('/', async (req, res, next)=> {
  try{
    const {nameActivity, difficulty, span, season} = req.body;
    const newTourActivity = await Tourist_activity.create({
      nameActivity,
      difficulty,
      span,
      season
    })
    res.send(newTourActivity)
  } catch(error){
    next(error)
  }
})

router.put('/', (req, res, next)=> {
  res.send('Soy el put de /TourActivity')
})

router.delete('/', (req, res, next)=> {
  res.send('Soy el delete de /TourActivity')
})


module.exports = router;