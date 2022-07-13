const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('---------')
  next()
  // recoge la informacion de la url el path metodo y todo
  // luego pasa por cada app.FUNCION que le mando a los path determinados
  // y si ningua coincide con la que recibe pues sigue derecho hasta el final dondeo beria estar el 404 not found
}

module.exports = logger
