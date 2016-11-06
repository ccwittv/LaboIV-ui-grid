angular
  .module('app')
  .controller('ConfBanderaCtrl', function($scope, bandera, i18nService, uiGridConstants,$timeout, NgMap) {
    $scope.titulo = "Configuracion Campos Bandera";
//Grid options del usuario    
// Objeto de configuracion de la grilla para mostrar todas las banderas.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');
    
    console.log(uiGridConstants);

    console.info("Funciones y atributos del servicio Bandera:",bandera);
    var datosBanderas =  bandera.traerTodo();
    console.info("Banderas Promesa (en controller): ",datosBanderas);
    //$scope.gridOptions.data = datosBanderas; /*da un error*/

//El then es lo que lo hace asincrónico
     var datos;
     bandera.traerTodo().then(
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
//FIN CONFIGURACION TRAER TODAS LAS BANDERAS

// CONFIGURACIÓN PARA MOSTRAR ÚNICAMENTE LAS IMÁGENES DE BANDERAS
    $scope.gridOptionsImagenes = {};
    $scope.gridOptionsImagenes.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptionsImagenes.paginationPageSize = 25;
    $scope.gridOptionsImagenes.columnDefs = columnDefsImagenes();
    // Activo la busqueda en todos los campos.
    $scope.gridOptionsImagenes.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');
    
    bandera.traerSoloImagen().then(
        function(rta){
       // Cargo los datos en la grilla.
            console.info('Imagen (en el controller): ',rta);
            $scope.gridOptionsImagenes.data = rta;
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                    console.info('ERROR (en el controller): ',response);
                    return response.data;           
         });
//FIN CONFIGURACION DE IMAGENES

// CONFIGURACIÓN PARA MOSTRAR SOLAMENTE UN PAIS
        $scope.gridOptionsUnPais = {};
        $scope.gridOptionsUnPais.paginationPageSizes = [25, 50, 75];
        // Configuracion de la paginacion
        $scope.gridOptionsUnPais.paginationPageSize = 25;
        $scope.gridOptionsUnPais.columnDefs = columnDefs(); //se utiliza la misma configuración de columnas que para mostrar todas las banderas
        // Activo la busqueda en todos los campos.
        $scope.gridOptionsUnPais.enableFiltering = true;
        // Configuracion del idioma.
        i18nService.setCurrentLang('es');
        
        bandera.traerUnPais('Argentina').then(
        function(rta){
       // Cargo los datos en la grilla.
            console.info('Pais (en el controller): ',rta);
            //$scope.gridOptions.data = rta.Paises;
            $scope.gridOptionsUnPais.data = rta;
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                    console.info('ERROR (en el controller): ',response);
                    return response.data;           
         });
 //FIN DE UN PAIS    

// Funciones privadas
function columnDefs () {
  return [
         { field: 'BanderaChica', name: 'BanderaChica', width: 100, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
         { field: 'Bandera', name: 'Bandera', width: 100, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
         { field: 'Nombre', name: 'Nombre',  width: 100},        
    //       ,enableFiltering: false
    //     },
    //     { field: 'apellido', name: 'apellido'},
    //     { field: 'avatar', name: 'avatar', width: 60, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
    //     { field: 'fechaNacimiento', name: 'Fecha de Nacimiento'
    //        ,type: 'date'
    //        ,cellFilter: "date: 'dd-MM-yyyy'"
    //      },
    //      /*{ name: 'Usuario',
    //          cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe(row.entity,row.entity.latitud,row.entity.logitud)">Ir a Mapa</button>' }*/
       ];
} //FIN funcion columnDefs

function columnDefsImagenes () {
  return [
         { field: 'imagen', name: 'Imagen Bandera Chica', width: 250, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
       ];
} //FIN funcion columnDefsImagenes

})
