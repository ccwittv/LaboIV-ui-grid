angular
  .module('app')
  .service('bandera', function ($http) {
    
      // function extraerData (data){
      //   return data.data;
      // }

    this.traerTodo = function () {

      return $http.get("http://www.egos27.somee.com/api/bandera").then(
        //return $http.get("./data/100Datos.json").then(
          function(respuesta){
            console.info(respuesta);
            return respuesta.data;
          }

        )
      //return $http.get('./data/MOCK_DATA.json').then(extraerData);      
      //return $http.get('./data/100Datos.json').then(extraerData);
    }

  })
