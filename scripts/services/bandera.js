angular
  .module('app')
  .service('bandera', function ($http, factoryRutas) {

//Atributos públicos del servicio: lo que puedo devolver es un nombre o un puntero a una función
//anónima.    
    //this.nombre ="prueba";
    this.nombre ="Servicio Bandera";

/*Se puede interpretar de dos maneras:
  1)  le estoy creando un atributo y le estoy asignando una función
  2) esta función que es privada le estoy asignando a este atributo esa función privada*/    
    this.traerSoloImagen = TraerSoloImagen; //es un atributo pero tambien es una función
    this.traerUnPais = TraerUnPais; //no poner apertura y cierre de paréntesis PORQUE ES UNA REFERENCIA A LA FUNCION

    this.traerOpcionesGrilla = TraerOpcionesGrilla;

/*Variable privada*/
    //var url = 'http://www.egos27.somee.com/api/bandera';
    var url = factoryRutas.ApiBanderas;

//Metodos o funciones privados del servicio
// Hay dos formas de hacer TaersSoloImagen que es traerTodo y adentro de donde traje todo
// en vez de devolver "data.Paises" lo que hago es un proceso que es tomar el json que me devuelve
// y solamente le devuelvo las imágenes (la ruta de la imagen). Esto se puede devolver de dos formas
// 1) como un array de string con las direcciones de la bandera
// 2) o se puede devolver con bandera:nombre_bandera en un array
// Hacer un array_retorno y hacerle un push de un objeto bandera que tendrá el nombre (que será la bandera) y
// la ruta. Si solemente hacemos un push solamente de la ruta de bandera lo que devolverá es un array con la ruta de bandera.
// Son dos formas de devolver correctas: las hacemos con un for each. Hay un foreach que es de javascript  que ponemos objeto.foreach
// y automáticamente recibe una function que la respuesta de esa function es la iteración; no tiene index + algo sino
// que es foreach(function(elemento)) y luego hago lo que quiero con ese elemento.
// Después está la funcion map que me devuelve un array de lo que quiera. Lo voy armando adentro con un código iterativo.
// Si hago un ng-repeat que es "elemento in listado", en uno el elemento es la dirección del a bnadera (foreach?) y en el otro
// hay que poner elemento.bandera (map?)  
    function TraerSoloImagen(){
       return $http.get(TraerUrl()).then( //retorna la promesa
        function(respuesta){
          console.info("Imagen (en el servicio): ",respuesta.data.Paises);
          var arrayRetorno = respuesta.data.Paises.map(function(objeto){
            var rObj = {};
            rObj["imagen"] = objeto.BanderaChica;
            return rObj;
          });
          return arrayRetorno;
        },function(error){
          return error;
        })
    }

    function TraerUnPais(Pais){
      return $http.get(TraerUrl(Pais)).then( //retorna la promesa
        function(respuesta){
          console.info("Pais (en el servicio): ", respuesta.data);
          return respuesta.data;
        },function(error){
          return error;
        })
    }

    function TraerUrl(Parametro){ //esta funcion es privada
      if(!Parametro){
        return url;
      }
      else
      {
        return url + "/" + Parametro;
      }
    }

//Metodo o función publica del servicio
    this.traerTodo = function () {

      return $http.get("http://www.egos27.somee.com/api/bandera").then( /* devuleve la promesa*/
        //return $http.get("./data/100Datos.json").then(
          function(respuesta){
            console.info("Banderas (en el servicio): ",respuesta);
            return respuesta.data.Paises; /* devuelve el dato */
          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
                    console.info('ERROR (en el servicio): ',response);
                    return response.data; /* devuelve el error */          
          }); 

/* EL DATO Y EL ERROR SE EJECUTAN CUANDO VUELVE ESA PROMESA (QUE SE EJECUTA SIEMPRE)*/
//En el servicio lo que creamos es una estructura nuestra (no un objeto que lo devolvemos) que si bien hereda
//de object pero tiene solamente los atributos que nosotros le declaramos
      //return $http.get('./data/MOCK_DATA.json').then(extraerData);      
      //return $http.get('./data/100Datos.json').then(extraerData);
    }//FIN DE FUNCIÓN tipo metodo publico

    function TraerOpcionesGrilla(opcion){
      var opcionesGrilla = {};
      opcionesGrilla.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
      opcionesGrilla.paginationPageSize = 25;      
    // Activo la busqueda en todos los campos.
      opcionesGrilla.enableFiltering = true;    

      switch(opcion) {
        case 'gridOptions':
          opcionesGrilla.columnDefs = columnDefs();
          break;
        case 'gridOptionsImagenes':
          opcionesGrilla.columnDefs = columnDefsImagenes();
          break;
        case 'gridOptionsUnPais':
          opcionesGrilla.columnDefs = columnDefs();
          break;
        }
 
      return opcionesGrilla;
    } //FIN funcion

// esta definicion de columnas se puede devolver como una variable y tener una factory
// que me devuelva solamente una función que sea la definición de columnas. Entonces a la 
// factory le paso un objeto y lo que me devuelve es esta definición:
    function columnDefs () {
      return [
         { field: 'BanderaChica', name: 'BanderaChica', width: 100, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
         { field: 'Bandera', name: 'Bandera', width: 100, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
         { field: 'Nombre', name: 'Nombre',  width: 100},        
  
        ];
    }

    function columnDefsImagenes () {
      return [
         { field: 'imagen', name: 'Imagen Bandera Chica', width: 250, cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
             ];
    } //FIN funcion

  })//FIN DE SERVICIO
