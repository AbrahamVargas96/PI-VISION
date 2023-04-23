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

            console.log("ARRAY DE TITULOS porcentaje" + JSON.stringify(dataProviderd));

            chart.dataProvider = dataprovider;
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

            var pointsParsial ;
            if (caso == 1) {
                // Algoritmo para distincion
            }
            else {
          //   var dato=valorReal.split(',');

            //  if(dato.length==1){var cantidad=dato;}else{var cantidad=dato[0]+dato[1];}
             
              //  var pointsParsial = parseFloat(valorReal.replace(/\,/g, "."));
            //  console.log("abrahamdato:"+valorReal);
          /// pointsParsial = parseFloat(valorReal);

 if(valorReal==NaN || valorReal==null){pointsParsial=0;}else{

pointsParsial = RestructValue(valorReal);
            

 }




            }
          


             

  console.log("abraham dato:"+valorReal+"valor float:::>"+pointsParsial);

            return pointsParsial;
        }

        function getChartConfig() {

            return {
                "type": "pie",
                "theme": "none",

                "titles": createArrayOfChartTitles(),

                "radius": "35%",
                "innerRadius": "50%", // Este cambio se hace para al radio de la dona
                "gradientRatio": [0.4, 0.4, 0 ,0.2, -0.2],
                "colors": [], //Nuevo
                // "colors": [scope.config.selectColorText, scope.config.selectColorText, scope.config.selectColorText], // Se cambia por la matriz que se esta utilizando 
                "balloonText": "<b> [[name]] </b> <br>valor </br> <b>[[value]]</b> <br> <span style='font-size:50'> <br> Tiempo: [[STAMPTIME]] </br> </span>",
                "valueField": "litres",
                "titleField": "country",
                "angle": 25, // Para ver el angulo de la dona
                "depth3D": 0,
                "balloon": {
                    "drop": false, //True maneja el Globo, en False se maneja un cuadrado
                    "adjustBorderColor": false, //Color del contorno de adentro de los ballons
                    // "color": "#FFFFFF",  
                    "color": [], //Se cambia por la matriz que se esta utilizando para los colores
                    "FontSize": 50,
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



        function RestructValue(VALOR){


            ///EJEMPLO DE UNA ARRAY COMO NEWDATA:
            var arrV = new Array();
            // var ResulValor = "";    
            var ResulValor = ""; 
            
            for (var i = 0; i <= 0; i++) {
               var ob = new Object();
               //Sustituir por dataprovider
              
               //ob.Val = "166555";  newdata.Rows[i].Value;
               ob.Val =VALOR;
              
               arrV.push(ob);
            
               var condicion = ob.Val.includes('.');//Debuelve ture o false si encuentra .
            
               if(condicion == true){
                   //CONTADOR DE puntos
                   var TotalPuntos = ob.Val.match(/[.]/g).length;//total puntos
                   console.log("Total de puntos " + TotalPuntos); // Total puntos
                   
                   if (TotalPuntos == 1){
                       //DIVIDR EN ARRAY 12.999,001,66
                       var dividir_valor = ob.Val.split('.', 2);
                       var div1 = dividir_valor[0];//12
                       var div2 = dividir_valor[1];//999,001,66
                   
                       console.log(div1 +" y "+ div2);//12 y 999,001,66
                   
                       var buscar_div1 = div1.includes(',');//true o false
                       var buscar_div2 = div2.includes(',');//true o false incluir .
                       
                       console.log(buscar_div2);
                   
                       if(buscar_div2 == true){//PARA valores 999,001,66
                           //PRIMER ARRAY div2
                           //si el arreglo tiene comas esta mal, y cambiar el ultimo por .
                           var indiceValue = div2.lastIndexOf(",");//7
                           var arrayValue = div2.split("");//arreglo para que pueda leer splice
                           var replaceValue =  arrayValue.splice(indiceValue, 1, '.');//replazar el indice por el .
                           
                           console.log("ARREGLO " + arrayValue);
                           console.log("Indice a cambiar " + replaceValue);
                           
                           var cadena = arrayValue.toString();
                           var Valuestring = cadena.replace(/[,]/g,'');
                           
                           console.log("Valor despues del .: " + div2);
                           console.log("Valor corregido parte decima:  " + Valuestring);
                       
                           //SEGUNDO ARRAY div1
                           var replaceValor = div1.replace(/[,]/g,'');
                           var ValorGuardar = replaceValor + Valuestring;//12999001.66
                           
            
                           var vl = ValorGuardar.split('.', 2);
                           var d1 = vl[0];//12999001
                           var d2 = vl[1];//66
            
                           var TotalIn =  d2.length;
                           console.log("Valor correcto: " + TotalIn);
                           if(TotalIn <= 2){
                               ResulValor=ValorGuardar;
                           }else{
                               var re = ValorGuardar.replace('.','');
                               ResulValor=re;
                           }
                           /*else if (TotalIn == 3 ){
                               var vr = ValorGuardar.replace('.','');
                               ResulValor=vr;
                           }else if (TotalIn >= 4 ){
                               ResulValor=ValorGuardar;
                           }*/
                       
                           console.log("Valor correcto: " + ValorGuardar);
                   
                       }else if(buscar_div2 == false){
                           //166.55
                           var replaceV = div1.replace(/[,]/g,'');
                           var ValorUnir = replaceV + "." + div2;
            
                           var vl = ValorUnir.split('.', 2);
                           var d1 = vl[0];//12999001
                           var d2 = vl[1];//66
            
                           var TotalIn =  d2.length;
                           console.log("Valor correcto: " + TotalIn);
                           if(TotalIn <= 2){
                               ResulValor=ValorUnir;
                           }else{
                               var re = ValorUnir.replace('.','');
                               ResulValor=re;
                           }
                           /*else if (TotalIn == 3 ){
                               var vr = ValorUnir.replace('.','');
                               ResulValor=vr;
                           }else if (TotalIn >= 4 ){
                               ResulValor=ValorUnir;
                           }*/
                           console.log("Valor correcto: " + ValorUnir);
                       }
               
                   }else if (TotalPuntos >= 2){
                       //PARA LOS QUE TIENEN MUCHOS puntos 10.000.10 AUN FALTA
                       var Tp = ob.Val.replace(/[,|.]/g,'-');
            
                       var TpA = Tp.split("");//Array
                       var TpI = TpA.lastIndexOf("-");//indice manda un Numero
                       var TpR =  TpA.splice(TpI, 1, '.');//replazar el indice por el .
                       
                       var TpC = TpA.toString();
                       var TpS = TpC.replace(/[,|-]/g,'');//Valuestring
            
                           var vl = TpS.split('.', 2);
                           var d1 = vl[0];//12999001
                           var d2 = vl[1];//66
            
                           var TotalIn =  d2.length;
                           console.log("Valor correcto: " + TotalIn);
                           if(TotalIn <= 2){
                               ResulValor=TpS;
                           }else{
                               var re = TpS.replace('.','');
                               ResulValor=re;
                           }
                           /*else if (TotalIn == 3 ){
                               var vr = ValorUnir.replace('.','');
                               ResulValor=vr;
                           }else if (TotalIn >= 4 ){
                               ResulValor=ValorUnir;
                           }*/
            
                       console.log("ARREGLO " + TpA);
                       console.log("String " + TpC);
                       console.log("Indice a cambiar " + ResulValor);
            
                       
                   }
               }else if (condicion == false){
                   //si no tiene . o ,
                   var comaTue = ob.Val.includes(',');
                   console.log("Total de comas " + comaTue); // Total comas
                   if(comaTue == true){
                       //SOLO COMAS 34,677,889,99
                       //DIVIDR EN ARRAY 34,677,889,99
            
                       var CA = ob.Val.split("");//Array
                       var CI = CA.lastIndexOf(",");//indice manda un Numero
                       var CR =  CA.splice(CI, 1, '.');//replazar el indice por el .
                       var CC = CA.toString();
                       var CS = CC.replace(/[,]/g,'');//Valuestring
            
                           var vl = CS.split('.', 2);
                           var d1 = vl[0];//12999001
                           var d2 = vl[1];//66
            
                           var TotalIn =  d2.length;
                           console.log("Valor correcto: " + TotalIn);
                           if(TotalIn <= 2){
                               ResulValor=CS;
                           }else{
                               var re = CS.replace('.','');
                               ResulValor=re;
                           }
                           /*else if (TotalIn == 3 ){
                               var vr = CS.replace('.','');
                               ResulValor=vr;
                           }else if (TotalIn >= 4 ){
                               ResulValor=CS;
                           }*/
            
            
                       console.log("ARREGLO " + CA);
                       console.log("Indice a cambiar " + ResulValor);
                   }else if(comaTue == false){
                       ///NUMERO ENTERO SIN COMA
                       var res = ob.Val;
                       ResulValor=res;
            
                       console.log("Valor modificado: " + ResulValor);
                   }
                   
            
               }
               
               
            }
            console.log("Valor variable:) " + ResulValor);
            
              
            ///
                  
            
            
            
            return ResulValor;
            
            }
            
            








        //////////////////////////////////////

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

            
                // Apply new settings

                chart.titles[0].text = scope.config.TitleText;
                chart.titles[0].size = scope.config.FontSize;

                // Update the title
                if (scope.config.showTitle==true) {
                    chart.titles[0].text = scope.config.TitleText;
                } else {
                    chart.titles[0].text = "";
                }

              
                    chart.color = scope.config.textColor;
             

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
            var colores=new Array();
                //Esto es lo nuevo que estamos agregando para los nuevos colores
              /*  chart.colors [0] = scope.config.selectColor;
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
                chart.colors [17] = scope.config.selectColor17;*/

                colores [0] = scope.config.selectColor;
                colores [1] = scope.config.selectColor1;
                colores [2] = scope.config.selectColor2;
                colores [3] = scope.config.selectColor3;
                colores [4] = scope.config.selectColor4;
                colores [5] = scope.config.selectColor5;
                colores [6] = scope.config.selectColor6;
                colores [7] = scope.config.selectColor7;
                colores [8] = scope.config.selectColor8;
                colores [9] = scope.config.selectColor9;
                colores [10] = scope.config.selectColor10;
                colores [11] = scope.config.selectColor11;
                colores [12] = scope.config.selectColor12;
                colores [13] = scope.config.selectColor13;
                colores [14] = scope.config.selectColor14;
                colores [15] = scope.config.selectColor15;
                colores [16] = scope.config.selectColor16;
                colores [17] = scope.config.selectColor17;
                chart.colors=colores;



                console.log("Muestra de chart colors: " + chart.colors[0]);
                chart.validateNow();
                console.log("Configuration update porcentajes");
            
        }
    }
    CS.symbolCatalog.register(myCustomSymbolDefinition);

})(window.PIVisualization);