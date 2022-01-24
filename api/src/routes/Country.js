// Importar todos los routers;
const { Router } = require('express');
const {Country} = require('../db');
const router = Router();

// Configurar los routers
router.get('/', (req, res, next)=> {
  return Country.findAll()
  .then((country) => {
    res.send(country)
  })
  .catch((error) => {
    next(error);
  })
})

router.post('/', (req, res, next)=> {
  res.send('Soy el post de /Country')
})

router.put('/', (req, res, next)=> {
  res.send('Soy el put de /Country')
})

router.delete('/', (req, res, next)=> {
  res.send('Soy el delete de /Country')
})

module.exports = router;