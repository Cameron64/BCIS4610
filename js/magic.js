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
         document.getElementById(product).className = "boxSelected";
            this.setValue();
        };


        this.removeProduct = function(product){

            this.a = this.basket.indexOf(product);
            this.basket.splice(this.a,1);
            document.getElementById(product).className = "box";
            this.setValue();

        };


        this.select = function(id) {


            if(this.basket.indexOf(id) < 0){
                this.addProduct(id);
            }
            else{
                this.removeProduct(id);
            }

        };





        this.setValue = function() {
           // ng-click="productCtrl.setValue()"
            $cookieStore.put("cookieHolder", this.basket);
            this.getValue();

        };

        this.getValue = function() {
           var favoriteCookie = $cookieStore.get("cookieHolder");
            console.log(favoriteCookie);
        };

      









    }]);



})();