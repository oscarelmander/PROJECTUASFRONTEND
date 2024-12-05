var app = angular.module('PADZApp', []);

app.controller('sidebarController', function ($scope, $location) {
	$scope.currentURL = $location.absUrl().split('/').pop();
});

app.controller('commentsController', function($scope, $http, $location) {
    $scope.isLightMode = true;

	if (localStorage.getItem('isLightMode') !== null) {
		$scope.isLightMode = JSON.parse(localStorage.getItem('isLightMode'));
	}

	$scope.toggleTheme = function () {
		$scope.isLightMode = !$scope.isLightMode;
		localStorage.setItem('isLightMode', JSON.stringify($scope.isLightMode));
	};

	$scope.subscribeAlert = function () {
		alert('Terimakasih telah berlangganan!');
	};

	$scope.isMusicPlaying = false;
	$scope.audioSrc = 'music.mp3';

	$scope.toggleMusic = function () {
		var audio = document.getElementById('audio_player');
		if ($scope.isMusicPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		$scope.isMusicPlaying = !$scope.isMusicPlaying;
	};

	$scope.isLoggedIn = false;
	$scope.isModalVisible = false;

	$scope.user = {
		username: '',
		password: '',
	};

	// Toggle login/logout status
	$scope.toggleLoginStatus = function () {
		if ($scope.isLoggedIn) {
			$scope.isLoggedIn = false;
			localStorage.removeItem('user');
			$scope.user = {
				username: '',
				password: '',
			};
		} else {
			$scope.isModalVisible = true;
		}
	};

	$scope.login = function () {
		// Basic validation for login
		if ($scope.user.username && $scope.user.password) {
			$scope.isLoggedIn = true;
			localStorage.setItem('user', JSON.stringify($scope.user));
			$scope.isModalVisible = false;
			alert('Login Success');
		} else {
			alert('Please enter a username and password.');
		}
	};

	// Kolom Komentar untuk di setiap artikel utama padz dari artikel 1-9
	$scope.comments = []; // Array untuk menyimpan komentar
	$scope.newComment = {};

    $scope.newComment = {
        nomorArtikel: $location.absUrl().split('/').pop(), 
        text: '',
    };
    $scope.comments = []; 

    $scope.loadComments = function() {
        $http.get(`http://localhost:5001/api/comments/${$scope.newComment.nomorArtikel}`)
            .then(function(response) {
                $scope.comments = response.data;
            })
            .catch(function(error) {
                console.error('Error loading comments:', error);
            });
    };

    $scope.addComment = function() {
        console.log("haaaai");
		
        $http.post('http://localhost:5001/api/comments/add', {
            nomorArtikel: $scope.newComment.nomorArtikel,
            isiKomentar: $scope.newComment.text,
			penulis: localStorage.getItem("nama")
        })
            .then(function(response) {
                alert(response.data.message);
                $scope.newComment.text = '';
                $scope.loadComments(); 
            })
            .catch(function(error) {
                alert('Gagal menambahkan komentar');
                console.error(error);
            });
    };

    $scope.loadComments();
});
