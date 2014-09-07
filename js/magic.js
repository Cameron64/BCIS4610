/**
 * Created by camer_000 on 9/3/2014.
 */
(function() {

    var app = angular.module('business', ['ngAnimate', 'ngCookies']);

    app.controller('productController', ['$http', '$cookieStore',  function ($http, $cookieStore) {
        scop = this;
        $http.get('js/array.json').then(function(res){scop.products = res.data;});




        this.setValue = function() {

            $cookieStore.put("cookieHolder", 'cookie');
            console.log("doing cookies");
            this.getValue();

        };

        this.getValue = function() {
           var favoriteCookie = $cookieStore.get("cookieHolder");
            console.log(favoriteCookie);
        };





    }]);



})();