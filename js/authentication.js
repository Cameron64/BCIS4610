/**
 * Created by camer_000 on 11/3/14.
 */
(function () {
    var app = angular.module('authenticate', []);

    app.controller('AuthenticationController', ['$http','$scope', function ($http,$scope) {

        scop = this;
        /*
         declares productController.products to be the json array
         */
        $http.get('js/array.json').then(function (res) {
            scop.products = res.data;
        });

this.form = {};
this.form.pass = "";
this.count = 0;
        this.error = "";
        this.attemptsLeft = 5;

        this.formSubmit = function () {


            if (this.count < 4) {
                this.count++;
                lol = this;
                $http({
                    method: 'POST',
                    url: 'php/Authenticate.php',
                    headers: {'Content-Type': 'application/json.'},
                    data: {form: lol.form}
                }).
                    success(function (data) {
                        if(!data.success){
                            lol.attemptsLeft--;
                            lol.error = "Incorrect Password " + lol.attemptsLeft + " attempts remaining.";

                        }
                        else{


                        }
                    })


            }
            else{
            this.error = "Too many failed attempts";
            }
        };


    }]);

})();