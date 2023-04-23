(function (PV){
    "use strict";

    function symbolVis() { };
    PV.deriveVisualizationFromBase(symbolVis);

    var definition = {
        typeName: "simplevalue",
        visObjectType: symbolVis,
        datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
        getDefaultConfig: function(){
            return{
                Height: 150,
                Width: 150
            }
        }
    }

    var dataItem={
        time: "4/19/2022 10:00:00 AM",
        value: 100
    }

    symbolVis.prototype.init = function(scope, elem){
        if(data){
            scope.time = data.Time;
            scope.value = data.Value;
        }
    }

    PV.symbolCatalog.register(definition);
})(window.PIVisualization);