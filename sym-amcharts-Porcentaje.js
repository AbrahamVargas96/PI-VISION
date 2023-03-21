(function (CS) {

    var array = new Array();

    var myCustomSymbolDefinition = {

        typeName: 'amcharts-Porcentaje',
        displayName: 'amCharts Porcentaje',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/porcentaje.png',
        visObjectType: symbolVis,

        getDefaultConfig: function () {
            return {
                DataShape: 'Table',
                DataQueryMode: CS.Extensibility.Enums.DataQueryMode.ModeEvents,
                Height: 300,
                Width: 200,
                minimumYValue: 0,
                maximumXValue: 100,
                useCustomYAxisRange: false,
                showTitle: true,
                textColor: "black",
                backgroundColor: "white",
                plotAreaFillColor: "white",
                FontSize: 15,
                seriesColor: "blue",
                seriesColor1: "blue",
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

        var dataprovider;

        var runtimeData = scope.runtimeData;

        console.log("valor de scop:: porcetaje" + runtimeData);

        var pluginArrayArg = new Array();

        for (var o = 0; o <= labels.length - 1; o++) {

            var tag = labels[o].Label.split('?');

            pluginArrayArg.push(tag[0]);
        }

        var sele = document.getElementById('selection');

        console.log("sele porcentaje" + sele);



        console.log("Manejo de los arreglos de los colores: " + scope.config.selectColorText + " ," + scope.config.selectColor);




        function initChart() {

            var symbolContainerDiv = elem.find('#container')[0];
            symbolContainerDiv.id = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
            var chartconfig = getChartConfig();
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

            dataprovider = convertToChartDataFormat(newdata, labels);
            
            dataprovider.forEach(element => {
                console.log("elementos: " + JSON.stringify(element));
                array.push(element.color);
            });
            
            var arrayDataprovider = new Array();
            
            for (var i = 0; i <= newdata.Rows.length-1; i++) {
                
                const valor = ""+dataprovider[i].litres+"";
                const newValor = valor.replace(/[.,]/g, "");
                //console.log(newValor);

            var propiedadesGrafica = new Object();
            propiedadesGrafica.name=dataprovider[i].name;
            propiedadesGrafica.litres=newValor;
            propiedadesGrafica.STAMPTIME=dataprovider[i].STAMPTIME;

            arrayDataprovider.push(propiedadesGrafica);
            } 

            //console.log("ARREGLO DE PROVIDER NEW: "+ JSON.stringify(arrayDataprovider));
            var dataProviderd = [
                {
                    "country": "Lithuania",
                    "litres": 501.9,
                    "STAMPTIME": "25/08/2022"
                }, {
                    "country": "Czech Republic",
                    "litres": 301.9,
                    "STAMPTIME": "26/08/2022"
                }, {
                    "country": "Ireland",
                    "litres": 201.1,
                    "STAMPTIME": "27/08/2022"
                }, {
                    "country": "Germany",
                    "litres": 165.8,
                    "STAMPTIME": "28/08/2022"
                }, {
                    "country": "Australia",
                    "litres": 139.9,
                    "STAMPTIME": "29/08/2022"
                }, {
                    "country": "Austria",
                    "litres": 128.3,
                    "STAMPTIME": "30/08/2022"
                }
            ];

            console.log("ARRAY DE TITULOS porcentaje" + JSON.stringify(dataprovider));
            var styleFamily =  scope.config.tipofuente;

           var balloonText  = "<div style='font-family:"+styleFamily+";'><b> [[name]] </b> <br>valor </br> <b>[[litres]]</b> <br> <span style='font-size:50'> <br> Tiempo: [[STAMPTIME]] </br> </span></div>";
            

            chart.dataProvider = arrayDataprovider;
            chart.balloonText  = ""+balloonText+"";
            chart.validateData();
        }

        function convertToChartDataFormat(newdata, labels) {

            console.log("tags: " + labels[0].Label);
            return newdata.Rows.map(
                function (item, index) {

                    console.log("valorReal:: porcentaje" + parseFloat(item.Value).toFixed(3));

                    var caso = 0;

                    return {
                        name: labels[index].Label,
                        litres: estarData(caso,item.Value),
                        STAMPTIME: item.Time,
                        color: "#fff",
                        INDEX: index 
                    }
                }
            );
        }

        //Se crea funcion para parseo de los datos
        function estarData(caso, valorReal) {
            if (caso === 1) {
                // Algoritmo para distincion
            }
            else {
             var dato=valorReal.split(',');

              if(dato.length==1){var cantidad=dato;}else{var cantidad=dato[0]+dato[1];}
             
              //  var pointsParsial = parseFloat(valorReal.replace(/\,/g, "."));
            //  console.log("abrahamdato:"+valorReal);
                var pointsParsial = parseFloat(valorReal);
            }
            console.log("abraham dato:"+valorReal);
            return pointsParsial;
        }

        function getChartConfig() {
            
            return {
                "type": "pie",
                "theme": "none",
                " fontSize": 300,
                "titles": createArrayOfChartTitles(),

                "radius": "35%",
                "innerRadius": "50%", // Este cambio se hace para al radio de la dona
                "gradientRatio": [0.4, 0.4, 0 ,0.2, -0.2],
                "colors": [], //Nuevo
                // "colors": [scope.config.selectColorText, scope.config.selectColorText, scope.config.selectColorText], // Se cambia por la matriz que se esta utilizando 
               // "balloonText": "<div style='font-family:"+styleFamily+";'><b> [[name]] </b> <br>valor </br> <b>[[value]]</b> <br> <span style='font-size:50'> <br> Tiempo: [[STAMPTIME]] </br> </span></div>",
                "valueField": "litres",
                "titleField": "country",
                "angle": 25, // Para ver el angulo de la dona
                "depth3D": 0,
                "balloon": {
                    "drop": false, //True maneja el Globo, en False se maneja un cuadrado
                    //"adjustBorderColor": false, //Color del contorno de adentro de los ballons
                   // "fillColor": "#0000FF",
                    //"color": "#FFFFFF", //Se cambia por la matriz que se esta utilizando para los colores
                    " fontSize": 300,
                },
                "export": {
                    "enabled": true
                }
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
                    "size": scope.config.FontSize + 3,
                    "bold": false
                }
            ];
            return titlesArray;
        }

        //************************************
        // Function that is called when custom configuration changes are made
        //************************************

        function myCustomConfigurationChangeFunction(data) {

            // Update the even and odd colors

            if (chart) {
                // Apply new settings

                chart.titles[0].text = scope.config.TitleText;
                chart.titles[0].size = scope.config.FontSize;

                // Update the title
                if (scope.config.showTitle) {
                    chart.titles[0].text = scope.config.TitleText;
                } else {
                    chart.titles[0].text = "";
                }

                if (chart.color != scope.config.textColor) {
                    chart.color = scope.config.textColor;
                }

                //Angulos
                chart.depth3D = scope.config.angleSize;
                chart.angle = scope.config.angleDona;

                //Properties Angles
                chart.radius = scope.config.radio ;
                chart.innerRadius = scope.config.radioInterno ;

                //Change colors
                console.log("mustra del scope 1 :" + chart.colors.length + "seleccion color index : " + scope.config.selectColorText);

                // if(scope.config.selectColorText <= chart.colors.length){
                //     chart.colors [scope.config.selectColorText] = scope.config.selectColor;
                // }else{
                //     chart.colors
                // }

                //Esto es lo nuevo que estamos agregando para los nuevos colores
                chart.colors [0] = scope.config.selectColor;
                chart.colors [1] = scope.config.selectColor1;
                chart.colors [2] = scope.config.selectColor2;
                chart.colors [3] = scope.config.selectColor3;
                chart.colors [4] = scope.config.selectColor4;
                chart.colors [5] = scope.config.selectColor5;
                chart.colors [6] = scope.config.selectColor6;
                chart.colors [7] = scope.config.selectColor7;
                chart.colors [8] = scope.config.selectColor8;
                chart.colors [9] = scope.config.selectColor9;
                chart.colors [10] = scope.config.selectColor10;
                chart.colors [11] = scope.config.selectColor11;
                chart.colors [12] = scope.config.selectColor12;
                chart.colors [13] = scope.config.selectColor13;
                chart.colors [14] = scope.config.selectColor14;
                chart.colors [15] = scope.config.selectColor15;
                chart.colors [16] = scope.config.selectColor16;
                chart.colors [17] = scope.config.selectColor17;

                chart.balloon.fontSize = scope.config.fontSizeUp;
                chart.balloon.color = scope.config.colorText;
                

                if (scope.config.colorCambiar) {
                    chart.balloon.adjustBorderColor = true;
                    chart.balloon.fillColor = scope.config.colorPoopup;
                } else {
                    chart.balloon.adjustBorderColor = false;
                }

                console.log("Muestra de chart colors: " + chart.colors);
                chart.validateNow();
                console.log("Configuration update porcentaje");
            }
        }
    }
    CS.symbolCatalog.register(myCustomSymbolDefinition);

})(window.PIVisualization);