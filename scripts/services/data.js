angular
  .module('app')
  .service('data', function ($http) {
    function extraerData (data){
      return data.data;
    }

    this.data = function () {
      return $http.get('./data/MOCK_DATA.json').then(extraerData);
      //return $http.get('./data/100Datos.json').then(extraerData);
    }

    this.dataTP = function () {
      //return $http.get('./data/MOCK_DATA.json').then(extraerData);
      return $http.get('./data/100datosUIGrid.json').then(extraerData);
    }

    this.sexo = function () {
      return $http.get('./data/animales.json').then(extraerData);
    }
  })
