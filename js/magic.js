/**
 * Created by camer_000 on 9/3/2014.
 */
(function() {

    var app = angular.module('business', ['ngAnimate']);

    app.controller('productController', ['$http', '$timeout',  function ($http, $timeout) {

        scop = this;
        $http.get('js/array.json').then(function(res){scop.products = res.data;});
        this.basket = [];


        this.checkCookie = function() {
            //if page has no cookie, create a cookie, else, dissect the cookie and add contents into basket then populate the page
            var cookieName=this.getCookie();
            console.log(cookieName === "nothing");
            if(cookieName === "nothing"){
                this.setCookie();
            }
            else {
                // else, dissect the cookie and add contents into basket
                console.log("dissecting cookie");
                //this line turns the cookie into an array
                this.basket = this.getCookie().split(",");
                console.log("printing basket");
                console.log(this.basket);


                //corbin, these lines
               /* var j = [];
                 j = getCookie().split(",");*/

                //this gets the cookie contents and returns them
                /*this.getCookie = function() {
                 var name = "rollingSharpener" + "=";
                 var ca = document.cookie.split(';');
                 for(var i=0; i<ca.length; i++) {
                 var c = ca[i];
                 while (c.charAt(0)==' ') c = c.substring(1);
                 if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                 //                console.log(c.substring(name.length, c.length));
                 }
                 return "nothing";

                 };*/
            }
        };


           this.getClass = function(name){
             if(this.basket.indexOf(name) >= 0) {
                 return "boxSelected";
             }
               else{
                 return "box";
             }
           };


//this gets the cookie contents and returns them
        this.getCookie = function() {
            var name = "rollingSharpener" + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
//                console.log(c.substring(name.length, c.length));
            }
            return "nothing";

        };

        this.setCookie = function() {
                var d = new Date();
                d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = "rollingSharpener" + "=" + this.basket + "; " + expires;
        };



        this.addProduct = function(product){
         this.basket.push(product);
            console.log(this.basket);
         document.getElementById(product).className = "boxSelected";
            this.setCookie();
        };


        this.removeProduct = function(product){

            this.a = this.basket.indexOf(product);
            this.basket.splice(this.a,1);
            console.log(this.basket);
            document.getElementById(product).className = "box";
            this.setCookie();

        };


        this.select = function(id) {



            if(this.basket.indexOf(id) < 0){
                this.addProduct(id);
            }
            else{
                this.removeProduct(id);
            }

        };





    }]);



})();