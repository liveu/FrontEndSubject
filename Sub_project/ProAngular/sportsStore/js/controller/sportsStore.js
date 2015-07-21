/**
 * Created by shchoi on 2015-07-21.
 */
angular.module("sportsStar")

    .controller("sportsStoreCtrl", function($scope){
       products : [
           {name : "Product #1", description : "A product", category : "Category #1", price : 100},
           {name : "Product #2", description : "A product", category : "Category #2", price : 120},
           {name : "Product #3", description : "A product", category : "Category #3", price : 110},
           {name : "Product #4", description : "A product", category : "Category #1", price : 220}
       ] ;
    });