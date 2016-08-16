angular.module('shoppingCart.filters', [])


.filter('yesNo', () => val => val === true ? 'Yes' : 'No')

.filter('price', () => val => val / 100)
