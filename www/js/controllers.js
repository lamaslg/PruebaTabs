angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})
    .controller('LoginCtrl', function($scope,$state,$http,
                                      $ionicLoading,$ionicPopup,Usuario,Ficheros) {

        $scope.usuario={};

        $scope.inicioSesion=function(){

            $ionicLoading.show({
                template:'Validado datos...'

            });

            var url="https://cursoph.azure-mobile.net/tables/usuario?$filter=login eq'"+
                $scope.usuario.login+"' "+
                "and password eq '"+$scope.usuario.password+"'";
            $http.get(url).then(function(res){
                    console.log("resultado",JSON.stringify(res));




                    if(res.data && res.data.length > 0){

                        Usuario.set(res.data[0]);
                        var url2="https://cursoph.azure-mobile.net/tables/tokens";
                        var token={
                            idUsuario:res.data[0].id

                        };
                        $http.post(url2,token).then(function(res){

                            localStorage.setItem("token",JSON.stringify(res.data));
                            //Ficheros.escribir();

                            $state.go("tab.dash");


                        },function(err){});





                    }
                    else{

                        var alert=$ionicPopup.alert({
                            template: 'Login incorrecto',
                            title: 'Error'

                        });


                    }


                $ionicLoading.hide();
                }
                ,
                function(err){
                    console.log("error",JSON.stringify(err));

                    $ionicLoading.hide();
                    });
            };


    })
    .controller('RegistroCtrl', function($scope,Registro,$ionicPopup,$state) {
        $scope.Usuario={};

        $scope.Registrar=function(){

            Registro.nuevoUsuario($scope.Usuario).then(function(datos){
                var alert=$ionicPopup.alert({
                    template: 'Registro correcto',
                    title: 'Exito'

                });

                $state.go("tab.dash");


            },
            function(err){
                var alert=$ionicPopup.alert({
                    template: err,
                    title: 'Error'

                });


                });


        };



    })
.controller('ProductosCtrl', function($scope, Productos) {
  $scope.productos = [];

     Productos.getProductos().then(function(data){

        $scope.productos=data;

     });

})

.controller('ProductoDetailCtrl', function($scope, $stateParams, Productos) {
        $scope.producto = {};

        Productos.get($stateParams.productoId).then(function(data){
            $scope.producto=data[0];

        });


})
    .controller('MapaCtrl', function($scope) {

        $scope.mapaCreado=function(map){

          $scope.map=map;

        };

        $scope.miPosicion=function(){

            navigator.geolocation.getCurrentPosition(function(pos){

                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude));


            },
            function(error){

                alert(error.message);

            }
            );

        }
    })
.controller('AccountCtrl', function($scope,Usuario) {

        $scope.usuario=Usuario.get();

});
