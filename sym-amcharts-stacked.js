(function(CS) {
    var myCustomSymbolDefinition = {
        typeName: "amcharts-stacked",
        displayName: "amCharts Stacked Chart",
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        iconUrl: "",
        visObjectType: symbolVis,
        getDefaultConfig: function() {
            return {
                DataShape: 'Table',
                Height: 300,
                Width: 600,
                textColor: "white",
                backgroundColor: "white",
                gridColor: "white",
                plotAreaFillColor: "rgb(46,46,46)",
                useBarsInsteadOfColumns: false,
                seriesColor: "red",
                useUniqueDataItemColors: true,
                showLabels: true,
                columnWidth: 0.5,
                columnOpacity: 1,
                graphType: "column",
                includeElementName: true,
                axisPosition: "left",
                axesColor: "white",
                showCategoryAxisLabels: true,
                alternateEvenAndOddColors: false,
                evenColor: "yellow",
                oddColor: "orange",
                useFixedAxisRange: false,
                fixedYMin: 0,
                fixedYMax: 1
            };
        },
        configOptions: function() {
            return [{
                title: "Format Symbol",
                mode: "format",
            }, ];
        },
    };

    function symbolVis() {}
    CS.deriveVisualizationFromBase(symbolVis);
    symbolVis.prototype.init = function(scope, elem) {
        this.onDataUpdate = myCustomDataUpdateFunction;
        this.onConfigChange = myCustomConfigurationChangeFunction;
        var symbolContainerDiv = elem.find("#container")[0];
        var newUniqueIDString = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
        symbolContainerDiv.id = newUniqueIDString;
        var customVisualizationObject;
        var dataArray = [];

        function myCustomDataUpdateFunction(data) {
            if (data) {
                for (var i = 0; i < data.Rows.length; i++) {
                    if (dataArray[i]) {
                        // Actualizar la hora y la fecha
                        dataArray[i].Time = data.Rows[i].Time;
                        dataArray[i].Value = parseFloat(
                            ("" + data.Rows[i].Value).replace(",", "")
                        );
                        if (data.Rows[i].Units) {
                            dataArray[i].Units = data.Rows[i].Units;
                        }
                        if (data.Rows[i].Label) {
                            dataArray[i].Label = data.Rows[i].Label;
                        }
                    } else {
                        var newDataObject = {
                            Label: data.Rows[i].Label,
                            Time: data.Rows[i].Time,
                            Units: data.Rows[i].Units,
                            Value: parseFloat(("" + data.Rows[i].Value).replace(",", "")),
                        };
                        dataArray[i] = newDataObject;
                    }
                }
                // Crear el gráfico circular si no existe
                if (!customVisualizationObject) {
                    customVisualizationObject = AmCharts.makeChart(
                        symbolContainerDiv.id, {
                            type: "serial",
                            theme: "none",
                            backgroundAlpha: 1,
                            backgroundColor: scope.config.backgroundColor,
                            color: scope.config.textColor,
                            plotAreaFillAlphas: 1,
                            plotAreaFillColors: scope.config.plotAreaFillColor,
                            fontFamily: "arial",
                            creditsPosition: "top-right",
                            rotate: scope.config.useBarsInsteadOfColumns,
                            valueAxes: [{
                                position: scope.config.axisPosition,
                                inside: false,
                                axisAlpha: 0,
                                axisColor: scope.config.axesColor,
                                fillAlpha: 0.05,
                                gridAlpha: 0,
                                gridColor: scope.config.gridColor
                            }],
                            categoryAxis: {
                                axisAlpha: 0,
                                axisColor: scope.config.axesColor,
                                gridAlpha: 0,
                                gridColor: scope.config.gridColor,
                                position: "left",
                            },
                            graphs: [{
                                type: "column",
                                fillAlphas: scope.config.columnOpacity,
                                lineAlpha: 0.3,
                                lineColorField: "uniqueColor",
                                balloonText: "<b> [[StreamName]] </b><br/>Value: [[Value]]<br/>Time: [[Time]]",
                                valueField: "Value",
                                fillColorsField: "uniqueColor",
                                showAllValueLabels: true,
                                labelPosition: "top",
                                labelText: "[[Value]]",
                                labelColorField: "uniqueColor",
                                columnWidth: scope.config.columnWidth
                            }],
                            dataProvider: dataArray,
                            categoryField: "StreamName",
                            chartCursor: {
                                cursorColor: "gray",
                                valueLineBalloonEnabled: true,
                                valueLineEnabled: true,
                                valueZoomable: true
                            },
                            zoomOutButtonImage: "",
                        }
                    );
                } else {
                    // Actualizar el titulo
                    if (scope.config.showTitle) {
                        customVisualizationObject.titles = createArrayOfChartTitles();
                    } else {
                        customVisualizationObject.titles = null;
                    }
                    // Si existe, simplemente actualice el gráfico
                    customVisualizationObject.dataProvider = dataArray;
                    customVisualizationObject.validateData();
                    customVisualizationObject.validateNow();
                }
            }
        }
        // Función que devuelve una matriz de títulos
        function createArrayOfChartTitles() {
            // Construye el texto de los títulos, comenzando con el primer elemento
            var titleText = dataArray[0].Label + " (" + dataArray[0].Units + ")";
            // Agregar todos los elementos sucesivos
            for (var i = 1; i < dataArray.length; i++) {
                titleText +=
                    " vs. " + dataArray[i].Label + " (" + dataArray[i].Units + ")";
            }
            // Formatea los títulos como una matriz
            var titlesArray = [{
                text: titleText,
                size: 12,
            }, ];
            return titlesArray;
        }
        // Función que se llama cuando se realizan cambios de configuración personalizados
        function myCustomConfigurationChangeFunction(data) {
            // Si la visualización existe...
            if (customVisualizationObject) {
                if (customVisualizationObject.color !== scope.config.textColor) {
                    customVisualizationObject.color = scope.config.textColor;
                    customVisualizationObject.legend.color = scope.config.textColor;
                }
                if (
                    customVisualizationObject.backgroundColor !== scope.config.backgroundColor
                ) {
                    customVisualizationObject.backgroundColor = scope.config.backgroundColor;
                }
                if (
                    customVisualizationObject.outlineColor !== scope.config.outlineColor
                ) {
                    customVisualizationObject.outlineColor = scope.config.outlineColor;
                }
                // Actualizar el título, las etiquetas y la leyenda
                if (scope.config.showTitle) {
                    customVisualizationObject.titles = createArrayOfChartTitles();
                } else {
                    customVisualizationObject.titles = null;
                }
                customVisualizationObject.labelsEnabled = scope.config.showLabels;
                customVisualizationObject.legend.enabled = scope.config.showLegend;
                // Confirmar actualizaciones al gráfico
                customVisualizationObject.validateNow();
            }
        }
        // Especificar qué función llamar cuando se produzca una actualización de datos o un cambio de configuración
        return {
            dataUpdate: myCustomDataUpdateFunction,
            configChange: myCustomConfigurationChangeFunction,
        };
    };
    // Registre esta definición de símbolo personalizado con PI Vision
    CS.symbolCatalog.register(myCustomSymbolDefinition);
})(window.PIVisualization);