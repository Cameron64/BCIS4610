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

        $scope.form = {};
        $scope.form.pass = "";
        $scope.count = 0;
        $scope.error = "";
        $scope.attemptsLeft = 5;

        $scope.formSubmit = function () {


            if ($scope.count < 4) {
                $scope.count++;
                $http({
                    method: 'POST',
                    url: 'php/Authenticate.php',
                    headers: {'Content-Type': 'application/json.'},
                    data: {form: $scope.form}
                }).
                    success(function (data) {
                        if(!data.success){
                            $scope.attemptsLeft--;
                            $scope.error = "Incorrect Password " + $scope.attemptsLeft + " attempts remaining.";

                        }
                        else{

console.log("success");
                        }
                    })


            }
            else{
                $scope.error = "Too many failed attempts";
            }
        };


    }]);

})();