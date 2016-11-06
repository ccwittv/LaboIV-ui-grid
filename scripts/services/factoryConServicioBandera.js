angular
  .module('app')
  //.factory('factoryConServicioBandera', function ($http) {
  .factory('factoryConServicioBandera', function (bandera) {
   var objeto = {};
   objeto.nombre = "Factory con Servicio de bandera"; //se asigna un valor
   //objeto.traerTodo = bandera.traerTodo; //se asigna un puntero a una función que está en una factory
   objeto.traerTodo = TraerTodo; //se asigna un puntero a una función que está en una factory
   //objeto.traerUnPais = bandera.traerUnPais(pais);
   objeto.traerUnPais = TraerUnPais;
   //objeto.traerUnPais = bandera.traerSoloImagen();
   objeto.traerUnPais = TraerSoloImagen;

   objeto.opcionesGrilla = TraerOpcionesGrilla();
   //objeto.opcionesGrilla = bandera.traerOpcionesGrilla;

/*Siempre hay que retornar un objeto en una factoría y todo lo que especificaremos 
  de ese objeto lo devolverá como una instancia y se podrá acceder a ese objeto.*/
   return objeto;
   
    function TraerTodo(){
      return bandera.traerTodo();
    }

    function TraerUnPais(pais){
      return bandera.traerUnPais(pais);
    }

    function TraerSoloImagen(){
      return bandera.traerSoloImagen();
    }

    function TraerOpcionesGrilla(){
      return bandera.traerOpcionesGrilla();
    }

  }) //Cierra la factoría
