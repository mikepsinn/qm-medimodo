angular.module('qmStarterApp')
    .controller('starterController', function ($state) {
        $state.go('login');
    });
