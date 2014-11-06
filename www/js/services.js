angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('Usuario',function(){

      var usuario={};

      return{
        get:function(){

          return usuario;

        },

        set:function(usu){
          usuario=usu;

        }


      }


    })
    .factory('Registro',function($http,$q){

      var url="https://cursoph.azure-mobile.net/tables/usuario";

      return{

        nuevoUsuario:function(usuario){
          var request=$http({
            method: 'post',
            url: url,
            data: usuario});

          return request.then(insertOk,insertError);

        }

      }

      function insertOk(resp){

        return resp.data;

      }
     function insertError(resp){

       if(! angular.isObject(resp.data) || !resp.data.message){

         return($q.reject("Error desconocido"));


       }

       return ($q.reject(resp.data.message));

     }



    })
.factory('Productos', function($http,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [];

  return {
    all: function() {
      return friends;
    },
    getProductos: function(){
      var url="https://cursoph.azure-mobile.net/tables/productos";

      var request=$http({
        method: 'get',
        url: url
       });

      return (request.then(exito,error));
    },

    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }

      function exito(resp){

        return resp.data;

      }
      function error(resp){

        if(! angular.isObject(resp.data) || !resp.data.message){

          return($q.reject("Error desconocido"));


        }

        return ($q.reject(resp.data.message));

      }
});

















