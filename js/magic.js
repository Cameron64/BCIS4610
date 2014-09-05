/**
 * Created by camer_000 on 9/3/2014.
 */
(function() {

    var app = angular.module('business', []);

    app.controller('productController',function($http){

        scop = this;
        $http.get('js/array1.json').then(function(res){scop.products = res.data;});



    });



})();