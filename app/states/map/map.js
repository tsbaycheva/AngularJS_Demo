(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('theMap', theMap)
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('map', {
                url: '/map',
                template: '<the-map></the-map>'
            });
    }

    function theMap() {

        var directive = {
            templateUrl: './states/map/map.html',
            restrict: 'E',
            controller: controller
        };

        return directive;
    }

    controller.$inject = ['$scope', 'NgMap', 'mapService'];


    function controller($scope, NgMap, mapService) {

        // Id initilizer for info window and markers.
        var id = 'b';

        NgMap.getMap().then(function (map) {
            $scope.map = map;
        });

        // Initial addresses.
        $scope.addresses = mapService.locations;

        // Marker on-click function.
        $scope.showDetail = function (e, item) {

            $scope.currentAddress = item.address;
            $scope.currentId = item.id;
            $scope.currentName = item.name;
            $scope.currentDescription = item.description;

            // The info window gets positioned on the
            // correct marker due to the unique id
            // generated every time.
            $scope.map.showInfoWindow('pop-up', item.id);

        };

        // Current center map is on.
        $scope.text = 'Sofia, Bulgaria';

        $scope.submit = function () {
            mapService.addNewLocation($scope.text, $scope.name, $scope.description);

            $scope.text = '';
            $scope.name = '';
            $scope.description = '';
        };

        // Possibly not needed.
        $scope.deleteMarkers = function () {
            $scope.addresses = mapService.deleteMarkers();
        };

        // TODO.
        $scope.deleteCertainMarker = function () {

            for (var key in $scope.map.markers) {
                // Key returns address's ID which gets set randomly following id generator...
                $scope.addresses.forEach(iteratedAddress => {
                    // Iterate over all addresses to find the one with the matching id.
                    if (iteratedAddress.id === key) {
                        // Check to see if marker was deleted and return or
                        // delete certain marker here.
                    }
                });
            }
        };

        $scope.showMarkers = function () {

            for (var key in $scope.map.markers) {
                $scope.map.markers[key].setMap($scope.map);
            }
        };

        $scope.hideMarkers = function () {
            for (var key in $scope.map.markers) {
                $scope.map.markers[key].setMap(null);
            }
        };
        // Possibly not needed.


    }

} (angular));