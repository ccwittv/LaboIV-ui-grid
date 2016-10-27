angular
  .module('app')
  .controller('ConfTPCtrl', function($scope, data, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos TP";
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

// http://ui-grid.info/docs/#/tutorial/305_appScope
     $scope.someProp = 'abc',
     $scope.showMe = function(entidad,latitud,longitud){
                   //alert($scope.someProp);
                   console.info('Datos de la fila:',entidad);
                   console.info('Latitud:',latitud);
                   console.info('Longitud:',longitud);
                };

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
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        },
         { name: 'ShowScope',
             cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe(row.entity,row.entity.latitud,row.entity.logitud)">Click Me</button>' }
      ];
    }
  })
