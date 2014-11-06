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
   /* .factory('Ficheros',function(){
        var datos={};
        function RecuperarFicheroEscritura(){
            alert("1");
            try {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, manejarFicheroEscritura, error);
            }
            catch (ex){

                alert(ex.toString());
            }
        }
        function manejarFicheroEscritura(fileSystem){

            alert("2");
            fileSystem.root.getFile("datos.json",{create: true, exclusive: false}, escribir,error);

        }
        function escribir(fileEntry){
            alert("3");
            fileEntry.createWriter(guardarDatos,error);

        }
        function guardarDatos(writer){
            writer.onwrite=function(evt){

                alert("Escrito "+JSON.stringify(evt));

            };

            alert("4");

            writer.write(JSON.stringify(datos));

        }
        function error(err){
            alert(err.code);


        }
        return{

            escribir:function(obj){

                datos=obj;
                RecuperarFicheroEscritura();

            }

        }

    })*/
    .factory('Ficheros',function(){


        var usuario={login:'luis',password: 'Gil'};

        function manejoFSEscritura(fileSystem) {

            fileSystem.root.getFile("datos.json", {create:true,exclusive:false}, gotFileEntryEscritura, fail);
        }

        function gotFileEntryEscritura(fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        }

        function gotFileWriter(writer) {
            writer.onwrite = function(evt) {
                alert("write success \n now click that read button.");
                alert(JSON.stringify(evt));
            };
            writer.write(JSON.stringify(usuario));
        }
        function manejoLectura() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSLectura, fail);
        }

        function gotFSLectura(fileSystem) {
            fileSystem.root.getFile("datos.json", {create: true, exclusive: false}, gotFileEntryLectura, fail);
        }

        function gotFileEntryLectura(fileEntry) {
            fileEntry.file(gotFileLectura, fail);
        }

        function gotFileLectura(file){
            readDataUrl(file);
            readAsText(file);
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                alert("Read as data URL : " + evt.target.result);
            };
            reader.readAsDataURL(file);
        }

        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                alert("Read as text : " + evt.target.result);
            };
            reader.readAsText(file);
        }
        function fail(error) {
            alert(error.code);
        }


        return{
            leer:function(){
                manejoLectura();

            },
            escribir: function(){
              try{ window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, manejoFSEscritura, fail);}
                catch (ex){
                    alert(ex.toString());

                }


            }

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

    get: function(productoId) {
        var url="https://cursoph.azure-mobile.net/tables/productos?$filter=id eq '"+productoId+"'";

        var request=$http({
            method: 'get',
            url: url
        });

        return (request.then(exito,error));
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

















