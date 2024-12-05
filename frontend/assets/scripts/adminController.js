var app = angular.module('PADZApp', []);

app.controller('adminController', function($scope, $http) {
    $scope.users = [];
    
    $scope.loadUsers = function() {
        $http.get('http://localhost:5001/api/users/')
            .then(function(response) {
                console.log(response.data)
                $scope.users = response.data.users; 
            })
            .catch(function(error) {
                console.error('Error loading users:', error);
            });
    };

    $scope.loadUsers();

    $scope.deleteUser = function(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            $http.delete('http://localhost:5001/api/users/' + userId)
                .then(function(response) {
                    alert('User deleted successfully');
                    $http.get('http://localhost:5001/api/users').then(function(response) {
                        $scope.users = response.data.users;
                    });
                })
                .catch(function(error) {
                    alert('Error deleting user');
                });
        }
    };
});