(function() {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .controller('BoughtListController', BoughtListController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);



    Config.$inject = ["ShoppingListServiceProvider"]

    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 5;
    }

    ShoppingListController.$inject = ['ShoppingListService']

    function ShoppingListController(ShoppingListService) {
        var list = this;
        list.items = ShoppingListService.getItems();

        list.boughtItem = function(itemName, itemQuantity, itemIndex) {
            try {
                ShoppingListService.boughtItem(itemName, itemQuantity, itemIndex);
                ShoppingListService.removeItem(itemIndex);

            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.addItem = function(itemName, itemQuantity) {
            try {
                ShoppingListService.addItem(itemName, itemQuantity);

            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    BoughtListController.$inject = ['ShoppingListService']

    function BoughtListController(ShoppingListService) {
        var list = this;
        list.items = ShoppingListService.boughtGetItems();

        list.NoBuy = function(itemName, itemQuantity, itemIndex) {
            try {
                ShoppingListService.addItem(itemName, itemQuantity);
                ShoppingListService.removeItemboughtItems(itemIndex);

            } catch (error) {
                list.errorMessage = error.message;
            }

        };

        list.removeItem = function(itemIndex) {
            BoughtListService.removeItem(itemIndex);
        };
    }


    function ShoppingListService(maxItems) {
        var service = this;

        var items = [{
                name: "cookies",
                quantity: 10
            },
            {
                name: "Coffee",
                quantity: 10
            },
            {
                name: "Glasses",
                quantity: 10
            },
            {
                name: "Apples",
                quantity: 10
            },
            {
                name: "Melons",
                quantity: 10
            },
        ];

        var boughtItems = [];



        service.removeItem = function(itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.removeItemboughtItems = function(itemIndex) {
            boughtItems.splice(itemIndex, 1);
        };

        service.getItems = function() {
            return items;
        };

        service.boughtGetItems = function() {
            return boughtItems;
        }

        service.boughtItem = function(itemName, quantity) {
            if ((maxItems === undefined) || (maxItems !== undefined) && (boughtItems.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                boughtItems.push(item);
            } else {
                throw new Error("Max items (" + maxItems + ")reached.");
            }
        };

        service.addItem = function(itemName, quantity) {
            if ((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                items.push(item);
            } else {
                throw new Error("Max items (" + maxItems + ")reached.");
            }
        };

    }


    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function() {
            var shoppingList = new ShoppingListService(provider.defaults.maxItems);
            return shoppingList;
        };

    }

})();
