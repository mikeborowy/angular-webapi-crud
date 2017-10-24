(function () {
    'use strict'

    angular
        .module("App.Common.Services")
        .factory("ProductCalculationsSrvc", ProductCalculationsSrvcFn)

    function ProductCalculationsSrvcFn() {

        function CalculateMarginPrct(price, cost) {
            var margin = 0;
            if (price && cost) {
                margin = (100 * (price - cost)) / price;
            }

            margin = Math.round(margin);
            return margin;
        }

        function CalculateMarginAmount(price, cost) {
            var margin = 0;
            if (price && cost) {
                margin = price - cost;
            }
            return margin;
        }

        function CalculatePriceFromPercent(cost, percent) {
            var price = cost;
            if (cost && percent) {
                price = cost + (cost * percent / 100);
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        }

        function CalculatePriceFromAmount(cost, amount) {
            var price = cost;
            if (cost && amount) {
                price = cost + amount;
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        }

        return {
            calculateMarginPercent: CalculateMarginPrct,
            calculateMarginAmount: CalculateMarginAmount,
            calculatePriceFromMarkupPercent: CalculatePriceFromPercent,
            calculatePriceFromMarkupAmount: CalculatePriceFromAmount
        }
    };

})()