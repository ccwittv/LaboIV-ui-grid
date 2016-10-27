angular.module('app')
  .filter('sexo', function () {
  	var sexo = {
  		1: 'Masculino',
  		2: 'Femenino'
  	}
    return function (input) {
    	if (!input)
    		return '';
      return sexo[input];
    };
  })
  .filter('sexoTP', function () {
    var sexoTP = {
      Male: 'Hombre',
      Female: 'Mujer'
    }
    return function (input) {
      if (!input)
        return '';
      return sexoTP[input];
    };
  });