angular.module('shoppingCart.services', [])



.service('getProducts', ['$http', function ($http) {
  this.allProducts = function () {
      return $http.get('../data.json')
  }
}])


.service('shoppingCart', [function () {
  this.items = {}
}])
