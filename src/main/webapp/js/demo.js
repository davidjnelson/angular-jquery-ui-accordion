angular.module('demo', ['angularJqueryUiAccordion'])
.service('MessageBus', function() {
    var self = this;

    self.helloWorlds = [];

    for(var i = 0; i < 1000; i++) {
        self.helloWorlds.push('Hello World');
    }
})
.controller('pane1Controller', ['$scope', 'MessageBus', function($scope, MessageBus) {
    $scope.helloWorlds = MessageBus.helloWorlds;
}]);
