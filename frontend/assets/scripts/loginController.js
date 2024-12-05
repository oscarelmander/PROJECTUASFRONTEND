var app = angular.module('PADZApp', []);

app.controller('loginController', function($scope, $http) {
    $scope.userLoggedIn = {
        nama: "dummy", 
        email: "dummy" 
    };

    $scope.activeUser = {};

    const token = localStorage.getItem('token');

    console.log('Token:', token); 
    if (token) {
        try {
            const decoded = jwt_decode(token);
            console.log('Decoded Token:', decoded);

            if (!localStorage.getItem('id')){
                localStorage.setItem('id', decoded.id);
                localStorage.setItem('nama', decoded.nama);
                localStorage.setItem('email', decoded.email);
            }
            
            console.log('Data stored in localStorage:', {
                id: localStorage.getItem('id'),
                nama: localStorage.getItem('nama'),
                email: localStorage.getItem('email')
            });

            $scope.userLoggedIn.id = localStorage.getItem('id');
            $scope.userLoggedIn.nama = localStorage.getItem('nama');
            $scope.userLoggedIn.email = localStorage.getItem('email');
            console.log($scope.userLoggedIn.id);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    $scope.openEditModal = function() {
        // Assign the logged-in user to activeUser for editing
        $scope.activeUser.name = $scope.userLoggedIn.nama;
        $scope.activeUser.email = $scope.userLoggedIn.email;
        $('#editProfileModal').modal('show');
    };

    // Update Profile (send PUT request to backend)
    $scope.updateProfile = function() {
        const updatedData = {
            name: $scope.activeUser.name,
            email: $scope.activeUser.email
        };
        console.log("try");

        $http.put(`http://localhost:5001/api/users/${$scope.userLoggedIn.id}`, updatedData)
            .then(function(response) {
                console.log('Profile updated successfully', response.data);
                $scope.userLoggedIn.nama = response.data.user.name;
                $scope.userLoggedIn.email = response.data.user.email;

                localStorage.setItem('nama', response.data.user.name);
                localStorage.setItem('email', response.data.user.email);

                // Close the modal
                $('#editProfileModal').modal('hide');
            })
            .catch(function(error) {
                console.error('Error updating profile:', error);
                alert('Error updating profile');
            });
    };

    $scope.login = function() {
        $http.post('http://localhost:5001/api/users/login', $scope.user)
            .then(function(response) {
            
                if ($scope.user.email === "adminpadz@gmail.com") {
                    window.location.href = '/adminPage'; 
                } else {
                    window.location.href = '/'; 
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                }
            })
            .catch(function(error) {
                alert(error.data.error);
            });
    };


    $scope.logout = function() {
        localStorage.removeItem('id');
        localStorage.removeItem('nama');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        $scope.isLoggedIn = false;
        window.location.href = "/";
    };
    
});
