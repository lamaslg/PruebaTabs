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
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
