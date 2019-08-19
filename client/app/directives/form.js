/**
 * Created by viniciusmontanheiro on 22/05/15.
 */

app.directive('bottomSheet', ['$timeout','$mdBottomSheet', function ($timeout,$mdBottomSheet) {
    return {
        restrict: "EA",
        require: 'ngModel',
        replace: true,
        template: '<div>'
        + '<div layout="row" layout-sm="column" layout-align="center">'
        + '<md-button class="md-primary" ng-click="showListBottomSheet($event)"> {{ btnText }} </md-button>'
        +'</div>'
        + '<br/>'
        + '<b layout="row" layout-align="center center" layout-margin>{{alert}}</b>'
        + '</div>',
        scope : {
            dataArray : '=dataArray',
            type : '=type'
        },
        link: function (scope, element, attrs) {
            scope.btnText = attrs.btnText;
        },
        controller: function ($scope) {
            $scope.alert = '';
            var icons = JSON.parse($scope.dataArray);

            if($scope.type.toLowerCase() === "grid") {

                $scope.showGridBottomSheet = function ($event) {
                    $scope.alert = '';
                    $mdBottomSheet.show({
                        template: '<md-bottom-sheet class="md-grid">'
                        + '<md-list>'
                        + '<md-list-item ng-repeat="item in items">'
                        + '<md-button class="md-grid-item-content" ng-click="listItemClick($index)">'
                        + '<md-icon md-svg-src="{{item.icon}}"></md-icon>'
                        + '<div class="md-grid-text"> {{ item.name }} </div>'
                        + '</md-button>'
                        + '</md-list-item>'
                        + '</md-list>'
                        + '</md-bottom-sheet>',
                        controller: function ($scope, $mdBottomSheet) {
                            $scope.items = icons;
                            $scope.listItemClick = function ($index) {
                                var clickedItem = $scope.items[$index];
                                $mdBottomSheet.hide(clickedItem);
                            };
                        },
                        targetEvent: $event
                    }).then(function (clickedItem) {
                        $scope.alert = clickedItem.name + ' clicked!';
                    });
                };

            }else {

                $scope.showListBottomSheet = function ($event) {
                    $scope.alert = '';

                    $mdBottomSheet.show({
                        template: ' <md-bottom-sheet class="md-list md-has-header">'
                        + '<md-subheader></md-subheader>'
                        + '<md-list>'
                        + '<md-list-item ng-repeat="item in items">'
                        + '<md-button class="md-list-item-content" ng-click="listItemClick($index)">'
                        + '<md-icon md-svg-src="{{item.icon}}"></md-icon>'
                        + '<span class="md-inline-list-icon-label">{{ item.name }}</span></md-button>'
                        + '</md-list-item>'
                        + '</md-list>'
                        + '</md-bottom-sheet>',
                        controller: function ($scope, $mdBottomSheet) {

                            $scope.items = icons;

                            $scope.listItemClick = function ($index) {
                                var clickedItem = $scope.items[$index];
                                $mdBottomSheet.hide(clickedItem);
                            };
                        },
                        targetEvent: $event
                    }).then(function (clickedItem) {
                        $scope.alert = clickedItem.name + ' clicked!';
                    });
                };
            }

        }//main-controller

    }//return

}]);