angular
  .module('app')
  .controller('ConfFactoryCtrl', function($scope, data, bandera, factoryBandera, i18nService, uiGridConstants) {
    console.info(data);
    console.info("Funciones y atributos del servicio Bandera:",bandera);
    console.info("Atributos y funciones de la Factory Bandera: ",factoryBandera);
    $scope.titulo = "Configuracion Campos Factory Tio Witto";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    // data.data().then(function(rta){
    //   // Cargo los datos en la grilla.
    //   $scope.gridOptions.data = rta;
    // });

    // console.log(uiGridConstants);

    var datos;
    factoryBandera.traerTodo().then(
        function(rta){
       // Cargo los datos en la grilla.
            console.info('Banderas (en controller): ',rta);
            //$scope.gridOptions.data = rta.Paises;
            datos = rta;
            $scope.gridOptions.data = datos;
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                    console.info('ERROR (en el controller): ',response);
                    return response.data;           
         });

    function columnDefs () {
      return [
         { field: 'BanderaChica', name: 'BanderaChica', width: 100, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
         { field: 'Bandera', name: 'Bandera', width: 100, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
         { field: 'Nombre', name: 'Nombre',  width: 100},        
  
        ];
    }
  })
