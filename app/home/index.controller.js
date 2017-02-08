(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.users = null;
        vm.user = null;

        initController();

        function initController() {
            // get all user
            UserService.GetAll().then(function (users) {
                vm.users = users;
            });
            //get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }

})();