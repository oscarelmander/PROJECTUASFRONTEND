var app = angular.module('PADZApp', []);

app.controller('registerController', function($scope, $http) {
    $scope.submitForm = function() {
        
        console.log('registering... ');
        //TODO: compare dulu
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        $http.post('http://localhost:5001/api/users/register', $scope.user)
            .then(function(response) {
                alert(response.data.message);
                window.location.href = '/loginPage'; 
            })
            .catch(function(error) {
                alert(error.data.error);
            });
    };
});