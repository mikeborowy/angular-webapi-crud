(function () {
    'use strict';

    angular
        .module('App.Core')
        .value('ProductModel', ProductModel);

    function ProductModel() {
        this.productId = 0;
        this.productName = '';
        this.productCode = '';
        this.releaseDate = '';
        this.description = '';
        this.cost = 0;
        this.price = 0;
        this.tags = [];
        this.imageUrl = '';
    }

    ProductModel.prototype = {

        toObject: function (data) {

            this.productId = data.productId;
            this.productName = data.productName;
            this.productCode = data.productCode;
            this.releaseDate = data.releaseDate;
            this.description = data.description;
            this.cost = data.cost;
            this.price = data.price;
            this.tags = data.tags;
            this.imageUrl = data.imageUrl;

            return this;
        }
    }

})();