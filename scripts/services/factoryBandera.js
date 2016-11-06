angular
  .module('app')
  .factory('factoryBandera', function ($http) {

   var objeto = {};
   objeto.nombre = "Factory de bandera"; //se asigna un valor
   objeto.traerTodo = TraerTodo; //se asigna un puntero a una función
   
/*Siempre hay que retornar un objeto en una factoría y todo lo que especificaremos 
  de ese objeto lo devolverá como una instancia y se podrá acceder a ese objeto.*/
   return objeto;
   
/*Variable privada*/
    var url = 'http://www.egos27.somee.com/api/bandera';

/*Métodos o funciones privadas*/
    function TraerUrl(Parametro){ //esta funcion es privada
          if(!Parametro){
            return url;
          }
          else
          {
            return url + "/" + Parametro;
          }
        }

    function TraerTodo(){
       return $http.get("http://www.egos27.somee.com/api/bandera").then( /* devuleve la promesa*/
        //return $http.get("./data/100Datos.json").then(
          function(respuesta){
            console.info("Banderas (en la factory): ",respuesta);
            return respuesta.data.Paises; /* devuelve el dato */
          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                    console.info('ERROR (en la factory): ',response);
                    return response.data; /* devuelve el error */          
          });
   }

  }) //Cierra la factoría
