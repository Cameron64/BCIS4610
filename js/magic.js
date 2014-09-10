/**
 * Created by camer_000 on 9/3/2014.
 */
(function() {

    var app = angular.module('business', ['ngAnimate', 'ngCookies']);

    app.controller('productController', ['$http', '$cookieStore',  function ($http, $cookieStore) {

        scop = this;
        $http.get('js/array.json').then(function(res){scop.products = res.data;});
        this.basket = [];

        this.addProduct = function(product){
         this.basket.push(product);
            console.log(this.basket);
            console.log("adding to basket");
        };


        this.removeProduct = function(product){

            this.a = this.basket.indexOf(product);
            this.basket.splice(this.a,1);

        };


        this.select = function(id) {
            if(document.getElementById(id).className === "boxSelected"){
                document.getElementById(id).className = "box"
            }
            else{document.getElementById(id).className = "boxSelected"}

            if(this.basket.indexOf(id) < 0){
                this.addProduct(id);
                console.log("does not contain product");
            }
            else{
                this.removeProduct(id);
            }

        };





        this.setValue = function() {
           // ng-click="productCtrl.setValue()"
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