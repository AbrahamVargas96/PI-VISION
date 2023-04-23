//************************************
// Begin defining a new symbol
//************************************
(function (CS) {
	//'use strict';
	// Specify the symbol definition	
	var myCustomSymbolDefinition = {
		// Specify the unique name for this symbol; this instructs PI Vision to also
		// look for HTML template and config template files called sym-<typeName>-template.html and sym-<typeName>-config.html
		typeName: 'amcharts-xyplot',
		// Specify the user-friendly name of the symbol that will appear in PI Vision
		displayName: 'amCharts XY Plot',
		// Specify the number of data sources for this symbol; just a single data source or multiple
		datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
		// Specify the location of an image file to use as the icon for this symbol
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/amcharts-xyplot.png',
		visObjectType: symbolVis,
		// Specify default configuration for this symbol
		getDefaultConfig: function () {
			return {
				//
				DataShape: 'TimeSeries',			
				// Specify the default height and width of this symbol
				Height: 600,
				Width: 900,	
				// Specify the value of custom configuration options
				DependenciaXY:'x',
				xPre:0,
				yPre:0,
				xIni:0,
				xFin:100,
				yIni:0,
				yFin:100,
				xInterv:5,
				yInterv:5,
				ValorFijo:'NOMBRE DE TAG',
				bulletType:'round',				
				bulletSize:'5',
				YAxisPos:'left',
				colorYAxis:'#000000',
				colorXAxis:'#000000',
				GridOpacity:'0.15',
				ColorElementOne:'red',
				ColorElementTwo:'blue'				
			};
		},
		// By including this, you're specifying that you want to allow configuration options for this symbol
		 configOptions: function () {
            return [{
				// Add a title that will appear when the user right-clicks a symbol
				title: 'Format Symbol',
				// Supply a unique name for this cofiguration setting, so it can be reused, if needed
                mode: 'format'
            }];
        },		
		
	};
	
	//************************************
	// Function called to initialize the symbol
	//************************************
	
	function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);
	
	symbolVis.prototype.init = function(scope, elem) {
		
		// Specify which function to call when a data update or configuration change occurs 
		this.onDataUpdate = myCustomDataUpdateFunction;
		//this.onConfigChange = myCustomConfigurationChangeFunction;
		this.onConfigChange = myCustomConfigurationChangeFunction;
		// Locate the html div that will contain the symbol, using its id, which is "container" by default
		var symbolContainerDiv = elem.find('#container')[0];
		
		
        // Use random functions to generate a new unique id for this symbol, to make it unique among all other custom symbols
		var newUniqueIDString = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
		// Write that new unique ID back to overwrite the old id
        symbolContainerDiv.id = newUniqueIDString;
		// Create a variable to hold the custom visualization object
		var customVisualizationObject = false;
		// Create a variable to hold the date item name(s)
		var arrprovider=[];		
		var xIni=0, yIni=0;
		var xInter,yInter;
		var xFin, yFin;
		var DependenciaXY;
		var arrdependiente=[];
		var arrFijo=[{}];
		var arrgraphprovider=[];
		var arrAxesprovider=[];				
		var valueFijo;
		var objProviderFijo={};
		var objProviderDep={};
		var objProviderGraph={};
		var objProviderAxes={};
		//************************************
		// When a data update occurs...
		//************************************


						objProviderDep={};						 
						 objProviderDep["title"]='valor1';
						 objProviderDep["x0"]=10;
						 objProviderDep["y0"]=10;
						arrdependiente.push(objProviderDep);			

						objProviderGraph={};
						objProviderGraph["id"]=1;
						objProviderGraph["title"]='valor1';
						objProviderGraph["xField"]="x0";
						objProviderGraph["yField"]="y0";
						objProviderGraph["lineAlpha"]=0;
						objProviderGraph["balloonText"]="<b>[[title]]</b><br>x:<b>[[x]]</b><br>y:<b>[[y]]</b>";						
						arrgraphprovider.push(objProviderGraph);

		function myCustomDataUpdateFunction(data) {
			
			console.log("New data received: ", data);
			var arrColors=[scope.config.ColorElementOne,scope.config.ColorElementTwo];			
			console.log(arrColors);
			if (data !== null && data.Data) {					
				console.log("Now creating custom visualization...");
				if (data.Data[0].ErrorDescription) {
					console.log(data.Data[0].ErrorDescription);
				}				
				if(scope.config.xIni){
					xIni= parseInt(scope.config.xIni);														
					}
				if(scope.config.yIni){
						yIni= parseInt(scope.config.yIni);																		
					}
				if(scope.config.xInterv){
						 var intervaloX= parseFloat(scope.config.xInterv);												 
					}
				if(scope.config.xFin){
					xFin= parseInt(scope.config.xFin);										
					}
				if(scope.config.yFin){
						yFin= parseInt(scope.config.yFin);												
					}
				if(scope.config.yInterv){
						var intervaloY= parseFloat(scope.config.yInterv);					   						
				   }
				if(scope.config.DependenciaXY){
					DependenciaXY=scope.config.DependenciaXY;										
				}
				yInter=	(yFin-yIni)/intervaloY;								
				xInter= (xFin-xIni)/intervaloX;																								
				if (data.Data[0].Label) {
					arrprovider=[];
					for (var i = 0; i < data.Data.length; i++) {							
							scope.config.Label += (", " + data.Data[i].Label);
							scope.config.Units = data.Data[i].Units;
							scope.config.title=data.Data[i].Label.toString();

							var newDataObject = {
							
								"title":(((data.Data[i].Label).toString()).split('|'))[1],																
								"timestampString": data.Data[i].Values[0].Time.toString(), 
								"value": parseFloat( ("" + data.Data[i].Values[0].Value).replace(",", "") ),
								"hora": (((data.Data[i].Values[0].Time.toString()).split(' '))[1].split(":"))[0]+":"+(((data.Data[i].Values[0].Time.toString()).split(' '))[1].split(":"))[1],																						
							};
							
							arrprovider.push(newDataObject);
							
					}
					
					
				}
											
				var ValorFijo;
					ValorFijo=scope.config.ValorFijo;

				arrdependiente=[];
				arrgraphprovider=[];
				arrAxesprovider=[];

				for(var i=0;i<arrprovider.length;i++){
					if(arrprovider[i].title==ValorFijo){						
							objProviderFijo[DependenciaXY]=arrprovider[i].value;
							 valueFijo=arrprovider[i].value;
						arrFijo[0]=Object.assign(arrFijo[0],objProviderFijo);																
					}
				}
				
				
				

				for(var i=0;i<arrprovider.length;i++){
					objProviderAxes={};
					if(arrprovider[i].title!=ValorFijo){
						var ValorDep="",ValorDependiente="";
						
						ValorDependiente=DependenciaXY+i;
						
						objProviderGraph={};
						objProviderDep={};
							
						

						if (DependenciaXY=="x"){
							ValorDep="y0";

							objProviderGraph["xField"]=("x"+i).toString();
							objProviderGraph["yField"]="y0";
							
							objProviderAxes["id"]=("x"+i).toString();
							objProviderAxes["position"]="bottom";
							objProviderAxes["axisAlpha"]=scope.config.GridOpacity;
							objProviderAxes["maximum"]=xFin;
							objProviderAxes["minimum"]=xIni;
							objProviderAxes["precision"]=scope.config.xPre;
							objProviderAxes["autoGridCount"]=false;
							objProviderAxes["gridCount"]=xInter;
							objProviderAxes["gridAlpha"]=scope.config.GridOpacity;
							objProviderAxes["color"]=scope.config.colorXAxis;
							
								
						}
						else if(DependenciaXY=="y"){
							ValorDep="x0";
							objProviderGraph["xField"]="x0";
							objProviderGraph["yField"]=("y"+i).toString();


							objProviderAxes["id"]=("y"+i).toString();
							objProviderAxes["position"]=scope.config.YAxisPos;
							objProviderAxes["axisAlpha"]=scope.config.GridOpacity;
							objProviderAxes["maximum"]=yFin;
							objProviderAxes["minimum"]=yIni;
							objProviderAxes["precision"]=scope.config.yPre;
							objProviderAxes["autoGridCount"]=false;
							objProviderAxes["gridCount"]=yInter;
							objProviderAxes["gridAlpha"]=scope.config.GridOpacity;
							objProviderAxes["color"]=scope.config.colorYAxis;							
						}						

						


						
											 
						 objProviderDep[ValorDep]=arrprovider[i].value;
						 objProviderDep["title"]=arrprovider[i].title;
						 objProviderDep["timestamp"]=arrprovider[i].timestampString;
						 objProviderDep[ValorDependiente]=valueFijo;
						arrdependiente.push(objProviderDep);			
						


												
						objProviderGraph["title"]=arrdependiente[i].title;
						objProviderGraph["lineAlpha"]=0;
						objProviderGraph["bulletColor"]=arrColors[i];
						objProviderGraph["balloonColor"]=arrColors[i];											
						objProviderGraph["balloonText"]="<b>[[title]]</b><br>x:<b>[[x]]</b><br>y:<b>[[y]]</b><br>[[timestamp]]";						
						objProviderGraph["bullet"]=scope.config.bulletType;
						objProviderGraph["bulletSize"]=scope.config.bulletSize;
						
						arrAxesprovider.push(objProviderAxes);
						arrgraphprovider.push(objProviderGraph);						
						ValorDependiente="";
					}else{

						if (DependenciaXY=="x"){
							objProviderAxes["id"]="y0";
							objProviderAxes["position"]=scope.config.YAxisPos;
							objProviderAxes["axisAlpha"]=scope.config.GridOpacity;
							objProviderAxes["maximum"]=yFin;
							objProviderAxes["minimum"]=yIni;
							objProviderAxes["precision"]=scope.config.yPre;
							objProviderAxes["autoGridCount"]=false;
							objProviderAxes["gridCount"]=yInter;
							objProviderAxes["gridAlpha"]=scope.config.GridOpacity;
							objProviderAxes["color"]=scope.config.colorYAxis;							
						}else if(DependenciaXY=="y"){
							objProviderAxes["id"]="x0";
							objProviderAxes["position"]="bottom";
							objProviderAxes["axisAlpha"]=scope.config.GridOpacity;
							objProviderAxes["maximum"]=xFin;
							objProviderAxes["minimum"]=xIni;
							objProviderAxes["precision"]=scope.config.xPre;
							objProviderAxes["autoGridCount"]=false;
							objProviderAxes["gridCount"]=xInter;
							objProviderAxes["gridAlpha"]=scope.config.GridOpacity;
							objProviderAxes["color"]=scope.config.colorXAxis;
							
						}

						arrAxesprovider.push(objProviderAxes);
					}
				}			


				console.log('ArrDep',arrdependiente)
				console.log('arrGraph',arrgraphprovider);
				console.log('arrprovider',arrprovider);	
				console.log('axesprovider',arrAxesprovider);
			

				
				// Create the custom visualization
				if(!customVisualizationObject){
					
					customVisualizationObject = AmCharts.makeChart(symbolContainerDiv.id, {
						"type": "xy",
						"theme": "light",
						"startDuration":0,
						"chartCursor": {},
						"categoryField":"category",																	
						"graphs": arrgraphprovider,
						"valueAxes": arrAxesprovider,
						"dataProvider": arrdependiente,
						"startEffect":"bounce",
						"chartCursor":{
							"cursorColor": "gray",
						}											
						});
				}else{
					
					customVisualizationObject.valueAxes=arrAxesprovider;			
					customVisualizationObject.graphs=arrgraphprovider;
					customVisualizationObject.dataProvider = arrdependiente;
					customVisualizationObject.validateData();
					customVisualizationObject.validateNow();
					
				}
					
					

			}
			
		}
		
		function myCustomConfigurationChangeFunction(data) {
			if(customVisualizationObject) {
					customVisualizationObject.valueAxes=arrAxesprovider;			
					customVisualizationObject.graphs=arrgraphprovider;					
					customVisualizationObject.validateData();
					customVisualizationObject.validateNow();
			}				
			console.log("Configuration updated.");	
		}

	}
		// Register this custom symbol definition with PI Vision
	CS.symbolCatalog.register(myCustomSymbolDefinition);
	
})(window.PIVisualization);