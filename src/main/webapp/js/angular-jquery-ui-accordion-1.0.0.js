angular.module('angularJqueryUiAccordion', [])
.directive('accordion', ['$window', '$q', '$templateCache', '$timeout', '$compile', '$http', function($window, $q, $templateCache, $timeout, $compile, $http) {
    (function($, sr){
        // debounce the resize to use less cpu
        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function() {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                };

                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(delayed, threshold);
            };
        }

        // smartresize
        jQuery.fn[sr] = function(fn, threshold){  return fn ? this.bind('resize', debounce(fn, threshold)) : this.trigger(sr); };
    })(jQuery,'smartresize');

    return {
        restrict: 'A',
        scope: false,
        transclude: false,
        replace: false,
        link: function(scope, element, attributes, controller) {
            element.accordion({
                heightStyle: 'fill',
                collapsible: true
            });

            angular.element($window).smartresize(function() {
                scope.$apply(function() {
                    element.accordion('refresh');
                });
            }, attributes.refreshDebounceThreshold || 100);
        }
    };
}]);
