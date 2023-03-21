(function (CS) {
    //'use strict';

    var myCustomSymbolDefinition = {

        typeName: 'amcharts-ValueLabel',
        displayName: 'Values Label',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/etiqueta.png',
        visObjectType: symbolVis,

        getDefaultConfig: function () {
            return {
                //
                DataShape: 'Table',
                DataQueryMode: CS.Extensibility.Enums.DataQueryMode.ModeEvents,

                Height: 500,
                Width: 600,
                minimumYValue: 0,
                maximumXValue: 100,
                useCustomYAxisRange: false,
                showTitle: true,
                textColor: "black",
                backgroundColor: "white",
                plotAreaFillColor: "white",
                fontSize: 12,
                seriesColor: "blue",
                showChartScrollBar: false,
                useColumns: false,
                exportData: false,
                exportDataItemPaths: false,
                Intervals: 1000000,
                TitleText: "Title Text"
            };
        },
        
        configOptions: function () {
            return [{
                title: 'Configurar Simbolo',
                mode: 'format'
            }];
        }
    };

    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

    symbolVis.prototype.init = function (scope, elem) {
        this.onDataUpdate = myCustomDataUpdateFunction;
        this.onConfigChange = myCustomConfigurationChangeFunction;
        var labels = getLabels(scope.symbol.DataSources);
        var chart = initChart();
       var datacontext;
        var runtimeData = scope.runtimeData;

        console.log("valor de scop:: fhfgjfgj" + runtimeData);

        var pluginArrayArg = new Array();

        for (var o = 0; o <= labels.length - 1; o++) {

            var tag = labels[o].Label.split('?');

            pluginArrayArg.push(tag[0]);

        }


        var sele = document.getElementById('selection');

        console.log("sele storage" + sele);

        function initChart() {

            var symbolContainerDiv = elem.find('#container')[0];
            symbolContainerDiv.id = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
            var chartconfig = getChartConfig();
            //AmCharts.addLicense("AM5C323226113"); 
            var customVisualizationObject = AmCharts.makeChart(symbolContainerDiv.id, chartconfig);
            return customVisualizationObject;
        }

        function getLabels(datasources) {
            return datasources.map(function (item) {
                var isAttribute = /af:/.test(item);
                var label = isAttribute ? item.match(/\w*\|.*$/)[0] : item.match(/\w+$/)[0];
                if (!scope.config.includeElementName && (label.indexOf("|") !== -1)) {
                    label = label.split("|")[label.split("|").length - 1];
                }
                return {
                    Label: label
                };
            });
        }


        function myCustomDataUpdateFunction(newdata) {
           
            console.log(JSON.stringify(newdata));
            if (!newdata || !chart) return;

            if (!labels) {
                labels = getLabels(scope.symbol.DataSources);
            }

            if (newdata.Rows[0].Label) {
                labels = newdata.Rows.map(
                    function (item) {
                        var label = item.Label;
                        if (!scope.config.includeElementName && (label.indexOf("|") !== -1)) {
                            label = label.split("|")[label.split("|").length - 1];
                        }
                        return {
                            Label: label
                        };
                    }
                );
            }

            var dataprovider = convertToChartDataFormat(newdata, labels);
            datacontext=convertToChartDataFormat(newdata, labels);
          

            console.log("prueba storage" + JSON.stringify(dataprovider));

             // Se realiza el arreglo para las matrices que se usaran de los datos reales
     
if(scope.config.showTitle1==true && scope.config.showTitle2==false){

/*  var dataProviderd = [
                {
            
                }
            ];*/

chart.allLabels[0].text=scope.config.TitleText;
chart.validateNow();


}

if(scope.config.showTitle1==false && scope.config.showTitle2==true){

    /*  var dataProviderd = [
                    {
                
                    }
                ];*/
    
    
    if(scope.config.showTitle3==true  && scope.config.showTitle4==true  && scope.config.showTitle5==true){chart.allLabels[0].text=dataprovider[0].nombre+"\n"+dataprovider[0].valor+"\n"+dataprovider[0].tiempo;chart.validateNow();}
 if(scope.config.showTitle3==true  && scope.config.showTitle4==false  && scope.config.showTitle5==false){chart.allLabels[0].text=dataprovider[0].nombre;}
  if(scope.config.showTitle3==false  && scope.config.showTitle4==true  && scope.config.showTitle5==false){chart.allLabels[0].text=dataprovider[0].valor;}
  if(scope.config.showTitle3==false  && scope.config.showTitle4==false  && scope.config.showTitle5==true){chart.allLabels[0].text=dataprovider[0].tiempo;}
  if(scope.config.showTitle3==true  && scope.config.showTitle4==false  && scope.config.showTitle5==true){chart.allLabels[0].text=dataprovider[0].nombre+"\n"+dataprovider[0].tiempo;}
  if(scope.config.showTitle3==false  && scope.config.showTitle4==true  && scope.config.showTitle5==true){chart.allLabels[0].text=dataprovider[0].valor+"\n"+dataprovider[0].tiempo;}
  if(scope.config.showTitle3==true  && scope.config.showTitle4==true  && scope.config.showTitle5==false){chart.allLabels[0].text=dataprovider[0].nombre+"\n"+dataprovider[0].valor;}


    chart.validateNow();


    
    
    }

    if(scope.config.showTitle7==true){


        if(scope.config.showTitle8==true){


            scope.config.TitleText1=datacontext[0].valor;
            chart.allLabels[0].url=scope.config.TitleText1;

        }else{
            
            chart.allLabels[0].url=scope.config.TitleText1;


        }

        chart.allLabels[0].url=scope.config.TitleText1;


       }else{
        chart.allLabels[0].url="";

       }

          

          

           // chart.dataProvider = dataProviderd;
            chart.validateData();
        }

        function convertToChartDataFormat(newdata, labels) {

            return newdata.Rows.map(
                function (item, index) {

                    console.log("valorReal:: storage" + parseFloat(item.Value).toFixed(3));

                    var caso = 0;

                    return {

                        nombre: labels[index].Label,
                        valor: item.Value,
                        tiempo: item.Time,
                        index1: index
                    }
                }
            );
        }


       
        function getChartConfig() {

            return {
                "type": "serial",
    "theme": "none",
 /*   "legend": {
        "equalWidths": false,
        "useGraphSettings": true,
        "valueAlign": "left",
        "valueWidth": 120
    },*/

  "allLabels": [
		{
			"text": "Free label",
			"bold": true,
			"x": 0,
			"y": 0,
      "size":10,
      "rotation":0,
      "bold":true,
      "color":"#ff4f68",
      "alpha":1,
      "url":""
		}
	],

  

 
            }; // Termina el return

        } // Termina la funcion

        //************************************
        // Function that returns an array of titles
        //************************************
        //
        function createArrayOfChartTitles() {
            var titleText = scope.config.TitleText;

            var titlesArray = [
                {
                    "text": titleText,
                    "size": scope.config.fontSize + 3,
                    "bold": false
                }
            ];
            return titlesArray;
        }

        //************************************
        // Hace cambios en la funcion de configuracion
        //************************************

        function myCustomConfigurationChangeFunction(data) {

          //  console.log("dataconfig::>>"+JSON.stringify(data));
            console.log("FIN DE dataconfig::>>"+JSON.stringify(datacontext));
            // Update the even and odd colors

       //general
      // chart.allLabels[0].text=scope.config.TitleText;
       chart.allLabels[0].bold=scope.config.showTitle6;
       chart.allLabels[0].size=scope.config.fontSize;
       chart.allLabels[0].rotation=scope.config.fontSize1;
       chart.allLabels[0].y=scope.config.fontSize2;
       chart.allLabels[0].x=scope.config.fontSize3;
       chart.allLabels[0].color=scope.config.seriesColorBar;

       if(scope.config.showTitle7==true){


        if(scope.config.showTitle8==true){


            scope.config.TitleText1=datacontext[0].valor;
            chart.allLabels[0].url=scope.config.TitleText1;

        }else{
            
            chart.allLabels[0].url=scope.config.TitleText1;


        }

        chart.allLabels[0].url=scope.config.TitleText1;


       }else{
        chart.allLabels[0].url="";

       }





   chart.validateNow();






        }

    }
    CS.symbolCatalog.register(myCustomSymbolDefinition);

})(window.PIVisualization);