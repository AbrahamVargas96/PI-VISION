(function (PV){
    'use strict';
    
    function symbolVis(){} 
    PV.deriveVisualizationFromBase(symbolVis);

    symbolVis.prototype.init=function(scope,elem){}

        var definition={
            typeName:'Embedded',
            displayName:'embedded',
            datasourceBehavior:PV.Extensibility.Enums.DatasourceBehaviors.Single,       
            iconUrl:'/Scripts/app/editor/symbols/ext/Icons/sym-embedded.png',                                                           
            getDefaultConfig: function(){          
                return{            
                    Height: 80,
                    Width: 80,
                };
            },
            visObjectType:symbolVis,

        }
    PV.symbolCatalog.register(definition);
       
})(window.PIVisualization);