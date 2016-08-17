angular.module('shoppingCart', ['ui.router', 'shoppingCart.controllers', 'shoppingCart.filters', 'shoppingCart.services', 'shoppingCart.directives'])


.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home')
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/partials/home.html',
    controller: 'homeController',
    controllerAs: 'home'
  })
  .state('checkout', {
    url: '/checkout',
    templateUrl: '/partials/checkout.html',
    controller: 'checkoutController',
    controllerAs: 'checkout'
  })
}])
