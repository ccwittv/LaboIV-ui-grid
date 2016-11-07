angular
  .module('app')
  .factory('factoryRutas', function () {
    var objeto = {};
    objeto.nombre = "Factory de Rutas";
    objeto.ApiBanderas = "http://www.egos27.somee.com/api/bandera";
    return objeto;

// Se puede hacer una función de solo lectura (get) para recuperara la ruta
// porque de esta manera los atrubutos de objeto son de lectura y escritura.

  })//Cierra factory
