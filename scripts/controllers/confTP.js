angular
  .module('app')
  .controller('ConfTPCtrl', function($scope, data, i18nService, uiGridConstants,$timeout, NgMap) {
    $scope.titulo = "Configuracion Campos TP";
//Grid optios del usuario    
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

    data.dataTP().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });

    console.log(uiGridConstants);

// Grid optios de los amigos del usuario
    $scope.gridOptionsAmigos = {};
    $scope.gridOptionsAmigos.data = {};
    $scope.gridOptionsAmigos.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptionsAmigos.paginationPageSize = 25;
    $scope.gridOptionsAmigos.columnDefs = columnDefsAmigos();
    // Activo la busqueda en todos los campos.
    $scope.gridOptionsAmigos.enableFiltering = true;

// http://ui-grid.info/docs/#/tutorial/305_appScope
     //$scope.someProp = 'abc';
     $scope.listadoAmigos = [];
//Muestra todos los datos de una fila y cual es la ubicación del usuario en el mundo     
     $scope.showMe = function(entidad,latitud,longitud){
                   //alert($scope.someProp);
                   console.info('Datos de la fila:',entidad);
                   console.info('Latitud:',latitud);
                   console.info('Longitud:',longitud);
                   $scope.latitud = latitud;
                   $scope.longitud = longitud;
                   //$timeout($scope.listadoAmigos = entidad.amigos);
                   // Grid optios de los amigos del usuario
                   $timeout($scope.gridOptionsAmigos.data = entidad.amigos);
                   //console.log($timeout);
                   console.info('Amigos: ',$scope.listaDeAmigos)

                };

//Ingreso el API KEY para poder cargar google maps
     //$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDC7EInJlB9mYQpGX5M3fGg8fYFOQ5KYhg";           
     
    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        /*{ field: 'titulo', name: 'ocupacion'
          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...'
          }
        },*/
        { field: 'foto', name: 'foto', width: 60, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
        { field: 'nombre', name: 'Nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'avatar', name: 'avatar', width: 60, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
        { field: 'email', name: 'mail'},
        { field: 'sexo', name: 'sexoTP'
        // filtro de busqueda.
          ,filter: {
            //term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: 'Male', label: 'Hombre'},
              {value: 'Female', label: 'Mujer'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexoTP'
        },
        // { field: 'fechaNacimiento', name: 'fechaNacimiento'
        //   ,type: 'date'
        //   ,cellFilter: "date: 'dd-MM-yyyy'"
        // },
         { name: 'Usuario',
             cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe(row.entity,row.entity.latitud,row.entity.logitud)">Ir a Mapa</button>' }
      ];
    }

    function columnDefsAmigos () {
      return [
        { field: 'foto', name: 'foto', width: 60, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
        { field: 'nombre', name: 'Nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'avatar', name: 'avatar', width: 60, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
        { field: 'fechaNacimiento', name: 'Fecha de Nacimiento'
           ,type: 'date'
           ,cellFilter: "date: 'dd-MM-yyyy'"
         },
         /*{ name: 'Usuario',
             cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe(row.entity,row.entity.latitud,row.entity.logitud)">Ir a Mapa</button>' }*/
      ];
    }

  })
