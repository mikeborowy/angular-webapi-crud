(function () {
    'use strict';

    var controllerId = "PriceAnalyticsCtrl";

    angular
       .module("App.Price")
       .controller(controllerId,  PriceAnalyticsCtrlFn)

    PriceAnalyticsCtrlFn.$inject = [
        "$scope",
        "$filter",
        "dataContext",
        "ProductCalculationsSrvc"
    ]

    function PriceAnalyticsCtrlFn($scope, $filter, dataContext, productCalculations) {

        $scope.title = "Price Analytics"
        var productObjArray = dataContext;

        //Computed property
        for (var i = 0; i < productObjArray.length; i++) {

            var product = productObjArray[i]
            product.marginPercent = productCalculations.calculateMarginPercent(product.price, product.cost);
            product.marginAmount = productCalculations.calculateMarginAmount(product.price, product.cost);
        }

        /*CHART AMOUNT START*/
        var orderedProductAmout = $filter("orderBy")(productObjArray, "marginAmount");
        var filteredProductAmout = $filter("limitTo")(orderedProductAmout, 5);
        var dataAmount = SetupChart(filteredProductAmout);

        $scope.labelsBar1 = dataAmount.labels;
        $scope.seriesBar1 = ["Cost", "Price", "Margin Amount"];
        $scope.dataBar1 = [
          dataAmount.cost,
          dataAmount.price,
          dataAmount.marginAmount
        ];

        $scope.options1 = {
            responsive: true,
            legend: {
                display:true
            }
        }
        /*CHART AMOUNT END*/

        /*CHART PERCENT START*/
        var orderedProductPercent = $filter("orderBy")(productObjArray, "marginPercent");
        var filteredProductPercent = $filter("limitTo")(orderedProductPercent, 5);
        var dataPercent = SetupChart(filteredProductPercent);

        $scope.labelsBar2 = dataPercent.labels;
        $scope.seriesBar2 = ["Margin %"];
        $scope.dataBar2 = [
          dataPercent.marginPercent
        ];

        $scope.options2 = {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Products'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage'
                    }
                }]
            }
        }
        /*CHART PERCENT END*/

        function SetupChart(array) {

            var labels = [];
            var dataAmount = [];
            var cost = [];
            var price = [];
            var marginAmount = [];
            var marginPercent = [];

            for (var i = 0; i < array.length; i++) {

                var product = array[i];
                labels.push(product.productName);
                cost.push(product.cost);
                price.push(product.price);
                marginAmount.push(product.marginAmount);
                marginPercent.push(product.marginPercent);
            }

            return { labels: labels, cost: cost, price: price, marginAmount: marginAmount, marginPercent: marginPercent };
        }

    }

})()