angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})
    .controller('LoginCtrl', function($scope,$state,$http,$ionicLoading,$ionicPopup) {

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
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
