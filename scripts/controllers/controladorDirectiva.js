angular
  .module('app')
  .controller('DirectivaCtrl', function($scope, data, factoryConServicioBandera,i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
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

    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      console.info('Respuesta:',rta);
      $scope.gridOptions.data = rta;
    });

    console.log(uiGridConstants);
    
    $scope.listadoDeBanderas = {};        
    factoryConServicioBandera.traerTodo().then(
        function(rta){
       // Cargo los datos en la grilla.
            //console.info('Banderas (en controller): ',rta);
            $scope.listadoDeBanderas = rta;
            console.info('Listado de banderas ',$scope.listadoDeBanderas);
         },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                console.info('ERROR (en el controller): ',response);
                return response.data;           
         });

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        { field: 'titulo', name: 'ocupacion'
          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...'
          }
        },
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'email', name: 'mail'},
        { field: 'genero', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: '1', label: 'Masculino'},
              {value: '2', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexo'
        },
        { field: 'fecha_nacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        }
      ];
    }
  })
