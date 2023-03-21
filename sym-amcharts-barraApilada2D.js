(function (CS) {

    var myCustomSymbolDefinition = {

        typeName: 'amcharts-barraApilada2D',
        displayName: 'amCharts barraApilada2D',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/barras-apiladas.png',
        visObjectType: symbolVis,

        getDefaultConfig: function () {
            return {
                DataShape: 'Table',
                // DataQueryMode: CS.Extensibility.Enums.DataQueryMode.ModeEvents,
                Height: 300,
                Width: 600,
                showTitle: true,
                textColor: "black",
                FontSize: 15,
                backgroundColor: "rgb(255,255,255)",
                gridColor: "darkgray",
                plotAreaFillColor: "rgb(15,117,117)",
                useBarsInsteadOfColumns: false,
                seriesColor: "red",
                useUniqueDataItemColors: true,
                showLabels: false,
                columnWidth: 0.5,
                columnOpacity: 1,
                graphType: "column",
                includeElementName: true,
                axisPosition: "left",
                axesColor: "black",
                showCategoryAxisLabels: true,
                alternateEvenAndOddColors: false,
                evenColor: "yellow",
                oddColor: "orange",
                useFixedAxisRange: false,
                fixedYMin: 0,
                fixedYMax: 1,
                TitleText: "Title Text"
            };
        },
        configOptions: function () {
            return [{
                title: 'Configuracion Simbolo',
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

        //************************************
        // Create the new chart!
        //************************************
        function initChart() {
            var symbolContainerDiv = elem.find('#container')[0];
            symbolContainerDiv.id = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
            var chartconfig = getChartConfig();
            var customVisualizationObject = AmCharts.makeChart(symbolContainerDiv.id, chartconfig);
            return customVisualizationObject;
        }

        //************************************
        // Extract the data item labels from a new update
        //************************************
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

            for (s of dataprovider) {
                var idDato = s.IndexID;
            }

            if (idDato == 0) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,
                }];
            }

            if (idDato == 1) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,
                }];
            }

            if (idDato == 2) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,
                }];
            }
            
            if (idDato == 3) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,
                }];
            }
            
            if (idDato == 4) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,
                }];
            }

            if (idDato == 5) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,

                    //Value 6
                    "Value6": dataprovider[5].Value,
                    "Time6": dataprovider[5].Time,
                    "StreamName6": dataprovider[5].StreamName,
                }];
            }

            if (idDato == 6) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,

                    //Value 6
                    "Value6": dataprovider[5].Value,
                    "Time6": dataprovider[5].Time,
                    "StreamName6": dataprovider[5].StreamName,

                    //Value 7
                    "Value7": dataprovider[6].Value,
                    "Time7": dataprovider[6].Time,
                    "StreamName7": dataprovider[6].StreamName,
                }];
            }

            if (idDato == 7) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,

                    //Value 6
                    "Value6": dataprovider[5].Value,
                    "Time6": dataprovider[5].Time,
                    "StreamName6": dataprovider[5].StreamName,

                    //Value 7
                    "Value7": dataprovider[6].Value,
                    "Time7": dataprovider[6].Time,
                    "StreamName7": dataprovider[6].StreamName,

                    //Value 8
                    "Value8": dataprovider[7].Value,
                    "Time8": dataprovider[7].Time,
                    "StreamName8": dataprovider[7].StreamName,
                }];
            }

            if (idDato == 8) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,

                    //Value 6
                    "Value6": dataprovider[5].Value,
                    "Time6": dataprovider[5].Time,
                    "StreamName6": dataprovider[5].StreamName,

                    //Value 7
                    "Value7": dataprovider[6].Value,
                    "Time7": dataprovider[6].Time,
                    "StreamName7": dataprovider[6].StreamName,

                    //Value 8
                    "Value8": dataprovider[7].Value,
                    "Time8": dataprovider[7].Time,
                    "StreamName8": dataprovider[7].StreamName,

                    //Value 9
                    "Value9": dataprovider[8].Value,
                    "Time9": dataprovider[8].Time,
                    "StreamName9": dataprovider[8].StreamName,
                }];
            }

            if (idDato == 9) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,

                    //Value 6
                    "Value6": dataprovider[5].Value,
                    "Time6": dataprovider[5].Time,
                    "StreamName6": dataprovider[5].StreamName,

                    //Value 7
                    "Value7": dataprovider[6].Value,
                    "Time7": dataprovider[6].Time,
                    "StreamName7": dataprovider[6].StreamName,

                    //Value 8
                    "Value8": dataprovider[7].Value,
                    "Time8": dataprovider[7].Time,
                    "StreamName8": dataprovider[7].StreamName,

                    //Value 9
                    "Value9": dataprovider[8].Value,
                    "Time9": dataprovider[8].Time,
                    "StreamName9": dataprovider[8].StreamName,

                    //Value 10
                    "Value10": dataprovider[9].Value,
                    "Time10": dataprovider[9].Time,
                    "StreamName10": dataprovider[9].StreamName,
                }];
            }
            
            if (idDato == 10) {
                var dataProvideri = [{
                    "Categoria": "",
                    //Value 1
                    "Value": dataprovider[0].Value,
                    "Time": dataprovider[0].Time,
                    "StreamName": dataprovider[0].StreamName,

                    //Value 2
                    "Value2": dataprovider[1].Value,
                    "Time2": dataprovider[1].Time,
                    "StreamName2": dataprovider[1].StreamName,

                    //Value 3
                    "Value3": dataprovider[2].Value,
                    "Time3": dataprovider[2].Time,
                    "StreamName3": dataprovider[2].StreamName,

                    //Value 4
                    "Value4": dataprovider[3].Value,
                    "Time4": dataprovider[3].Time,
                    "StreamName4": dataprovider[3].StreamName,

                    //Value 5
                    "Value5": dataprovider[4].Value,
                    "Time5": dataprovider[4].Time,
                    "StreamName5": dataprovider[4].StreamName,

                    //Value 6
                    "Value6": dataprovider[5].Value,
                    "Time6": dataprovider[5].Time,
                    "StreamName6": dataprovider[5].StreamName,

                    //Value 7
                    "Value7": dataprovider[6].Value,
                    "Time7": dataprovider[6].Time,
                    "StreamName7": dataprovider[6].StreamName,

                    //Value 8
                    "Value8": dataprovider[7].Value,
                    "Time8": dataprovider[7].Time,
                    "StreamName8": dataprovider[7].StreamName,

                    //Value 9
                    "Value9": dataprovider[8].Value,
                    "Time9": dataprovider[8].Time,
                    "StreamName9": dataprovider[8].StreamName,

                    //Value 10
                    "Value10": dataprovider[9].Value,
                    "Time10": dataprovider[9].Time,
                    "StreamName10": dataprovider[9].StreamName,

                    //Value 11
                    "Value11": dataprovider[10].Value,
                    "Time11": dataprovider[10].Time,
                    "StreamName11": dataprovider[10].StreamName,
                }];
            }

            if (idDato <= 10) {
                chart.dataProvider = dataProvideri;
                chart.validateData();
            }
        }

        //************************************
        // Specify a default color pallette
        //************************************
        var chartColors = ["rgb(255, 235, 167)", "rgb(40, 169, 81)", "rgb(199, 221, 241)", "rgb(245, 178, 131)", "rgb(219, 70, 70)", "rgb(197, 223, 181)", "rgb(60, 191, 60)", "rgb(197, 86, 13)", "rgb(46, 32, 238)", "rgb(165, 32, 86)"];
        var evenOddColors = [scope.config.evenColor, scope.config.oddColor];
        
        //************************************
        // Convert the data update from PI Vision into a format that amCharts accepts
        //************************************
        function convertToChartDataFormat(newdata, labels) {
            return newdata.Rows.map(
                function (item, index) {                    
                    console.log("ValorReal:: value " + parseFloat(item.Value).toFixed(3));
                    var caso = 0;
                    return {
                        Value: parseFloat(item.Value),
                        Time: item.Time,
                        StreamName: labels[index].Label,
                        uniqueColor: chartColors[index],
                        commonColor: scope.config.seriesColor,
                        evenOrOddColor: evenOddColors[(index % 2)],
                        IndexID: index,
                        valor: estarData(caso, item.Value)
                    }
                }
            );
        }

        function estarData(caso, valorReal) {
            if (caso === 1) {

            }
            else {
                var pointsParsial = parseFloat(valorReal.replace(/\,/g, "."));
            }
            return pointsParsial;
        }

        //************************************
        // Define the initial chart formatting
        //************************************
        function getChartConfig() {
            return {
                "type": "serial",
                "theme": "none",
                " depth3D":30,
                "angle":30,
                "titles": createArrayOfChartTitles(),

                "valueAxes": [{
                    "stackType": "regular",
                    "axisAlpha": 0.3,
                    "gridAlpha": 0
                }],
                "graphs": [{
                    "balloonText": "<span style='font-size:300'><b>[[StreamName]]</b><b><br/>Value: [[Value]]<br/>Time: [[Time]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName2]]</b><b><br/>Value: [[Value2]]<br/>Time: [[Time2]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value2",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName3]]</b><b><br/>Value: [[Value3]]<br/>Time: [[Time3]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value3",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName4]]</b><b><br/>Value: [[Value4]]<br/>Time: [[Time4]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value4",
                    showAllValueLabels: true,
                }, 
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName5]]</b><b><br/>Value: [[Value5]]<br/>Time: [[Time5]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value5",
                    showAllValueLabels: true,
                }, 
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName6]]</b><b><br/>Value: [[Value6]]<br/>Time: [[Time6]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value6",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName7]]</b><b><br/>Value: [[Value7]]<br/>Time: [[Time7]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value7",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName8]]</b><b><br/>Value: [[Value8]]<br/>Time: [[Time8]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value8",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName9]]</b><b><br/>Value: [[Value9]]<br/>Time: [[Time9]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value9",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName10]]</b><b><br/>Value: [[Value10]]<br/>Time: [[Time10]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value10",
                    showAllValueLabels: true,
                },
                {
                    "balloonText": "<span style='font-size:300'><b>[[StreamName11]]</b><b><br/>Value: [[Value11]]<br/>Time: [[Time11]] </span>",
                    "fillAlphas": 0.8,
                    "labelText": "[[]]",
                    "lineAlpha": 0.3,
                    "title": "",
                    "type": "column",
                    "color": "#000000",
                    "valueField": "Value11",
                    showAllValueLabels: true,
                }
                ],
                "balloon": {
                    "maxWidth":1000000,
                    //"fontSize":50,
                 },
                "categoryField": "Categoria",
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "position": "left",
                    "lineColor": scope.config.seriesColorBar
                },
                "export": {
                    "enabled": true
                },
            }; // End Return
        } // End Function

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

           

                chart.titles[0].text = scope.config.TitleText;
                chart.titles[0].size = scope.config.FontSize;

                // Update the title
                if (scope.config.showTitle) {
                    chart.titles[0].text = scope.config.TitleText;
                } else {
                    chart.titles[0].text = "";
                }

                if(scope.config.showTitle2==true){

                    chart.depth3D=30;
                    chart.angle=30;
   
   
                   }else{
   
                       chart.depth3D=0;
                       chart.angle=0;
                   }
   
                chart.balloon.fontSize = scope.config.fontSizeUp;


                if (chart.color != scope.config.textColor) {
                    chart.color = scope.config.textColor;
                }
                

                chart.graphs[0].lineColor = scope.config.seriesColorBar;
                chart.graphs[1].lineColor = scope.config.seriesColorBar1;
                chart.graphs[2].lineColor = scope.config.seriesColorBar2;
                chart.graphs[3].lineColor = scope.config.seriesColorBar3;
                chart.graphs[4].lineColor = scope.config.seriesColorBar4;
                chart.graphs[5].lineColor = scope.config.seriesColorBar5;
                chart.graphs[6].lineColor = scope.config.seriesColorBar6;
                chart.graphs[7].lineColor = scope.config.seriesColorBar7;
                chart.graphs[8].lineColor = scope.config.seriesColorBar8;
                chart.graphs[9].lineColor = scope.config.seriesColorBar9;
                chart.graphs[10].lineColor = scope.config.seriesColorBar10;
                chart.graphs[11].lineColor = scope.config.seriesColorBar11;
                chart.graphs[12].lineColor = scope.config.seriesColorBar12;
                chart.graphs[13].lineColor = scope.config.seriesColorBar13;
                chart.graphs[14].lineColor = scope.config.seriesColorBar14;
                
                if (chart.graphs[0].lineColor != scope.config.seriesColorBar == 1) {
                    chart.graphs[0].lineColor = scope.config.seriesColorBar;
                }    
                
                if (chart.graphs[1].lineColor != scope.config.seriesColorBar1 == 2) {
                    chart.graphs[1].lineColor = scope.config.seriesColorBar1;
                }

                if (chart.graphs[2].lineColor != scope.config.seriesColorBar2 == 3) {
                    chart.graphs[2].lineColor = scope.config.seriesColorBar2;
                }    
                
                if (chart.graphs[3].lineColor != scope.config.seriesColorBar3 == 4) {
                    chart.graphs[3].lineColor = scope.config.seriesColorBar3;
                }

                if (chart.graphs[4].lineColor != scope.config.seriesColorBar4 == 5) {
                    chart.graphs[4].lineColor = scope.config.seriesColorBar4;
                }    
                
                if (chart.graphs[5].lineColor != scope.config.seriesColorBar5 == 6) {
                    chart.graphs[5].lineColor = scope.config.seriesColorBar5;
                }

                if (chart.graphs[6].lineColor != scope.config.seriesColorBar6 == 7) {
                    chart.graphs[6].lineColor = scope.config.seriesColorBar6;
                }    
                
                if (chart.graphs[7].lineColor != scope.config.seriesColorBar7 == 8) {
                    chart.graphs[7].lineColor = scope.config.seriesColorBar7;
                }

                if (chart.graphs[8].lineColor != scope.config.seriesColorBar8 == 9) {
                    chart.graphs[8].lineColor = scope.config.seriesColorBar8;
                }    
                
                if (chart.graphs[9].lineColor != scope.config.seriesColorBar9 == 10) {
                    chart.graphs[9].lineColor = scope.config.seriesColorBar9;
                }

                if (chart.graphs[10].lineColor != scope.config.seriesColorBar10 == 11) {
                    chart.graphs[10].lineColor = scope.config.seriesColorBar10;
                }    
                
                if (chart.graphs[11].lineColor != scope.config.seriesColorBar11 == 12) {
                    chart.graphs[11].lineColor = scope.config.seriesColorBar11;
                }

                if (chart.graphs[12].lineColor != scope.config.seriesColorBar12 == 13) {
                    chart.graphs[12].lineColor = scope.config.seriesColorBar12;
                }

                if (chart.graphs[13].lineColor != scope.config.seriesColorBar13 == 14) {
                    chart.graphs[13].lineColor = scope.config.seriesColorBar13;
                }    
                
                if (chart.graphs[14].lineColor != scope.config.seriesColorBar14 == 15) {
                    chart.graphs[14].lineColor = scope.config.seriesColorBar14;
                }

                

                console.log("Change Update");
                chart.validateNow();
              
            
        }
    }
    CS.symbolCatalog.register(myCustomSymbolDefinition);
})(window.PIVisualization);
