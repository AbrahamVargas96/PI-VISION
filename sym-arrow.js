/*
*File for the symbol's logic
*@author    MASPM
*@version   1.0
*
*
*
*
*Function  IIFE (Inmediatly Invoked Function Expression)
*@param     PV -Takes window.PIVisualization as argument
*@param      Object window.PIVisualization
*/
(function (PV){
    'use strict';
    
    function symbolVis(){}  //Define visualization object as a function

/*
*Method to extend the visualization object with the SymbolBase prototype to add some
*default symbol behavoir to the object that is used internally by the framework
*@param     symbolVis
*@returns   symbolVis
*/
    PV.deriveVisualizationFromBase(symbolVis);


/*
*Function   init-Defined on the prototype of the symbol container object created in 'deriveVisualizationFromBase(symbolVis)'
*           and it will be called when the symbol is added to a display.
*           It makes any properties we plan using anywhere else in the symbols are defined before they're referenced
*           and It helps keep track of the properties we'are adding to the scope object
*/    
    symbolVis.prototype.init=function(scope,elem){
        scope.Value='';
        scope.Time='';
        scope.Label = '';
        scope.Units = '';
   
/*
*Function   onDataUpdate-It's called any time a data update occurs
*@param     newData
*@returns   Gauge object- It's depends by the 'Data shape' specified in the 'getDefaultConfig' method.
*/        
            this.onDataUpdate=onDataUpdate; 
                function onDataUpdate(newData){

//Verify the contain of newData
                    
                
                    
                                      
                    if(!newData){
                        return;
                    }
//Transform Indicator to degrees
                    var degrees=360*newData.Indicator/100;
//Find element by its class                    
                    var svgArrow = elem.find('.svg-arrow')[0];
//Rotation                    
                    svgArrow.setAttribute('transform', 'rotate(' + degrees + ' 35 35)');
//Update scope Value and Timestamp any time we get a new value
                    scope.Value = newData.Value;
                    scope.Timestamp=newData.Time;
//Verify the contain of propeties Label and Units and update any time we get a new value
                    if (newData.Label !== undefined) {
                        scope.Label = newData.Label;
                        if (newData.Units !== undefined) {
                        scope.Units = newData.Units;
                        } else {
                        scope.Units = '';
                        }
                        }
                        
                }
                
                    
    }



/*
*Define the symbol definition object with following properties
*
*@required  typeName 
*@required  visObjectType
*/
        var definition={
            typeName:'Arrow',
            //Mapping the number of datasources the symbol accepts (How many tags it consumes)
            datasourceBehavior:PV.Extensibility.Enums.DatasourceBehaviors.Single,       
            iconUrl:'/Scripts/app/editor/symbols/ext/Icons/sym-arrow.png',    
            //visObjectType value should be the symbol object created with  method 'PV.deriveVisualizationFromBase()'          
            visObjectType:symbolVis,                                                    


/*
*Function   getDefaultConfig()-Method to specify the collection of parameters that should be serialiazed to the backend database
*@returns   JS object
*/
            getDefaultConfig: function(){          
                return{
                    DataShape: 'Gauge',
                    Height: 80,
                    Width: 80,
                    ValueScale: false,
                    ValueScaleSettings:{
                        MinType: 2,
                        MinValue: 0,
                        MaxType: 2,
                        MaxValue: 360
                    },
                    LabelColor:'white',
                    ValueColor:'white',
                    Timestamp:'white',
                    ShowValue: true,
                    ShowLabel:true,
                    ShowTimestamp:true,
                    
                };
            },
/*
*Functions  configOptions-It creates a symbols context menu showtcut to open the configuration pane
*@required  title-Display name
*@required   mode-Unique Id
*/
            configOptions: function() {
                return [{
                   
                    title: "Format Wind Arrow",
                    
                    mode: "formatwindArrow",
                }, ];
            }
        }


/*
*Function   symbolCatalog-We are creating an empty object and passing that into the 'register()' function
*@param     definition
*/   
    PV.symbolCatalog.register(definition);

})(window.PIVisualization);