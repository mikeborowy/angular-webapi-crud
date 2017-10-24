(function () {
    'use strict'

    var mockupProduct = angular
        .module("ProductResourceMock", ["ngMockE2E"])
        .run(ProductServMockFn);

    function ProductServMockFn($httpBackend) {

        var products = [
           {
               "productId": 1,
               "productName": "Leaf Rake",
               "productCode": "GDN-0011",
               "releaseDate": "March, 19, 2009",
               "description": "Leaf rake with 48-inch wooden handle.",
               "cost": 9.00,
               "price": 19.95,
               "category": "garden",
               "tags": ["leaf", "tool"],
               "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
           },
           {
               "productId": 2,
               "productName": "Garden Cart",
               "productCode": "GDN-0023",
               "releaseDate": "April, 1, 2010",
               "description": "15 gallon capacity rolling garden cart",
               "cost": 20.00,
               "price": 32.99,
               "category": "garden",
               "tags": ["barrow", "cart", "wheelbarrow"],
               "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
           },
           {
               "productId": 5,
               "productName": "Hammer",
               "productCode": "TBX-0048",
               "releaseDate": "June, 31, 2013",
               "description": "Curved claw steel hammer",
               "cost": 1.00,
               "price": 8.99,
               "category": "toolbox",
               "tags": ["tool"],
               "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
           }
           //,{
           //    "productId": 8,
           //    "productName": "Saw",
           //    "productCode": "TBX-0022",
           //    "releaseDate":  "June, 15, 2004",
           //    "description": "15-inch steel blade hand saw",
           //    "cost": 6.95,
           //    "price": 11.55,
           //    "category": "garden",
           //    "tags": ["garden", "mower"],
           //    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
           //},
           //{
           //    "productId": 10,
           //    "productName": "Video Game Controller",
           //    "productCode": "GMG-0042",
           //    "releaseDate":  "Janury, 15, 2010",
           //    "description": "Standard two-button video game controller",
           //    "cost": 2.22,
           //    "price": 35.95,
           //    "category": "gaming",
           //    "tags": ["gaming", "controller", "video game"],
           //    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
           //}
        ];

        var productUrl = "/api/products";
        //when get productUrl return products var
        $httpBackend.whenGET(productUrl).respond(products);

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(OnGetRespond);
        $httpBackend.whenPOST(productUrl).respond(OnPostRespond)

        //$httpBackend intercepts all url requests so
        //we need to add it to pass trough all files
        //like html which means will be ignored
        $httpBackend.whenGET(/app/).passThrough();

        //On whenGET respond
        function OnGetRespond (method,url,data) {

            var product = { "productId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product, {}];
        }

        //On whenPOST respond
        function OnPostRespond (method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                // new product Id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                // Updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];
        };
    }
})()