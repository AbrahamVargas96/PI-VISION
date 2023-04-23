(function(CS) {
    //'use strict';

    var myCustomSymbolDefinition = {

        typeName: 'amcharts-locationsensibilitymap',
        displayName: 'amCharts locationsensibilitymap Chart1',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/amchart-map-mexico.png',
        visObjectType: symbolVis,
        getDefaultConfig: function() {
            return {
                //
                DataShape: 'Table',
                Height: 300,
                Width: 600,
                textColor: "black",
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
                fixedYMax: 1
            };
        },
        configOptions: function() {
            return [{
                title: 'Format Symbol',
                mode: 'format'
            }];
        }
    };

    function symbolVis() {}
    CS.deriveVisualizationFromBase(symbolVis);

    symbolVis.prototype.init = function(scope, elem) {
        this.onDataUpdate = myCustomDataUpdateFunction;
        this.onConfigChange = myCustomConfigurationChangeFunction;
        var labels = getLabels(scope.symbol.DataSources);
        var chart = initChart();

        //************************************
        // Create the new chart!
        //************************************
        function initChart() {
            // Locate the symbol element
            var symbolContainerDiv = elem.find('#container')[0];
            // Assign a unique ID to the element
            symbolContainerDiv.id = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
            // Get the chart default configuration
            var chartconfig = getChartConfig();
            // Create the chart object!
            var customVisualizationObject = AmCharts.makeChart(symbolContainerDiv.id, chartconfig);
            return customVisualizationObject;
        }

        //************************************
        // Extract the data item labels from a new update
        //************************************
        function getLabels(datasources) {
            return datasources.map(function(item) {
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





        var incprueba = 0;


        //************************************
        // Define what happens ever time a new data update occurs
        //************************************
        function myCustomDataUpdateFunction(newdata) {
            if (!newdata || !chart) return;
            // Get the data item labels
            if (!labels) {
                labels = getLabels(scope.symbol.DataSources);
            }
            // If Rows have Label => either configuration is updated 
            if (newdata.Rows[0].Label) {
                labels = newdata.Rows.map(
                    function(item) {
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
            // Convert the new data into the amCharts format, and feed it to the graph

            //var dataprovider = 0
            var dataprovider = convertToChartDataFormat(newdata, labels);


            for (s of dataprovider) {


                var idDato = s.IndexID;

            }

            console.log("datoconteo:" + idDato);


            /*

                          if (idDato == 0) {


                              var dataProvideri = [{
                                  "Categoria": "INDICADOR",
                                  ///////////////
                                  "Value": dataprovider[0].Value,
                                  "Time": dataprovider[0].Time,
                                  "StreamName": dataprovider[0].StreamName,

                              }];

                          }



                          if (idDato == 1) {

                              var dataProvideri = [{
                                  "Categoria": "INDICADOR",
                                  /////////////////////////1
                                  "Value": dataprovider[0].Value,
                                  "Time": dataprovider[0].Time,
                                  "StreamName": dataprovider[0].StreamName,
                                  /////////////////////////2
                                  "Value2": dataprovider[1].Value,
                                  "Time2": dataprovider[1].Time,
                                  "StreamName2": dataprovider[1].StreamName,





                              }];



                          }



                          if (idDato == 2) {

                              var dataProvideri = [{
                                  "Categoria": "INDICADOR",
                                  /////////////////////////1
                                  "Value": dataprovider[0].Value,
                                  "Time": dataprovider[0].Time,
                                  "StreamName": dataprovider[0].StreamName,
                                  /////////////////////////2
                                  "Value2": dataprovider[1].Value,
                                  "Time2": dataprovider[1].Time,
                                  "StreamName2": dataprovider[1].StreamName,
                                  //////////////////////////3
                                  "Value3": dataprovider[2].Value,
                                  "Time3": dataprovider[2].Time,
                                  "StreamName3": dataprovider[2].StreamName,




                              }];



                          }




                          if (idDato == 3) {

                              var dataProvideri = [{
                                  "Categoria": "INDICADOR",
                                  /////////////////////////1
                                  "Value": dataprovider[0].Value,
                                  "Time": dataprovider[0].Time,
                                  "StreamName": dataprovider[0].StreamName,
                                  /////////////////////////2
                                  "Value2": dataprovider[1].Value,
                                  "Time2": dataprovider[1].Time,
                                  "StreamName2": dataprovider[1].StreamName,
                                  //////////////////////////3
                                  "Value3": dataprovider[2].Value,
                                  "Time3": dataprovider[2].Time,
                                  "StreamName3": dataprovider[2].StreamName,
                                  /////////////////////////4
                                  "Value4": dataprovider[3].Value,
                                  "Time4": dataprovider[3].Time,
                                  "StreamName4": dataprovider[3].StreamName,



                              }];



                          }




                          if (idDato == 4) {

                              var dataProvideri = [{
                                  "Categoria": "INDICADOR",
                                  /////////////////////////1
                                  "Value": dataprovider[0].Value,
                                  "Time": dataprovider[0].Time,
                                  "StreamName": dataprovider[0].StreamName,
                                  /////////////////////////2
                                  "Value2": dataprovider[1].Value,
                                  "Time2": dataprovider[1].Time,
                                  "StreamName2": dataprovider[1].StreamName,
                                  //////////////////////////3
                                  "Value3": dataprovider[2].Value,
                                  "Time3": dataprovider[2].Time,
                                  "StreamName3": dataprovider[2].StreamName,
                                  /////////////////////////4
                                  "Value4": dataprovider[3].Value,
                                  "Time4": dataprovider[3].Time,
                                  "StreamName4": dataprovider[3].StreamName,
                                  //////////////////////////////////////////////////5
                                  "Value5": dataprovider[4].Value,
                                  "Time5": dataprovider[4].Time,
                                  "StreamName5": dataprovider[4].StreamName,





                              }];



                          }


                          if (idDato == 5) {

                              var dataProvideri = [{
                                  "Categoria": "INDICADOR",
                                  /////////////////////////1
                                  "Value": dataprovider[0].Value,
                                  "Time": dataprovider[0].Time,
                                  "StreamName": dataprovider[0].StreamName,
                                  /////////////////////////2
                                  "Value2": dataprovider[1].Value,
                                  "Time2": dataprovider[1].Time,
                                  "StreamName2": dataprovider[1].StreamName,
                                  //////////////////////////3
                                  "Value3": dataprovider[2].Value,
                                  "Time3": dataprovider[2].Time,
                                  "StreamName3": dataprovider[2].StreamName,
                                  /////////////////////////4
                                  "Value4": dataprovider[3].Value,
                                  "Time4": dataprovider[3].Time,
                                  "StreamName4": dataprovider[3].StreamName,
                                  //////////////////////////////////////////////////5
                                  "Value5": dataprovider[4].Value,
                                  "Time5": dataprovider[4].Time,
                                  "StreamName5": dataprovider[4].StreamName,
                                  ///////////////////////////////////////6
                                  "Value6": dataprovider[5].Value,
                                  "Time6": dataprovider[5].Time,
                                  "StreamName6": dataprovider[5].StreamName,

                              }];



                          }



                          if (idDato <= 5) {

                          


                          }*/
            //   incprueba++;
            //  console.log("dataproviderabraham:" + JSON.stringify(dataProvideri));
            ///     console.log(incprueba);

            /*    jQuery.getJSON("https://services.amcharts.com/ip/?v=xz6Z", function(geo) {

                var defaultMap = "usaLow";
                var countryMaps = {
                    "AF": ["afghanistanLow"],
                    "AL": ["albaniaLow"],
                    "DZ": ["algeriaLow"],
                    "AD": ["andorraLow"],
                    "AO": ["angolaLow"],
                    "AR": ["argentinaLow"],
                    "AM": ["armeniaLow"],
                    "AU": ["australiaLow"],
                    "AT": ["austriaLow"],
                    "AZ": ["azerbaijanLow"],
                    "BS": ["bahamasLow"],
                    "BH": ["bahrainLow"],
                    "BD": ["bangladeshLow"],
                    "BY": ["belarusLow"],
                    "BE": ["belgiumLow"],
                    "BZ": ["belizeLow"],
                    "BT": ["bhutanLow"],
                    "BO": ["boliviaLow"],
                    "BA": ["bosniaHerzegovinaCantonsLow"],
                    "BW": ["botswanaLow"],
                    "BR": ["brazilLow"],
                    "BN": ["bruneiDarussalamLow"],
                    "BG": ["bulgariaLow"],
                    "BF": ["burkinaFasoLow"],
                    "BI": ["burundiLow"],
                    "KH": ["cambodiaLow"],
                    "CM": ["cameroonLow"],
                    "CA": ["canadaLow"],
                    "CV": ["capeVerdeLow"],
                    "CF": ["centralAfricanRepublicLow"],
                    "TD": ["chadLow"],
                    "CL": ["chileLow"],
                    "CN": ["chinaLow"],
                    "CO": ["colombiaLow"],
                    "CD": ["congoDRLow"],
                    "CG": ["congoLow"],
                    "CR": ["costaRicaLow"],
                    "HR": ["croatiaLow"],
                    "CU": ["cubaLow"],
                    "CY": ["cyprusLow"],
                    "UN": ["cyprusNorthernCyprusLow"],
                    "GB": ["unitedKingdomLow"],
                    "CZ": ["czechRepublicLow"],
                    "DK": ["denmarkLow"],
                    "DJ": ["djiboutiLow"],
                    "DO": ["dominicanRepublicLow"],
                    "EC": ["ecuadorLow"],
                    "EG": ["egyptLow"],
                    "SV": ["elSalvadorLow"],
                    "EE": ["estoniaLow"],
                    "FI": ["finlandLow"],
                    "FR": ["france2016Low"],
                    "GE": ["georgiaLow"],
                    "DE": ["germanyLow"],
                    "GR": ["greeceLow"],
                    "GT": ["guatemalaLow"],
                    "GN": ["guineaLow"],
                    "GY": ["guyanaLow"],
                    "HT": ["haitiLow"],
                    "HN": ["hondurasLow"],
                    "HK": ["hongKongLow"],
                    "HU": ["hungaryLow"],
                    "GL": ["icelandLow"],
                    "IS": ["icelandLow"],
                    "IN": ["indiaLow"],
                    "ID": ["indonesiaLow"],
                    "MY": ["malaysiaLow"],
                    "IR": ["iranLow"],
                    "IQ": ["iraqLow"],
                    "IE": ["irelandLow"],
                    "IL": ["israelLow"],
                    "PS": ["palestineLow"],
                    "VA": ["italyLow"],
                    "SM": ["sanMarinoLow"],
                    "MT": ["italyLow"],
                    "IT": ["italyLow"],
                    "JM": ["jamaicaLow"],
                    "JP": ["japanLow"],
                    "KZ": ["kazakhstanLow"],
                    "KE": ["kenyaLow"],
                    "XK": ["kosovoLow"],
                    "KG": ["kyrgyzstanLow"],
                    "LA": ["laosLow"],
                    "LV": ["latviaLow"],
                    "LT": ["lithuaniaLow"],
                    "LU": ["luxembourgLow"],
                    "MK": ["macedoniaLow"],
                    "ML": ["maliLow"],
                    "MX": ["mexicoLow"],
                    "MD": ["moldovaLow"],
                    "MN": ["mongoliaLow"],
                    "ME": ["montenegroLow"],
                    "MA": ["moroccoLow"],
                    "MM": ["myanmarLow"],
                    "NP": ["nepalLow"],
                    "NL": ["netherlandsLow"],
                    "NZ": ["newZealandLow"],
                    "NI": ["nicaraguaLow"],
                    "NG": ["nigeriaLow"],
                    "NO": ["norwayLow"],
                    "AE": ["unitedArabEmiratesLow"],
                    "OM": ["omanLow"],
                    "PK": ["pakistanLow"],
                    "PA": ["panamaLow"],
                    "PY": ["paraguayLow"],
                    "PE": ["peruLow"],
                    "PH": ["philippinesLow"],
                    "PL": ["polandLow"],
                    "PT": ["portugalLow"],
                    "PR": ["puertoRicoLow"],
                    "US": ["usaLow"],
                    "QA": ["qatarLow"],
                    "RO": ["romaniaLow"],
                    "RW": ["rwandaLow"],
                    "SA": ["saudiArabiaLow"],
                    "RS": ["serbiaLow"],
                    "SG": ["singaporeLow"],
                    "SK": ["slovakiaLow"],
                    "SI": ["sloveniaLow"],
                    "LS": ["southAfricaLow"],
                    "ZA": ["southAfricaLow"],
                    "KR": ["southKoreaLow"],
                    "ES": ["spainLow"],
                    "LK": ["sriLankaLow"],
                    "SR": ["surinameLow"],
                    "SE": ["swedenLow"],
                    "CH": ["switzerlandLow"],
                    "SY": ["syriaLow"],
                    "TW": ["taiwanLow"],
                    "TJ": ["tajikistanLow"],
                    "TH": ["thailandLow"],
                    "TR": ["turkeyLow"],
                    "UG": ["ugandaLow"],
                    "UA": ["ukraineLow"],
                    "GG": ["unitedKingdomLow"],
                    "JE": ["unitedKingdomLow"],
                    "IM": ["unitedKingdomLow"],
                    "UY": ["uruguayLow"],
                    "UZ": ["uzbekistanLow"],
                    "VE": ["venezuelaLow"],
                    "VN": ["vietnamLow"],
                    "YE": ["yemenLow"]
                };

                // calculate which map to be used*/
            /*  var currentMap = defaultMap;
              var titles = [];
              if (countryMaps[geo.country_code] !== undefined) {
                  currentMap = countryMaps[geo.country_code][0];

                  // add country title
                  if (geo.country_name) {
                      titles.push({
                          "text": geo.country_name
                      });
                  }

              }

              console.log("countryName:" + geo.country_name);*/



            var dataProviderd = {

                "titles": [{
                    "text": " fdfsrfgsdf",



                }],
                "map": "mexicoLow",
                "areas": [{
                    "id": "MX-AGU",
                    "value": 4447100
                }, {
                    "id": "MX-BCN",
                    "value": 170000
                }, {
                    "id": "MX-BCS",
                    "value": 5130632
                }, {
                    "id": "MX-CAM",
                    "value": 2673400
                }, {
                    "id": "MX-CHP",
                    "value": 33871648
                }, {
                    "id": "MX-CHH",
                    "value": 4301261
                }, {
                    "id": "MX-COA",
                    "value": 3405565
                }, {
                    "id": "MX-OCL",
                    "value": 783600
                }, {
                    "id": "MX-DIF",
                    "value": 15982378
                }, {
                    "id": "MX-DUR",
                    "value": 8186453
                }, {
                    "id": "MX-GUA",
                    "value": 1211537
                }, {
                    "id": "MX-GRO",
                    "value": 1293953
                }, {
                    "id": "MX-HID",
                    "value": 12419293
                }, {
                    "id": "MX-JAL",
                    "value": 6080485
                }, {
                    "id": "MX-MEX",
                    "value": 2926324
                }, {
                    "id": "MX-MIC",
                    "value": 2688418
                }, {
                    "id": "MX-MOR",
                    "value": 4041769
                }, {
                    "id": "MX-NAY",
                    "value": 4468976
                }, {
                    "id": "MX-NLE",
                    "value": 1274923
                }, {
                    "id": "MX-OAX",
                    "value": 5296486
                }, {
                    "id": "MX-PUE",
                    "value": 6349097
                }, {
                    "id": "MX-QUE",
                    "value": 9938444
                }, {
                    "id": "MX-ROO",
                    "value": 4919479
                }, {
                    "id": "MX-SLP",
                    "value": 2844658
                }, {
                    "id": "US-MO",
                    "value": 5595211
                }, {
                    "id": "MX-SIN",
                    "value": 902195
                }, {
                    "id": "MX-SON",
                    "value": 1711263
                }, {
                    "id": "MX-TAB",
                    "value": 1998257
                }, {
                    "id": "MX-TAM",
                    "value": 1235786
                }, {
                    "id": "MX-TLA",
                    "value": 8414350
                }, {
                    "id": "MX-VER",
                    "value": 1819046
                }, {
                    "id": "MX-YUC",
                    "value": 18976457
                }, {
                    "id": "MX-ZAC",
                    "value": 8049313
                }, {
                    "id": "MX-COL",
                    "value": 642200
                }],





            };


            console.log("dataabarahamdata:" + JSON.stringify(dataProviderd));

            if (idDato == 0) {
                chart.dataProvider = dataProviderd;
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

        var datavarial = "";
        var datavarial1 = "";
        var datavarial2 = "";
        var datavarial3 = "";
        var datavarial4 = "";
        var datavarial5 = "";
        var datavarial6 = "";
        var datavarial7 = "";
        var datavarial8 = "";
        var datavarial9 = "";

        var getdatatime = "";
        var getdatatime1 = "";
        var getdatatime2 = "";
        var getdatatime3 = "";
        var getdatatime4 = "";
        var getdatatime5 = "";
        var getdatatime6 = "";
        var getdatatime7 = "";
        var getdatatime8 = "";
        var getdatatime9 = "";





        function convertToChartDataFormat(newdata, labels) {

            return newdata.Rows.map(
                function(item, index) {


                    // console.log("datositem:" + item.Value + "index:" + index + "/dataTime:" + item.Time+"/label: "+StreamName);
                    //           console.log(item.label);


                    return {
                        Value: parseFloat(item.Value), //valores quelle en js
                        Time: item.Time,
                        StreamName: labels[index].Label,
                        uniqueColor: chartColors[index],
                        commonColor: scope.config.seriesColor,
                        evenOrOddColor: evenOddColors[(index % 2)],
                        IndexID: index

                    }
                }
            );
        }

        //************************************
        // Define the initial chart formatting
        //************************************



        ///////////////////////////////
        function getChartConfig() {




            return {

                "type": "map",
                "theme": "none",
                "colorSteps": 10,

                "titles": [{
                    "text": " fdfsrfgsdf",



                }],




                "dataProvider": {
                    "map": "mexicoLow",
                    "areas": [{
                        "id": "MX-AGU",
                        "value": 4447100
                    }, {
                        "id": "MX-BCN",
                        "value": 626932
                    }, {
                        "id": "MX-BCS",
                        "value": 170000
                    }, {
                        "id": "MX-CAM",
                        "value": 2673400
                    }, {
                        "id": "MX-CHP",
                        "value": 33871648
                    }, {
                        "id": "MX-CHH",
                        "value": 4301261
                    }, {
                        "id": "MX-COA",
                        "value": 3405565
                    }, {
                        "id": "MX-OCL",
                        "value": 783600
                    }, {
                        "id": "MX-DIF",
                        "value": 15982378
                    }, {
                        "id": "MX-DUR",
                        "value": 8186453
                    }, {
                        "id": "MX-GUA",
                        "value": 1211537
                    }, {
                        "id": "MX-GRO",
                        "value": 1293953
                    }, {
                        "id": "MX-HID",
                        "value": 12419293
                    }, {
                        "id": "MX-JAL",
                        "value": 6080485
                    }, {
                        "id": "MX-MEX",
                        "value": 2926324
                    }, {
                        "id": "MX-MIC",
                        "value": 2688418
                    }, {
                        "id": "MX-MOR",
                        "value": 4041769
                    }, {
                        "id": "MX-NAY",
                        "value": 4468976
                    }, {
                        "id": "MX-NLE",
                        "value": 1274923
                    }, {
                        "id": "MX-OAX",
                        "value": 5296486
                    }, {
                        "id": "MX-PUE",
                        "value": 6349097
                    }, {
                        "id": "MX-QUE",
                        "value": 9938444
                    }, {
                        "id": "MX-ROO",
                        "value": 4919479
                    }, {
                        "id": "MX-SLP",
                        "value": 2844658
                    }, {
                        "id": "US-MO",
                        "value": 5595211
                    }, {
                        "id": "MX-SIN",
                        "value": 902195
                    }, {
                        "id": "MX-SON",
                        "value": 1711263
                    }, {
                        "id": "MX-TAB",
                        "value": 1998257
                    }, {
                        "id": "MX-TAM",
                        "value": 1235786
                    }, {
                        "id": "MX-TLA",
                        "value": 8414350
                    }, {
                        "id": "MX-VER",
                        "value": 1819046
                    }, {
                        "id": "MX-YUC",
                        "value": 18976457
                    }, {
                        "id": "MX-ZAC",
                        "value": 8049313
                    }, {
                        "id": "MX-COL",
                        "value": 642200
                    }],
                },

                "areasSettings": {
                    "autoZoom": true,
                    "balloonText": "[[title]]:<strong>[[value]]</strong>"
                },

                "valueLegend": {
                    "right": 10,
                    "minValue": "little",
                    "maxValue": "a lot!"
                },

                "titles": "[[title]]",

                "export": {
                    "enabled": true
                },




            }

        }

        //************************************
        // Function that is called when custom configuration changes are made
        //************************************
        var oldLabelSettings;

        function myCustomConfigurationChangeFunction(data) {
            /*  if (oldLabelSettings != scope.config.includeElementName) {
                  oldLabelSettings == scope.config.includeElementName;
                  labels = getLabels(scope.symbol.DataSources);
              }*/


            // Update the even and odd colors
            //     evenOddColors = [scope.config.evenColor, scope.config.oddColor];

            if (chart) {
                // Apply new settings
                //chart.sortColumns = scope.config.sortItemsByValue;
                /* 
                chart.color = scope.config.textColor;
                chart.backgroundColor = scope.config.backgroundColor;
                chart.plotAreaFillColors = scope.config.plotAreaFillColor;
                chart.rotate = scope.config.useBarsInsteadOfColumns;
                chart.categoryAxis.gridColor = scope.config.gridColor;
                chart.categoryAxis.axisColor = scope.config.axesColor;
                chart.categoryAxis.labelsEnabled = scope.config.showCategoryAxisLabels;
                chart.valueAxes[0].gridColor = scope.config.gridColor;
                chart.valueAxes[0].position = scope.config.axisPosition;
                chart.valueAxes[0].axisColor = scope.config.axesColor;
                chart.graphs[0].columnWidth = scope.config.columnWidth;
                chart.graphs[0].fillAlphas = scope.config.columnOpacity;
                chart.graphs[0].type = scope.config.graphType;
                if (scope.config.showLabels) {
                    chart.graphs[0].labelText = "[[Value]]";
                } else {
                    chart.graphs[0].labelText = null;
                }
                if (scope.config.useUniqueDataItemColors) {
                    chart.graphs[0].fillColorsField = "uniqueColor";
                    chart.graphs[0].lineColorField = "uniqueColor";
                    chart.graphs[0].labelColorField = "uniqueColor";
                } else if (scope.config.alternateEvenAndOddColors) {
                    chart.graphs[0].fillColorsField = "evenOrOddColor";
                    chart.graphs[0].lineColorField = "evenOrOddColor";
                    chart.graphs[0].labelColorField = "evenOrOddColor";
                } else {
                    chart.graphs[0].fillColorsField = "commonColor";
                    chart.graphs[0].lineColorField = "commonColor";
                    chart.graphs[0].labelColorField = "commonColor";
                }
                if (scope.config.useFixedAxisRange) {
                    chart.valueAxes[0].minimum = scope.config.fixedYMin;
                    chart.valueAxes[0].maximum = scope.config.fixedYMax;
                } else {
                    chart.valueAxes[0].minimum = undefined;
                    chart.valueAxes[0].maximum = undefined;
                }

                   */ // Draw the chart again
                //  chart.validateNow();
            }
        }

    }
    CS.symbolCatalog.register(myCustomSymbolDefinition);

})(window.PIVisualization);

///////////////////////////////////////////////// copia