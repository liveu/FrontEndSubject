/**
 * Created by shchoi on 2015-06-28.
 */
'use strict'
angular.module('myApp.directives', []).directives('helloWorld', function(){
        return{
            restrict : "AE",
            scope : {name : "=name"},
            template : "<h1>Hello{{name.first}}{{name.last}}! </h1> " +
                       "<input data-ng-model = 'name.first'></<input/>" +
                       "<input data-ng-model = 'name.last'></<input/>"

        }
});