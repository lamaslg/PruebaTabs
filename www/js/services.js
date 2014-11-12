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
    .factory('Estado', function() {
        return{
            getNetworkConnection:function(){
               try {
                   var conexion = navigator.connection.type;

                   return conexion != Connection.NONE && conexion != Connection.UNKNOWN
                       && conexion != Connection.CELL_2G;

               }catch (e){

                 //  alert(e.toString());

               }
            }


        }



    })
    .factory('BaseDatos', function() {


        return{
            guardarDatos:function(datos){

                var db=openDatabase('MyBBDD','','Base productos',1024*1024,function(db){

                    db.transaction(function(tx){
                        tx.executeSql
                        ('create table if not exists Productos(id unique,nombre,descripcion,icono)'


                        );

                        for(var i=0;i<datos.length;i++){

                            tx.executeSql("insert into Productos (id,nombre,descripcion,icono) " +
                            "values(?,?,?,?)",[datos[i].id,datos[i].nombre,
                                datos[i].descripcion,datos[i].icono]);


                        }





                    },error,function(){

                        alert("Base creada");

                    });




                });











            },

            recuperarDatos: function(){

                var db=openDatabase('MyBBDD','','Base productos',1024*1024);

                db.transaction(function(tx){

                        tx.executeSql("select * from productos",[],function(tx,res){

                            alert(res.rows.length);

                            var tx="";

                            for(var i=0;i<res.rows.length;i++){

                                tx+=res.rows.item(i).nombre+"\n";
                            }

                            alert(tx);
                        });



                    }




                    ,error,function(){



                });



            }

        }

        function error(err){

            alert(err.toString());

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

















