(function (PV){
    //'use strict';
    

        var definition={
            typeName:'Embedded',
            displayName:'embedded',
            datasourceBehavior:PV.Extensibility.Enums.DatasourceBehaviors.Single,       
            iconUrl:'/Scripts/app/editor/symbols/ext/Icons/sym-embedded.png',                                                           
            getDefaultConfig: function(){          
                return{            
                    Height: 500,
                    Width: 500,
                };
            },
            configOptions: function () {
                return [{
                    // Add a title that will appear when the user right-clicks a symbol
                    title: 'Formato de Simbolo',
                    // Supply a unique name for this cofiguration setting, so it can be reused, if needed
                    mode: 'format'
                }];
            },
            visObjectType:symbolVis,

        }


        function symbolVis(){} 
        PV.deriveVisualizationFromBase(symbolVis);
////inicializacion del la extraccion de datos

        symbolVis.prototype.init=function(scope,elem){




            //////
            this.onConfigChange = myCustomConfigurationChangeFunction;
            var customVisualizationObject = false;
            var Liga = document.getElementById("Liga");

            function myCustomConfigurationChangeFunction(data) {
               
                var symbolContainerDiv = elem.find('#container')[0];
                symbolContainerDiv.id = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
                Liga.setAttribute("src", scope.config.URI);
                console.log("Configuration updated."+scope.config.URI);
                console.log("NUMERO ID EMBEBIDO:"+symbolContainerDiv.id);
				
				
			}



        }



    PV.symbolCatalog.register(definition);
       
})(window.PIVisualization);