var app = angular.module('PADZApp', []);

app.controller('mainController', function ($scope) {
	$scope.sudahLogin = localStorage.getItem('token') !== null;
    console.log($scope.sudahLogin);
	console.log("cek");
	// console.log(localStorage.getItem('nama'));
    
    $scope.handleLoginClick = function() {
        if ($scope.sudahLogin) {
            // logout();
            window.location.href = "/profilePage";
			console.log("haloooo");
        } else {
            console.log(localStorage.getItem('nama'));
            window.location.href = '/loginPage';
        }
    };

	// Light/Dark Mode
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

	// Fungsi untuk menambahkan komentar
	$scope.addComment = function () {
		if ($scope.newComment.text) {
			$scope.comments.push({
				text: $scope.newComment.text,
				timestamp: new Date(),
			});
			$scope.newComment.text = ''; // Reset textarea setelah menambahkan komentar
		}
	};
});

// Contact form controller
app.controller('contactController', function ($scope) {
	$scope.contact = JSON.parse(localStorage.getItem('contactData')) || {};

	$scope.submitForm = function () {
		if ($scope.contact.name && $scope.contact.email && $scope.contact.message) {
			alert(
				'Form submitted!\nName: ' +
				$scope.contact.name +
				'\nEmail: ' +
				$scope.contact.email +
				'\nMessage: ' +
				$scope.contact.message
			);
			localStorage.setItem('contactData', JSON.stringify($scope.contact));
			localStorage.removeItem('contactData');
			$scope.contact = {}; // Clear model data
			$scope.contactForm.$setPristine(); // Reset form pristine state
		} else {
			alert('Please fill in all fields.');
		}
	};
});

// Rating controller
app.controller('ratingController', function ($scope) {
	// Data for rating
	$scope.rating = 0;
	$scope.stars = new Array(10); // Array with 10 elements for 10 stars

	$scope.setRating = function (star) {
		$scope.rating = star; // Set the selected rating
	};

	$scope.submitRating = function () {
		if ($scope.rating > 0) {
			localStorage.setItem('rating', $scope.rating);
			alert('Thank you for rating us ' + $scope.rating + ' stars!');
			console.log('Rating Submitted:', $scope.rating);
			$scope.rating = 0; // Reset rating
		} else {
			alert('Please select a rating before submitting.');
		}
	};
});

app.controller('sidebarController', function ($scope, $location) {
	$scope.currentURL = $location.absUrl().split('/').pop();
});
