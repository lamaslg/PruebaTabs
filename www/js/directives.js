angular.module('stater.directives', [])
.directive('mapa',function(){
        return{
            restrict:'E',
            scope: {
                onCreate : '&'
            },
            link: function($scope,$element,$attr){

                function init(){
                    var mapOptions={
                        center: new google.maps.LatLng(43.23523,-39.33123),
                        zoom:16,
                        mapTypeId:google.maps.MapTypeId.ROADMAP

                    };

                    var map=new google.maps.Map($element[0],mapOptions);


                    $scope.onCreate({map:map});
                }

                if(document.readyState=="complete"){
                    init();

                }
                else{
                    google.maps.event.addDomListener(window,'load',init);

                }

            }
        }
    });