/**
 * Created by camer_000 on 9/3/2014.
 */
(function() {

    var app = angular.module('business', ['ngAnimate']);


    app.controller('productController', ['$http', function ($http) {

        scop = this;
/*
       declares productController.products to be the json array
*/
        $http.get('js/array.json').then(function(res){scop.products = res.data;});
        $http.get('js/groups.json').then(function(res){scop.groups = res.data;});

        this.count = 0;
        this.basket =[];
        this.customer ={};
        this.customer.email = "";
        this.customer.num = "";
        this.customer.restaurant = "";
        this.customer.product=[];
        this.customer.quantities=[];
        this.customer.comments= "";


        //this gets the cookie contents and returns them, if blank it returns a string of "nothing"
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

        this.checkCookie = function() {
            //if page has no cookie, create a cookie, else, dissect the cookie and add contents into basket then populate the page
            var cookieValue=this.getCookie();
            if(cookieValue === "nothing"){
                this.setCookie();
                /*remove first empty item in array*/
                if(this.basket[0] === ""){
                this.basket.shift();
               }
            }
            else {
                // else, dissect the cookie and add contents into basket
                //this line turns the cookie into an array
                this.basket = this.getCookie().split(",");
                if(this.basket[0] === ""){
                    this.basket.shift();
                    }
            }
        };
        this.isInBasket = function(n,index,id){
/*returns true or false based on whether the name is in the basket*/

          if (this.basket.indexOf(n) !== -1){
              this.initBasket(n,index);
              return true;
          }


        };

        this.initBasket = function(n,index){

            this.customer.product[this.basket.indexOf(n)] = this.products[index];
            //this.customer.quantities[this.basket.indexOf(n)] = 1;

        };

        this.removeFromCB = function(product){
            this.customer.product.splice(this.basket.indexOf(product),1);
            this.customer.quantities.splice(this.basket.indexOf(product),1);
            console.log(this.customer.product, this.customer.quantities);

        };
/*class of product boxes is tied to this function, returns name of class based on whether it is in this.basket*/
           this.getClass = function(name){
             if(this.basket.indexOf(name) >= 0) {
                 return "boxSelected";
             }
               else{
                 return "box";
             }
           };



/*sets a cookie with the name of "rollingSharpener"
* assigns it a value of this.basket
* expires in 10 days*/
        this.setCookie = function() {
                var d = new Date();
            //Cookie for 10 years
                d.setTime(d.getTime() + (3600 * 1000 * 24 * 365 * 10));
                var expires = "expires=" + d.toUTCString();
                document.cookie = "rollingSharpener" + "=" + this.basket + "; " + expires;
        };


/*receives name of product selected
* pushes it into this.basket
* then updates the cookie*/
        this.addProduct = function(product){
         this.basket.push(product);
            /*should not need this line to change class on selection, but breaks when removed, same for next method*/
         document.getElementById(product).className = "boxSelected";
            this.setCookie();
        };

/*receives name of product
* removes name from this.basket
* then updates the cookie*/
        this.removeProduct = function(product){

            this.a = this.basket.indexOf(product);
            this.basket.splice(this.a,1);
            document.getElementById(product).className = "box";
            this.setCookie();

        };

        this.removeProductCheckout = function(product){

            console.log(this.customer.quantities);
            this.a = this.basket.indexOf(product);



            this.basket.splice(this.a,1);
            this.setCookie();
            this.removeFromCB(product);

            console.log(this.customer.quantities);
        };

/*receives name of product selected
* if it is not found in this.basket, it sends the name to addProduct
* if it finds the name in this.basket, it sends the name to removeProduct*/
        this.select = function(id) {

            if(this.basket.indexOf(id) < 0){
                this.addProduct(id);
            }
            else{
                this.removeProduct(id);
            }

        };



        this.formSubmit = function(){


            if(document.getElementById('email').checkValidity() && document.getElementById('tel').checkValidity()
                && document.getElementById('name').checkValidity()){

                if(this.count === 0){
                    this.count++;
                lol = this;
                $http({
                 method: 'POST',
                 url: 'php/SendOrder.php',
                 headers: {'Content-Type': 'application/json.'},
                 data:{customer:lol.customer}
                 }).
                 success(function(response) {
                    console.log(response);
                    window.location = "invoice.html";
                 })

            }

            }
            };




    }]);

})();