angular
  .module('app')
  //.controller('ConfFactoryConServicioCtrl', function($scope, data, bandera, factoryBandera, factoryConServicioBandera, i18nService, uiGridConstants) {
  .controller('ConfFactoryConServicioCtrl', function($scope, factoryConServicioBandera, i18nService, uiGridConstants) {  
    //console.info(data);
    //console.info("Funciones y atributos del servicio Bandera:",bandera);
    //console.info("Atributos y funciones de la Factory Bandera: ",factoryBandera);
    console.info("Atributos y funciones de la Factory con Servicio Bandera: ",factoryConServicioBandera);
    $scope.titulo = "Configuracion Campos Factory con Servicio";
    // // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions = factoryConServicioBandera.opcionesGrilla('gridOptions');
    console.info("Opciones Grilla: ",$scope.gridOptions);
    // factoryConServicioBandera.opcionesGrilla().then(
    //     function(rta){
    //    // Cargo los datos en la grilla.
    //         //console.info('Banderas (en controller): ',rta);
    //         $scope.gridOptions = rta;
    //      },function errorCallback(response) {        
    //           //aca se ejecuta cuando hay errores
    //             //console.info('ERROR (en el controller): ',response);
    //             return response.data;           
    //      });    

    $scope.gridOptionsImagenes = {};
    $scope.gridOptionsImagenes = factoryConServicioBandera.opcionesGrilla('gridOptionsImagenes');    
    
    $scope.gridOptionsUnPais = {};
    $scope.gridOptionsUnPais = factoryConServicioBandera.opcionesGrilla('gridOptionsUnPais');    

    i18nService.setCurrentLang('es');

    factoryConServicioBandera.traerTodo().then(
        function(rta){
       // Cargo los datos en la grilla.
            console.info('Banderas (en controller): ',rta);
            $scope.gridOptions.data = rta;
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                console.info('ERROR (en el controller): ',response);
                return response.data;           
         });

    factoryConServicioBandera.traerSoloImagen().then(
        function(rta){
       // Cargo los datos en la grilla.            
            $scope.gridOptionsImagenes.data = rta;
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores                
                return response.data;           
         });

    factoryConServicioBandera.traerUnPais('Argentina').then(
        function(rta){
       // Cargo los datos en la grilla.            
            $scope.gridOptionsUnPais.data = rta;
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores                
                return response.data;           
         });

  })
