angular
  .module('app')
  .directive('utnSaludo', function() {
     return {template:"hola mundo"};
  })
  
  .directive('utnSaludoDos', function() {
//por default es un Elemento y un Atributo pero con restrict puedo definir una Clase
// y Comentario (letra M)  	
  	 return {replace:true, restrict:"MEAC", template:"<h1> hola mundo </h1>"};
  })

  .directive('utnTitulo', function() {	
  	 return {replace:true, restrict:"E", template:"<h1> {{titulo}} </h1>"};
  })

  .directive('utnTituloDos', function() {	
//Recomendaciones para los templates:
//1) no puede ser una página html entera.
//2) tiene que tener un tag de apertura y cierre de algo. Tiene que haber un solo tag que englobe
//   a todo (tipo un div de apertura y cierre, envolver a todo dentro de un div).  	
  	 return {replace:true, restrict:"E", templateUrl:"templates/templateTitulos.html"};
  })

 .directive('utnTituloParametro', function() {	
//Recomendaciones para los templates:
//1) no puede ser una página html entera.
//2) tiene que tener un tag de apertura y cierre de algo. Tiene que haber un solo tag que englobe
//   a todo (tipo un div de apertura y cierre, envolver a todo dentro de un div).  	
  	 return { scope:{
  	 	              miTitulo:'@miparametro'
  	 	            }, 
  	 		  replace:true, 
  	 		  restrict:"E", 
  	 		  templateUrl:"templates/templateTitulos.html"};
  })

//Las directivas devuelven interfaces y pueden cambiar el scope del controller
 .directive('utnBandera', function() {  
     return { scope:{
                    nombrepais:'@miparametropais',
                    fotobandera: '@miparametrobandera'
                  }, 
          replace:true, 
          restrict:"EA", 
          templateUrl:"templates/templateBandera.html"};
  })

//se envia todo el objeto
 .directive('utnBanderaObj', function() {  
     return { scope:{
                    mibandera:'=labanderaporparametro'
                    /*nombrepais:'@miparametropais',
                    fotobandera: '@miparametrobandera'*/
                  }, 
          replace:true, 
          restrict:"EA", 
          templateUrl:"templates/templateBandera.html"};
  })






  ;//cierre del modulo