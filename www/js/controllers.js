angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})
    .controller('LoginCtrl', function($scope,$state,$http,
                                      $ionicLoading,$ionicPopup,Usuario) {

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

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope,Usuario) {

        $scope.usuario=Usuario.get();

});
