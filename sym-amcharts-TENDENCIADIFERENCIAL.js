
(function (CS) {
	//'use strict';
	// Specify the symbol definition	
	var myCustomSymbolDefinition = {
		// Specify the unique name for this symbol; this instructs PI Vision to also
		// look for HTML template and config template files called sym-<typeName>-template.html and sym-<typeName>-config.html
		typeName: 'amcharts-TENDENCIADIFERENCIAL',
		// Specify the user-friendly name of the symbol that will appear in PI Vision
		displayName: 'amCharts TENDENCIADIFERENCIAL',
		// Specify the number of data sources for this symbol; just a single data source or multiple
		datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
		// Specify the location of an image file to use as the icon for this symbol
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/TENDENCIA.png',
		visObjectType: symbolVis,
		// Specify default configuration for this symbol
		getDefaultConfig: function () {
			return {
				//DataShape: 'Trend',
				DataShape: 'TimeSeries',
				DataQueryMode: CS.Extensibility.Enums.DataQueryMode.ModeEvents,
				// Specify the default height and width of this symbol
				Height: 300,
				Width: 600,
				// Specify the value of custom configuration options
				minimumYValue: 0,
				maximumYValue: 100,
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
				TitleText:"Title Text",				
				showTitle: true,
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
		// Specify the name of the function that will be called to initialize the symbol
		//init: myCustomSymbolInitFunction
	};

	//************************************
	// Function called to initialize the symbol
	//************************************
	//function myCustomSymbolInitFunction(scope, elem) {
	function symbolVis() { }
	CS.deriveVisualizationFromBase(symbolVis);
	symbolVis.prototype.init = function (scope, elem) {
		// Specify which function to call when a data update or configuration change occurs 
		this.onDataUpdate = myCustomDataUpdateFunction;
		this.onConfigChange = myCustomConfigurationChangeFunction;
		var labels = getLabels(scope.symbol.DataSources);
		console.log("datasouce"+JSON.stringify(labels));

		var pluginArrayArg = new Array();


		/*for(var o=0;o<=labels.length-1;o++){

		var tag=labels[o].Label.split('?');
		pluginArrayArg.push(tag[0]);

	                  }*/


		//var sele=document.getElementById('select');

		/*if(sele.length>=1){

				

				
			for(var borra=0;borra<=sele.length;borra++){


				sele.remove(borra);


			}

			var x = document.getElementById("select");
			//var option = document.createElement("option");
			for(var agrega=0;agrega<=pluginArrayArg.length-1;agrega++){
				
				var option = document.createElement("option");
				
				option.value = agrega+1;
				//console.log(option.value);
				option.text = pluginArrayArg[agrega];
				console.log(option.text);
				x.add(option);
				


			}




	  }else{ }*/
		//console.log("datasouce"+pluginArrayArg[0]);

		// Locate the html div that will contain the symbol, using its id, which is "container" by default
		//var symbolContainerDiv = elem.find('#container')[0];
		// Use random functions to generate a new unique id for this symbol, to make it unique among all other custom symbols
		//	var newUniqueIDString = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
		// Write that new unique ID back to overwrite the old id
		// symbolContainerDiv.id = newUniqueIDString;
		// Create a variable to hold the custom visualization object

////////////////////////////datos del select


//var seleccion=document.getElementById('select').value;
//console.log("seleccion ::"+seleccion);
////////////////////////7datos del select termina
		var customVisualizationObject = false;
		// Create a variable to hold the combined data array
		var dataArray = [];
		// Create vars to hold the min and max y-axis values
		var autoScaleMinimumValue, autoScaleMaximumValue;
		// Create a var to hold the data item paths
		var dataItemPaths = ["Data Item Paths"];
		var chart = initChart();


		console.log("scop"+scope.config.TitleText);
		//************************************
		// When a data update occurs...
		//************************************	
		/////////////////////////////////////////////////////////////////

		function getLabels(datasources) {

			

			
			return datasources.map(function (item) {
				var isAttribute = /af:/.test(item);
				var label = isAttribute ? item.match(/\w*\|.*$/)[0] : item.match(/\w+$/)[0];
				if (!scope.config.includeElementName && (label.indexOf("|") !== -1)) {
					label = label.split("|")[label.split("?").length - 1];
				}


				return {
					Label: label
				};
			});
		

		}


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



		////////////////////////////////////////////////////////////////////////////////
		function myCustomDataUpdateFunction(data) {
			// console.log("scop::<:"+scope.config.TitleText);
			// console.log("datos genericos::"+JSON.stringify(data));
			//var seleccion=document.getElementById('select').value;
         //  console.log("select1::"+document.getElementById('select1').value)
          //  var sele=document.getElementById('select1');
		
     
			var positionselect=1;/////fungiracomo selector visual unitario multidata
/*



			var x = document.getElementById("select1");
			var option = document.createElement("option");
			option.value = "hand";
			console.log(option.value);
			option.text = "Hand";
			x.add(option);

             x.remove(i) remueve



*/

		/*	var someData = [
				{ Text: "one", Value: "1" },
				{ Text: "two", Value: "2" },
				{ Text: "three", Value: "3"}];
			
			$("#templateOptionItem").render(someData).appendTo("#mySelect");*/


			//this.scope.trendModel.update(newVal);
			if (!data || !chart) return;
			// Get the data item labels
			if (!labels) {
				labels = getLabels(scope.symbol.DataSources);
			}
			// If Rows have Label => either configuration is updated 
			if (data.Data[0].Label) {
				labels = data.Data.map(
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
		//	console.log("seleccion base ::"+seleccion+"hh"+labels.length+"indexselec:"+sele.length);
			//removeOptions( document.getElementById('select1'));
			
           /*   if(sele.length>=1){

				

				
                    for(var borra=0;borra<=sele.length;borra++){


						sele.remove(borra);


					}

					var x = document.getElementById("select1");
					//var option = document.createElement("option");
					for(var agrega=0;agrega<=labels.length-1;agrega++){
						
						var option = document.createElement("option");
						
						option.value = agrega+1;
						//console.log(option.value);
						option.text = labels[agrega].Label;
						console.log(option.text);
						x.add(option);
						


					}




			  }else{ }*/






			var dataProvider = convertToChartDataFormat(data, labels);
			//var TimeSpan = TimeSpancapacity(data);

			// if(dataProvider.length==2){

			// 	var datas=dataproviderformater(dataProvider);
			// }
			
			//console.log("datos brutos:"+JSON.stringify(dataProvider));   

			/*
			// If there is indeed new data in the update
		// console.log("New data received abraham: ", data.SymbolName);
	console.log("datos brutos"+JSON.stringify(dataProvider));
		console.log(dataProvider);*/
			// console.log("data que necesita abraham etiqueta tag: ", JSON.stringify(dataProvider[0].Values.Label));
			//	console.log("data que necesita abraham etiqueta tiempo inical: ", JSON.stringify(dataProvider[0].Values.StartTime));
			//	console.log("data que necesita abraham etiqueta tiempo final: ", JSON.stringify(dataProvider[0].Values.EndTime));
			//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
			//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
			// 	console.log("data que necesita abraham tiempo: ", JSON.stringify(dataProvider[0].Values.Values[0].Time));
			//	console.log("data que necesita abraham tamaño de la data: ", dataProvider.length);
			//		console.log("data que necesita abraham TimeSpan: "+ TimeSpan);


			////////////empieza el formato de fecha continuo
			var D = "";
			var M = "";
			var A = ""; 
			var mesIgregoriano = "";
			var fechaparset = "";

			var feFcha = dataProvider[0].Values.EndTime;
			var feFechaFormater = feFcha.split(',');
			var fechaparseada = feFechaFormater[0].split(' ');
			var fechapurificada = fechaparseada[0].split('/');

			D = fechapurificada[0];
			M = fechapurificada[1];
			A = fechapurificada[2];

                      //  console.log("fecha asignacion sive"+fechapurificada[0]+fechapurificada[1]+fechapurificada[2]);

			/////empieza a fecha gregoriano


			if (M == "01"||M == "1") { mesIgregoriano = "jan"; }
			if (M == "02"||M == "2") { mesIgregoriano = "feb"; }
			if (M == "03"||M == "3") { mesIgregoriano = "mar"; }
			if (M == "04"||M == "4") { mesIgregoriano = "apr"; }
			if (M == "05"||M == "5") { mesIgregoriano = "may"; }
			if (M == "06"||M == "6") { mesIgregoriano = "jun"; }
			if (M == "07"||M == "7") { mesIgregoriano = "jul"; }
			if (M == "08"||M == "8") { mesIgregoriano = "aug"; }
			if (M == "09"||M == "9") { mesIgregoriano = "sep"; }
			if (M == "10") { mesIgregoriano = "oct"; }
			if (M == "11") { mesIgregoriano = "nov"; }
			if (M == "12") { mesIgregoriano = "dec"; }

			fechaparset = mesIgregoriano + " " + D + " " + A;
	//console.log("fecha asignacion sive"+fechaparset);



        

			//////////////////////////formato de fecha continuo

			if (JSON.stringify(dataProvider[0].Values.Values.length) == 0) {
				/// contemplacion de errores////////////ejemplo categoria:"jun 26 2022 01:00:00"

				

				var dataprovider = [{
				    "date": "jun 17 2022 00:00:00",
					"value": 0,//valor de referencia de compra
					"valueline":0,//valor de referencia precio tag
					"fromValue2":0,///reference a valueline
					"toValue2":0,//reference a value
					"fromValue":0,//reference a value
					"toValue":0,
					"titulo":""	
					}];




			


			} else {

				///////////////////////////ya empieza el codigo real
				

					if(dataProvider.length==2){

						var dataprovider=dataproviderformater(dataProvider);
						console.log("valores:"+JSON.stringify(dataprovider));

					}else{

                        
						var dataprovider = [{
							"date": "jun 17 2022 00:00:00",
							"value": 0,//valor de referencia de compra
							"valueline":0,//valor de referencia precio tag
							"fromValue2":0,///reference a valueline
							"toValue2":0,//reference a value
							"fromValue":0,//reference a value
							"toValue":0,
							"titulo":""	
							}];



					}
			







			}




         
			 


		
		
		///////////////////////////////Nuevos datos de prueba

		


			chart.dataProvider =dataprovider;
			chart.validateData();

		}

		//*************************MODELADO DE DATA
		function convertToChartDataFormat(data, labels) {



			return data.Data.map(
				function (item, index) {


					// console.log("datositem:" + item.Value + "index:" + index + "/dataTime:" + item.Time+"/label: "+StreamName);
					//           console.log(item.label);

                    //console.log("Item valor::"+JSON.stringify(item));
					return {

                           
                 

						Values: item, //valores quelle en js
						//Time: item.Values.Time,
						TituloTag: labels[index].Label,
						//uniqueColor: chartColors[index],
						//	commonColor: scope.config.seriesColor,
						//	evenOrOddColor: evenOddColors[(index % 2)],
						//IndexID: index

					}
				}
			);
		}
		//************************* */FIN de Filtro de data
		function getChartConfig() {

	//var visualizacion 
			return {

				"type": "serial",
				"theme": "none",
				"autoMarginOffset":20,
				"marginRight":80,
			
				"plotAreaFillColors": scope.config.plotAreaFillColor,
				"backgroundColor": scope.config.backgroundColor,
				"color": scope.config.textColor,
				"titles": createArrayOfChartTitles(),
			
				"graphs": [

					{
						"valueField": "value",
						"balloonText": "<span style='font-size:13px;'><b>[[titulocom]]</b><br>Tiempo: [[category]]</br>Valor:<b>[[value]]</b></span>",
						"fillAlphas": 0,
						"lineColor": "#33FF33",
						"type": "smoothedLine",
					},
					{
						"balloonText": "<span style='font-size:13px;'><b>[[tituloref]]</b><br>Tiempo: [[category]]</br>Valor:<b>[[value]]</b></span>",
						"bullet": "round",
						"bulletBorderAlpha": 1,
						"bulletColor": "#FFFFFF",
						"lineColor":"FFFFFF",
						"useLineColorForBulletBorder": true,
						"fillAlphas": 0,
						"lineThickness": 2,
						"lineAlpha": 1,
						"bulletSize": 7,
						"type": "smoothedLine",		
						"valueField": "valueline"
					},
					///primer fill
					{

					"id": "fromGraph",
					"lineAlpha": 0,
					"showBalloon": false,			
					"valueField": "fromValue",
					"type": "smoothedLine",
					"fillAlphas": 0

				},
							
				{
					"fillAlphas": 0.5,////////del sombreado
					"fillToGraph": "fromGraph",
					"lineAlpha": 0,
					"showBalloon": false,
					"lineColor": "#a9cce3",
					"type": "smoothedLine",
					"valueField": "toValue"
				},	
				//////segundo fill
				{
					"id": "fromGraph",
					"lineAlpha": 0,
					"showBalloon": false,
					"type": "smoothedLine",
					"valueField": "fromValue2",
					"type": "smoothedLine",
					"fillAlphas": 0

				}, 
				{
					"fillAlphas": 0.5,////////del sombreado
					"fillToGraph": "fromGraph",
					"lineAlpha": 0,
					"showBalloon": false,
					"lineColor": "#d35400",
					"type": "smoothedLine",
					"valueField": "toValue2"
				},	
				
				],



				//////
				pathToImages: "http://cdn.amcharts.com/lib/3/images/",
				"chartCursor": {
					"categoryBalloonDateFormat": "JJ:NN, DD MMMM",
					"cursorAlpha": 0,
					"valueLineEnabled": true,
					"valueLineBalloonEnabled": true,
					"valueLineAlpha": 0.5,
					"fullWidth": true
				},
				//"dataDateFormat": "YYYY-MM-DD",
			
				"categoryField": "date",
				"categoryAxis": {
				 "position":"top",
				 "minPeriod": "mm",
				 "parseDates": true,
				
					"axisAlpha": 0,
					"minHorizontalGap": 25,
					"gridAlpha": 0,
					"tickLength": 0,
				
				},

			
				"chartScrollbar": {
					"graph": "g1",
					"gridAlpha": 0,
					"color": "#888888",
					"scrollbarHeight": 35,
					"backgroundAlpha": 0,
					"selectedBackgroundAlpha": 0.1,
					"selectedBackgroundColor": "#888888",
					"graphFillAlpha": 0,
					"autoGridCount": true,
					"selectedGraphFillAlpha": 0,
					"graphLineAlpha": 0.2,
					"graphLineColor": "#c2c2c2",
					"selectedGraphLineColor": "#888888",
					"selectedGraphLineAlpha": 1,
					//  "dragIcon":"C:\\Program Files\\PIPC\\PIVision\\Scripts\\app\\editor\\symbols\\ext\\Icons\\amcharts-trend.png",

					autoGridCount: true,
					graph: "AmGraph-1",
					scrollbarHeight: 65,
					dragIcon: "dragIconRoundSmall",
					dragIconHeight: 45,
					dragIconWidth: 45,
					backgroundAlpha: .5,

					svgIcons: true

				},
			
				"export": {
					"enabled": true,
					"dateFormat": "YYYY-MM-DD HH:NN:SS"
				}
				////////////////FIN CODE ALTERNO

			}






		}/////////chart


		///////////////////funciones externas programacion propia


		function TimeSpancapacity(data) {
			var Extract = data.Data.map(



				function (item) {

					return {
						Values: item,

					}

				}


			);

			var timeinitial = Extract[0].Values.StartTime;
			var timefinaly = Extract[0].Values.EndTime;





			/////definicion de tiempo y fecha 
			var TimeSpan;





			var horaI;
			var fecI;
			var horaF;
			var fecF;

			var hfI = timeinitial.split(' ');






			var hfF = timefinaly.split(' ');
			//console.log("Extrraccion primaria :"+timeinitial);

			fecI = hfI[0];
			horaI = hfI[1].split(',');
			//console.log("Extrraccion :"+fecI+" : "+horaI[0]);

			fecF = hfF[0];
			horaF = hfF[1].split(',');
			var fett = fecI + " " + horaI[0];
			var fett2 = fecF + " " + horaF[0];
			///////
			//console.log(fett+"hora dos final"+fett2);
			//var date1 = new Date(fett.toString());
			//var date2 = new Date(fett2.toString());

			/*formatos validos
			1.-enero=jan
			2.-febrero=feb
			3.-marzo=mar
			4.-abril=apr
			5.-mayo=may
			6.-junio=jun
			7.-julio=jul
			8-agosto=ago
			9-septiembre=sep
			10-octubre=oct
			11-noviembre=nov
			12diciembre=dic
			*/

			var mesI = ""; var diaI = ""; var aniosI = ""; var mesIgregoriano = "";
			var mesF = ""; var diaF = ""; var aniosF = ""; var mesIgregorianoF = "";
			//////INICIAL STAR INIT
			var fracfechaI = fett.split(' ');
			var fechapura = fracfechaI[0].split('/');
			diaI = fechapura[0];
			mesI = fechapura[1];
			aniosI = fechapura[2];
			//////////FINAL STAR END
			var fracfechaF = fett2.split(' ');
			var fechapuraF = fracfechaF[0].split('/');
			diaF = fechapuraF[0];
			mesF = fechapuraF[1];
			aniosF = fechapuraF[2];



			if (mesI == "01") { mesIgregoriano = "jan" }
			if (mesI == "02") { mesIgregoriano = "feb" }
			if (mesI == "03") { mesIgregoriano = "mar" }
			if (mesI == "04") { mesIgregoriano = "apr" }
			if (mesI == "05") { mesIgregoriano = "may" }
			if (mesI == "06") { mesIgregoriano = "jun" }
			if (mesI == "07") { mesIgregoriano = "jul" }
			if (mesI == "08") { mesIgregoriano = "aug" }
			if (mesI == "09") { mesIgregoriano = "sep" }
			if (mesI == "10") { mesIgregoriano = "oct" }
			if (mesI == "11") { mesIgregoriano = "nov" }
			if (mesI == "12") { mesIgregoriano = "dec" }

			if (mesF == "01") { mesIgregorianoF = "jan" }
			if (mesF == "02") { mesIgregorianoF = "feb" }
			if (mesF == "03") { mesIgregorianoF = "mar" }
			if (mesF == "04") { mesIgregorianoF = "apr" }
			if (mesF == "05") { mesIgregorianoF = "may" }
			if (mesF == "06") { mesIgregorianoF = "jun" }
			if (mesF == "07") { mesIgregorianoF = "jul" }
			if (mesF == "08") { mesIgregorianoF = "aug" }
			if (mesF == "09") { mesIgregorianoF = "sep" }
			if (mesF == "10") { mesIgregorianoF = "oct" }
			if (mesF == "11") { mesIgregorianoF = "nov" }
			if (mesF == "12") { mesIgregorianoF = "dec" }



			/*var date1 = new Date("06/jul/2012 20:30:00");
			var date1 = new Date(diaI + "/" + mesIgregoriano + "/" + aniosI + " " + fracfechaI[1]);
			var date2 = new Date("07/jul/2022 20:30:00");
			var date2 = new Date(diaF + "/" + mesIgregorianoF + "/" + aniosF + " " + fracfechaF[1]);*/


	var tiempoparseado1=fracfechaI[1].split(':');
			var seg1=tiempoparseado1[2];
			console.log("date1::"+diaI + "/" + mesIgregoriano + "/" + aniosI + " " + tiempoparseado1[0]+":"+ tiempoparseado1[1]+":"+Math.trunc(seg1));
             // var tiempoparseado=fracfechaI[1].parse(':');

			 var tiempoparseado2=fracfechaF[1].split(':');
			 var seg2=tiempoparseado2[2];
			 console.log("date2::"+diaF + "/" + mesIgregorianoF + "/" + aniosF + " " + tiempoparseado2[0]+":"+ tiempoparseado2[1]+":"+Math.trunc(seg2));
			var date1 = new Date(diaI + "/" + mesIgregoriano + "/" + aniosI + " " + tiempoparseado1[0]+":"+ tiempoparseado1[1]+":"+Math.trunc(seg1));
			//var date2 = new Date("07/jul/2022 20:30:00");
		
			var date2 = new Date(diaF + "/" + mesIgregorianoF + "/" + aniosF + " " + tiempoparseado2[0]+":"+ tiempoparseado2[1]+":"+Math.trunc(seg2));


                        console.log("fecha inicial: "+date1);
                         console.log("fecha final: "+date2);




			var diff = date2.getTime() - date1.getTime();

			var days = Math.floor(diff / (1000 * 60 * 60 * 24));
			diff -= days * (1000 * 60 * 60 * 24);

			var hours = Math.floor(diff / (1000 * 60 * 60));
			diff -= hours * (1000 * 60 * 60);

			var mins = Math.floor(diff / (1000 * 60));
			diff -= mins * (1000 * 60);

			var seconds = Math.floor(diff / (1000));
			diff -= seconds * (1000);

			console.log(days + " days, " + hours + " hours, " + mins + " minutes, " + seconds + " seconds");


			/*if (days != 0) {
				TimeSpan = days + "d";
			} else if (hours != 0) {
				TimeSpan = hours + "h";
			}
			else {
				TimeSpan = "0h"
			}
			//if(hours!=0){TimeSpan=hours+"h";}else{TimeSpan="0h"}*/

	 if(days>hours && (days==1 || days==7 || (days>=28 && days<=31))){TimeSpan = days + "d";}else if(hours==1 || hours==8 || hours ==20){

				if(hours==20){

					hours=8;
				  }

				TimeSpan = hours + "h";

			 }else {
			
				TimeSpan = "0h";
				
			}



                         console.log(TimeSpan);

			return TimeSpan;









		}


		/////////////////formatiar la datta comienza el codigo

/////////formateando 31 dias
function dataproviderformater31dias(dataprovider,positionselect) {
	/////coleccion de una hora unicamente
	///REALIZAR UN LISTA DE COLECCION DE numero de elementos
	var ElementInterval;
	const intervalo = 31;
var ajustedata;
	var amplitudIntervalo;
	var  valorunit="";var tiempounit="";
	var totalpositionformater = new Array();
	var totalposition = new Array();
   
	for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
		var coleccionposition = new Object();				
			///////////calcular los intervalos de timestamp-value
		amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);

			/////////////////valores que eligiria del intervalo::posisiones


			coleccionposition.p1 = 0;
			coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
			coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
			coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
			coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
			coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
			coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);
			coleccionposition.p8 = ((coleccionposition.p7) + amplitudIntervalo);
			coleccionposition.p9 = ((coleccionposition.p8) + amplitudIntervalo);
			coleccionposition.p10 = ((coleccionposition.p9) + amplitudIntervalo);
			coleccionposition.p11 = ((coleccionposition.p10) + amplitudIntervalo);		
			coleccionposition.p12 = ((coleccionposition.p11 + amplitudIntervalo));
			coleccionposition.p13 = ((coleccionposition.p12) + amplitudIntervalo);
			coleccionposition.p14 = ((coleccionposition.p13) + amplitudIntervalo);
			coleccionposition.p15 = ((coleccionposition.p14) + amplitudIntervalo);
			coleccionposition.p16 = ((coleccionposition.p15) + amplitudIntervalo);
			coleccionposition.p17 = ((coleccionposition.p16) + amplitudIntervalo);
			coleccionposition.p18 = ((coleccionposition.p17) + amplitudIntervalo);
			coleccionposition.p19 = ((coleccionposition.p18) + amplitudIntervalo);
			coleccionposition.p20 = ((coleccionposition.p19) + amplitudIntervalo);
			coleccionposition.p21 = ((coleccionposition.p20) + amplitudIntervalo);
			coleccionposition.p22 = ((coleccionposition.p21) + amplitudIntervalo);
			coleccionposition.p23 = ((coleccionposition.p22) + amplitudIntervalo);
			coleccionposition.p24 = ((coleccionposition.p23) + amplitudIntervalo);
			coleccionposition.p25 = ((coleccionposition.p24) + amplitudIntervalo);
			coleccionposition.p26 = ((coleccionposition.p25) + amplitudIntervalo);
			coleccionposition.p27 = ((coleccionposition.p26) + amplitudIntervalo);
			coleccionposition.p28 = ((coleccionposition.p27) + amplitudIntervalo);
			coleccionposition.p29 = ((coleccionposition.p28) + amplitudIntervalo);
			coleccionposition.p30 = ((coleccionposition.p29) + amplitudIntervalo);
			coleccionposition.p31 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
			totalposition.push(coleccionposition);////colecciones de posisionesNn-1
		
	}


console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
	//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
	//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
var coleccionpositionformater = new Object();	

valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Time;
coleccionpositionformater.p9= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Time;
coleccionpositionformater.p10= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Time;
coleccionpositionformater.p11= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Time;
coleccionpositionformater.p12= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Time;
coleccionpositionformater.p13= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Time;
coleccionpositionformater.p14= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Time;
coleccionpositionformater.p15= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Time;
coleccionpositionformater.p16= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Time;
coleccionpositionformater.p17= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Time;
coleccionpositionformater.p18= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Time;
coleccionpositionformater.p19= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Time;
coleccionpositionformater.p20= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Time;
coleccionpositionformater.p21= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Time;
coleccionpositionformater.p22= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Time;
coleccionpositionformater.p23= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Time;
coleccionpositionformater.p24= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Time;
coleccionpositionformater.p25= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Time;
coleccionpositionformater.p26= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Time;
coleccionpositionformater.p27= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Time;
coleccionpositionformater.p28= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p29].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p29].Time;
coleccionpositionformater.p29= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p30].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p30].Time;
coleccionpositionformater.p30= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p31].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p31].Time;
coleccionpositionformater.p31= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
totalpositionformater.push(coleccionpositionformater);


}
/////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));




var jsonArg1 = new Object();
jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
var jsonArg2 = new Object();
jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
var jsonArg3 = new Object();
jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
var jsonArg4 = new Object();
jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
var jsonArg5 = new Object();
jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
var jsonArg6 = new Object();
jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
var jsonArg7 = new Object();
jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
var jsonArg8 = new Object();
jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
var jsonArg9 = new Object();
jsonArg9.year = totalpositionformater[positionselect-1].p9[0];
jsonArg9.value = totalpositionformater[positionselect-1].p9[1];
var jsonArg10 = new Object();
jsonArg10.year = totalpositionformater[positionselect-1].p10[0];
jsonArg10.value = totalpositionformater[positionselect-1].p10[1];
var jsonArg11 = new Object();
jsonArg11.year = totalpositionformater[positionselect-1].p11[0];
jsonArg11.value = totalpositionformater[positionselect-1].p11[1];
var jsonArg12 = new Object();
jsonArg12.year = totalpositionformater[positionselect-1].p12[0];
jsonArg12.value = totalpositionformater[positionselect-1].p12[1];
var jsonArg13 = new Object();
jsonArg13.year = totalpositionformater[positionselect-1].p13[0];
jsonArg13.value = totalpositionformater[positionselect-1].p13[1];
var jsonArg14 = new Object();
jsonArg14.year = totalpositionformater[positionselect-1].p14[0];
jsonArg14.value = totalpositionformater[positionselect-1].p14[1];
var jsonArg15 = new Object();
jsonArg15.year = totalpositionformater[positionselect-1].p15[0];
jsonArg15.value = totalpositionformater[positionselect-1].p15[1];
var jsonArg16 = new Object();
jsonArg16.year = totalpositionformater[positionselect-1].p16[0];
jsonArg16.value = totalpositionformater[positionselect-1].p16[1];
var jsonArg17 = new Object();
jsonArg17.year = totalpositionformater[positionselect-1].p17[0];
jsonArg17.value = totalpositionformater[positionselect-1].p17[1];
var jsonArg18 = new Object();
jsonArg18.year = totalpositionformater[positionselect-1].p18[0];
jsonArg18.value = totalpositionformater[positionselect-1].p18[1];
var jsonArg19 = new Object();
jsonArg19.year = totalpositionformater[positionselect-1].p19[0];
jsonArg19.value = totalpositionformater[positionselect-1].p19[1];
var jsonArg20 = new Object();
jsonArg20.year = totalpositionformater[positionselect-1].p20[0];
jsonArg20.value = totalpositionformater[positionselect-1].p20[1];
var jsonArg21 = new Object();
jsonArg21.year = totalpositionformater[positionselect-1].p21[0];
jsonArg21.value = totalpositionformater[positionselect-1].p21[1];
var jsonArg22 = new Object();
jsonArg22.year = totalpositionformater[positionselect-1].p22[0];
jsonArg22.value = totalpositionformater[positionselect-1].p22[1];
var jsonArg23 = new Object();
jsonArg23.year = totalpositionformater[positionselect-1].p23[0];
jsonArg23.value = totalpositionformater[positionselect-1].p23[1];
var jsonArg24 = new Object();
jsonArg24.year = totalpositionformater[positionselect-1].p24[0];
jsonArg24.value = totalpositionformater[positionselect-1].p24[1];
var jsonArg25 = new Object();
jsonArg25.year = totalpositionformater[positionselect-1].p25[0];
jsonArg25.value = totalpositionformater[positionselect-1].p25[1];
var jsonArg26 = new Object();
jsonArg26.year = totalpositionformater[positionselect-1].p26[0];
jsonArg26.value = totalpositionformater[positionselect-1].p26[1];
var jsonArg27 = new Object();
jsonArg27.year = totalpositionformater[positionselect-1].p27[0];
jsonArg27.value = totalpositionformater[positionselect-1].p27[1];
var jsonArg28 = new Object();
jsonArg28.year = totalpositionformater[positionselect-1].p28[0];
jsonArg28.value = totalpositionformater[positionselect-1].p28[1];
var jsonArg29 = new Object();
jsonArg29.year = totalpositionformater[positionselect-1].p29[0];
jsonArg29.value = totalpositionformater[positionselect-1].p29[1];
var jsonArg30 = new Object();
jsonArg30.year = totalpositionformater[positionselect-1].p30[0];
jsonArg30.value = totalpositionformater[positionselect-1].p30[1];
var jsonArg31 = new Object();
jsonArg31.year = totalpositionformater[positionselect-1].p31[0];
jsonArg31.value = totalpositionformater[positionselect-1].p31[1];
var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);
pluginArrayArg.push(jsonArg9);
pluginArrayArg.push(jsonArg10);
pluginArrayArg.push(jsonArg11);
pluginArrayArg.push(jsonArg12);
pluginArrayArg.push(jsonArg13);
pluginArrayArg.push(jsonArg14);
pluginArrayArg.push(jsonArg15);
pluginArrayArg.push(jsonArg16);
pluginArrayArg.push(jsonArg17);
pluginArrayArg.push(jsonArg18);
pluginArrayArg.push(jsonArg19);
pluginArrayArg.push(jsonArg20);
pluginArrayArg.push(jsonArg21);
pluginArrayArg.push(jsonArg22);
pluginArrayArg.push(jsonArg23);
pluginArrayArg.push(jsonArg24);
pluginArrayArg.push(jsonArg25);
pluginArrayArg.push(jsonArg26);
pluginArrayArg.push(jsonArg27);
pluginArrayArg.push(jsonArg28);
pluginArrayArg.push(jsonArg29);
pluginArrayArg.push(jsonArg30);
pluginArrayArg.push(jsonArg31);


console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}

/////////acaban 30dias


/////////formateando 30 dias
		function dataproviderformater30dias(dataprovider,positionselect) {
			/////coleccion de una hora unicamente
			///REALIZAR UN LISTA DE COLECCION DE numero de elementos
			var ElementInterval;
			const intervalo = 30;
		var ajustedata;
			var amplitudIntervalo;
			var  valorunit="";var tiempounit="";
			var totalpositionformater = new Array();
			var totalposition = new Array();
		   
			for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
				var coleccionposition = new Object();				
					///////////calcular los intervalos de timestamp-value
				amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);
		
					/////////////////valores que eligiria del intervalo::posisiones
		
		
					coleccionposition.p1 = 0;
					coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
					coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
					coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
					coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
					coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
					coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);
					coleccionposition.p8 = ((coleccionposition.p7) + amplitudIntervalo);
					coleccionposition.p9 = ((coleccionposition.p8) + amplitudIntervalo);
					coleccionposition.p10 = ((coleccionposition.p9) + amplitudIntervalo);
					coleccionposition.p11 = ((coleccionposition.p10) + amplitudIntervalo);		
					coleccionposition.p12 = ((coleccionposition.p11 + amplitudIntervalo));
					coleccionposition.p13 = ((coleccionposition.p12) + amplitudIntervalo);
					coleccionposition.p14 = ((coleccionposition.p13) + amplitudIntervalo);
					coleccionposition.p15 = ((coleccionposition.p14) + amplitudIntervalo);
					coleccionposition.p16 = ((coleccionposition.p15) + amplitudIntervalo);
					coleccionposition.p17 = ((coleccionposition.p16) + amplitudIntervalo);
					coleccionposition.p18 = ((coleccionposition.p17) + amplitudIntervalo);
					coleccionposition.p19 = ((coleccionposition.p18) + amplitudIntervalo);
					coleccionposition.p20 = ((coleccionposition.p19) + amplitudIntervalo);
					coleccionposition.p21 = ((coleccionposition.p20) + amplitudIntervalo);
					coleccionposition.p22 = ((coleccionposition.p21) + amplitudIntervalo);
					coleccionposition.p23 = ((coleccionposition.p22) + amplitudIntervalo);
					coleccionposition.p24 = ((coleccionposition.p23) + amplitudIntervalo);
					coleccionposition.p25 = ((coleccionposition.p24) + amplitudIntervalo);
					coleccionposition.p26 = ((coleccionposition.p25) + amplitudIntervalo);
					coleccionposition.p27 = ((coleccionposition.p26) + amplitudIntervalo);
					coleccionposition.p28 = ((coleccionposition.p27) + amplitudIntervalo);
					coleccionposition.p29 = ((coleccionposition.p28) + amplitudIntervalo);
					coleccionposition.p30 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
					totalposition.push(coleccionposition);////colecciones de posisionesNn-1
				
			}
		
		
		console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));
		
		////////////Extracion de los valores de las posisiones del array totalposition
			//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
			//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
		//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));
		
		
		
		for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
		var coleccionpositionformater = new Object();	
		
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
		coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
		coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
		coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
		coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
		coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
		coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
		coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
		coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Time;
		coleccionpositionformater.p9= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Time;
		coleccionpositionformater.p10= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Time;
		coleccionpositionformater.p11= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Time;
		coleccionpositionformater.p12= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Time;
		coleccionpositionformater.p13= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Time;
		coleccionpositionformater.p14= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Time;
		coleccionpositionformater.p15= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Time;
		coleccionpositionformater.p16= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Time;
		coleccionpositionformater.p17= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Time;
		coleccionpositionformater.p18= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Time;
		coleccionpositionformater.p19= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Time;
		coleccionpositionformater.p20= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Time;
		coleccionpositionformater.p21= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Time;
		coleccionpositionformater.p22= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Time;
		coleccionpositionformater.p23= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Time;
		coleccionpositionformater.p24= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Time;
		coleccionpositionformater.p25= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Time;
		coleccionpositionformater.p26= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Time;
		coleccionpositionformater.p27= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Time;
		coleccionpositionformater.p28= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p29].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p29].Time;
		coleccionpositionformater.p29= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p30].Value;
		tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p30].Time;
		coleccionpositionformater.p30= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
		totalpositionformater.push(coleccionpositionformater);
		
		
		}
		/////////////posisiona las tendencias endatos agrupados unitarios multidata    
		console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));
		
		
	
var jsonArg1 = new Object();
jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
var jsonArg2 = new Object();
jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
var jsonArg3 = new Object();
jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
var jsonArg4 = new Object();
jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
var jsonArg5 = new Object();
jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
var jsonArg6 = new Object();
jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
var jsonArg7 = new Object();
jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
var jsonArg8 = new Object();
jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
var jsonArg9 = new Object();
jsonArg9.year = totalpositionformater[positionselect-1].p9[0];
jsonArg9.value = totalpositionformater[positionselect-1].p9[1];
var jsonArg10 = new Object();
jsonArg10.year = totalpositionformater[positionselect-1].p10[0];
jsonArg10.value = totalpositionformater[positionselect-1].p10[1];
var jsonArg11 = new Object();
jsonArg11.year = totalpositionformater[positionselect-1].p11[0];
jsonArg11.value = totalpositionformater[positionselect-1].p11[1];
var jsonArg12 = new Object();
jsonArg12.year = totalpositionformater[positionselect-1].p12[0];
jsonArg12.value = totalpositionformater[positionselect-1].p12[1];
var jsonArg13 = new Object();
jsonArg13.year = totalpositionformater[positionselect-1].p13[0];
jsonArg13.value = totalpositionformater[positionselect-1].p13[1];
var jsonArg14 = new Object();
jsonArg14.year = totalpositionformater[positionselect-1].p14[0];
jsonArg14.value = totalpositionformater[positionselect-1].p14[1];
var jsonArg15 = new Object();
jsonArg15.year = totalpositionformater[positionselect-1].p15[0];
jsonArg15.value = totalpositionformater[positionselect-1].p15[1];
var jsonArg16 = new Object();
jsonArg16.year = totalpositionformater[positionselect-1].p16[0];
jsonArg16.value = totalpositionformater[positionselect-1].p16[1];
var jsonArg17 = new Object();
jsonArg17.year = totalpositionformater[positionselect-1].p17[0];
jsonArg17.value = totalpositionformater[positionselect-1].p17[1];
var jsonArg18 = new Object();
jsonArg18.year = totalpositionformater[positionselect-1].p18[0];
jsonArg18.value = totalpositionformater[positionselect-1].p18[1];
var jsonArg19 = new Object();
jsonArg19.year = totalpositionformater[positionselect-1].p19[0];
jsonArg19.value = totalpositionformater[positionselect-1].p19[1];
var jsonArg20 = new Object();
jsonArg20.year = totalpositionformater[positionselect-1].p20[0];
jsonArg20.value = totalpositionformater[positionselect-1].p20[1];
var jsonArg21 = new Object();
jsonArg21.year = totalpositionformater[positionselect-1].p21[0];
jsonArg21.value = totalpositionformater[positionselect-1].p21[1];
var jsonArg22 = new Object();
jsonArg22.year = totalpositionformater[positionselect-1].p22[0];
jsonArg22.value = totalpositionformater[positionselect-1].p22[1];
var jsonArg23 = new Object();
jsonArg23.year = totalpositionformater[positionselect-1].p23[0];
jsonArg23.value = totalpositionformater[positionselect-1].p23[1];
var jsonArg24 = new Object();
jsonArg24.year = totalpositionformater[positionselect-1].p24[0];
jsonArg24.value = totalpositionformater[positionselect-1].p24[1];
var jsonArg25 = new Object();
jsonArg25.year = totalpositionformater[positionselect-1].p25[0];
jsonArg25.value = totalpositionformater[positionselect-1].p25[1];
var jsonArg26 = new Object();
jsonArg26.year = totalpositionformater[positionselect-1].p26[0];
jsonArg26.value = totalpositionformater[positionselect-1].p26[1];
var jsonArg27 = new Object();
jsonArg27.year = totalpositionformater[positionselect-1].p27[0];
jsonArg27.value = totalpositionformater[positionselect-1].p27[1];
var jsonArg28 = new Object();
jsonArg28.year = totalpositionformater[positionselect-1].p28[0];
jsonArg28.value = totalpositionformater[positionselect-1].p28[1];
var jsonArg29 = new Object();
jsonArg29.year = totalpositionformater[positionselect-1].p29[0];
jsonArg29.value = totalpositionformater[positionselect-1].p29[1];
var jsonArg30 = new Object();
jsonArg30.year = totalpositionformater[positionselect-1].p30[0];
jsonArg30.value = totalpositionformater[positionselect-1].p30[1];

var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);
pluginArrayArg.push(jsonArg9);
pluginArrayArg.push(jsonArg10);
pluginArrayArg.push(jsonArg11);
pluginArrayArg.push(jsonArg12);
pluginArrayArg.push(jsonArg13);
pluginArrayArg.push(jsonArg14);
pluginArrayArg.push(jsonArg15);
pluginArrayArg.push(jsonArg16);
pluginArrayArg.push(jsonArg17);
pluginArrayArg.push(jsonArg18);
pluginArrayArg.push(jsonArg19);
pluginArrayArg.push(jsonArg20);
pluginArrayArg.push(jsonArg21);
pluginArrayArg.push(jsonArg22);
pluginArrayArg.push(jsonArg23);
pluginArrayArg.push(jsonArg24);
pluginArrayArg.push(jsonArg25);
pluginArrayArg.push(jsonArg26);
pluginArrayArg.push(jsonArg27);
pluginArrayArg.push(jsonArg28);
pluginArrayArg.push(jsonArg29);
pluginArrayArg.push(jsonArg30);

		
		console.log(JSON.stringify(pluginArrayArg));
		
		/*var jsonArg1 = new Object();
		jsonArg1.year = 'jun 26 2022 01:00:00';
		//jsonArg1.titulo = "titulo1";
		jsonArg1.value = 3.1415;
		jsonArg1.tutulo = "titulo";
		jsonArg1.value2 = 2.1415;
		jsonArg1.tutulo2 = "titulo2";
		jsonArg1.value3 = 1.1415;
		jsonArg1.tutulo3 = "titulo3";
		
		var jsonArg2 = new Object();
		jsonArg2.year = 'jun 26 2022 01:20:00';
		jsonArg2.value = 5.73;
		jsonArg1.tutulo = "titulo1";
		jsonArg2.value2 = 4.1415;
		jsonArg1.tutulo2 = "titulo2";
		jsonArg2.value3 = 3.1415;
		jsonArg1.tutulo3 = "titulo3";
		
		
		var pluginArrayArg = new Array();
		pluginArrayArg.push(jsonArg1);
		pluginArrayArg.push(jsonArg2);
		
		///to convert pluginArrayArg (which is pure javascript array) into JSON array:
		
		var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
		return pluginArrayArg ;
		///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
		}
		
		/////////acaban 30dias

//////////////////////////formateando 29dias
function dataproviderformater29dias(dataprovider,positionselect) {
	/////coleccion de una hora unicamente
	///REALIZAR UN LISTA DE COLECCION DE numero de elementos
	var ElementInterval;
	const intervalo = 29;
var ajustedata;
	var amplitudIntervalo;
	var  valorunit="";var tiempounit="";
	var totalpositionformater = new Array();
	var totalposition = new Array();
   
	for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
		var coleccionposition = new Object();				
			///////////calcular los intervalos de timestamp-value
		amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);

			/////////////////valores que eligiria del intervalo::posisiones


			coleccionposition.p1 = 0;
			coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
			coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
			coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
			coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
			coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
			coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);
			coleccionposition.p8 = ((coleccionposition.p7) + amplitudIntervalo);
			coleccionposition.p9 = ((coleccionposition.p8) + amplitudIntervalo);
			coleccionposition.p10 = ((coleccionposition.p9) + amplitudIntervalo);
			coleccionposition.p11 = ((coleccionposition.p10) + amplitudIntervalo);		
			coleccionposition.p12 = ((coleccionposition.p11 + amplitudIntervalo));
			coleccionposition.p13 = ((coleccionposition.p12) + amplitudIntervalo);
			coleccionposition.p14 = ((coleccionposition.p13) + amplitudIntervalo);
			coleccionposition.p15 = ((coleccionposition.p14) + amplitudIntervalo);
			coleccionposition.p16 = ((coleccionposition.p15) + amplitudIntervalo);
			coleccionposition.p17 = ((coleccionposition.p16) + amplitudIntervalo);
			coleccionposition.p18 = ((coleccionposition.p17) + amplitudIntervalo);
			coleccionposition.p19 = ((coleccionposition.p18) + amplitudIntervalo);
			coleccionposition.p20 = ((coleccionposition.p19) + amplitudIntervalo);
			coleccionposition.p21 = ((coleccionposition.p20) + amplitudIntervalo);
			coleccionposition.p22 = ((coleccionposition.p21) + amplitudIntervalo);
			coleccionposition.p23 = ((coleccionposition.p22) + amplitudIntervalo);
			coleccionposition.p24 = ((coleccionposition.p23) + amplitudIntervalo);
			coleccionposition.p25 = ((coleccionposition.p24) + amplitudIntervalo);
			coleccionposition.p26 = ((coleccionposition.p25) + amplitudIntervalo);
			coleccionposition.p27 = ((coleccionposition.p26) + amplitudIntervalo);
			coleccionposition.p28 = ((coleccionposition.p27) + amplitudIntervalo);
			coleccionposition.p29 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
			totalposition.push(coleccionposition);////colecciones de posisionesNn-1
		
	}


console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
	//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
	//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
var coleccionpositionformater = new Object();	

valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Time;
coleccionpositionformater.p9= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Time;
coleccionpositionformater.p10= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Time;
coleccionpositionformater.p11= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Time;
coleccionpositionformater.p12= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Time;
coleccionpositionformater.p13= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Time;
coleccionpositionformater.p14= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Time;
coleccionpositionformater.p15= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Time;
coleccionpositionformater.p16= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Time;
coleccionpositionformater.p17= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Time;
coleccionpositionformater.p18= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Time;
coleccionpositionformater.p19= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Time;
coleccionpositionformater.p20= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Time;
coleccionpositionformater.p21= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Time;
coleccionpositionformater.p22= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Time;
coleccionpositionformater.p23= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Time;
coleccionpositionformater.p24= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Time;
coleccionpositionformater.p25= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Time;
coleccionpositionformater.p26= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Time;
coleccionpositionformater.p27= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Time;
coleccionpositionformater.p28= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p29].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p29].Time;
coleccionpositionformater.p29= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
totalpositionformater.push(coleccionpositionformater);


}
/////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));



var jsonArg1 = new Object();
jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
var jsonArg2 = new Object();
jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
var jsonArg3 = new Object();
jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
var jsonArg4 = new Object();
jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
var jsonArg5 = new Object();
jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
var jsonArg6 = new Object();
jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
var jsonArg7 = new Object();
jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
var jsonArg8 = new Object();
jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
var jsonArg9 = new Object();
jsonArg9.year = totalpositionformater[positionselect-1].p9[0];
jsonArg9.value = totalpositionformater[positionselect-1].p9[1];
var jsonArg10 = new Object();
jsonArg10.year = totalpositionformater[positionselect-1].p10[0];
jsonArg10.value = totalpositionformater[positionselect-1].p10[1];
var jsonArg11 = new Object();
jsonArg11.year = totalpositionformater[positionselect-1].p11[0];
jsonArg11.value = totalpositionformater[positionselect-1].p11[1];
var jsonArg12 = new Object();
jsonArg12.year = totalpositionformater[positionselect-1].p12[0];
jsonArg12.value = totalpositionformater[positionselect-1].p12[1];
var jsonArg13 = new Object();
jsonArg13.year = totalpositionformater[positionselect-1].p13[0];
jsonArg13.value = totalpositionformater[positionselect-1].p13[1];
var jsonArg14 = new Object();
jsonArg14.year = totalpositionformater[positionselect-1].p14[0];
jsonArg14.value = totalpositionformater[positionselect-1].p14[1];
var jsonArg15 = new Object();
jsonArg15.year = totalpositionformater[positionselect-1].p15[0];
jsonArg15.value = totalpositionformater[positionselect-1].p15[1];
var jsonArg16 = new Object();
jsonArg16.year = totalpositionformater[positionselect-1].p16[0];
jsonArg16.value = totalpositionformater[positionselect-1].p16[1];
var jsonArg17 = new Object();
jsonArg17.year = totalpositionformater[positionselect-1].p17[0];
jsonArg17.value = totalpositionformater[positionselect-1].p17[1];
var jsonArg18 = new Object();
jsonArg18.year = totalpositionformater[positionselect-1].p18[0];
jsonArg18.value = totalpositionformater[positionselect-1].p18[1];
var jsonArg19 = new Object();
jsonArg19.year = totalpositionformater[positionselect-1].p19[0];
jsonArg19.value = totalpositionformater[positionselect-1].p19[1];
var jsonArg20 = new Object();
jsonArg20.year = totalpositionformater[positionselect-1].p20[0];
jsonArg20.value = totalpositionformater[positionselect-1].p20[1];
var jsonArg21 = new Object();
jsonArg21.year = totalpositionformater[positionselect-1].p21[0];
jsonArg21.value = totalpositionformater[positionselect-1].p21[1];
var jsonArg22 = new Object();
jsonArg22.year = totalpositionformater[positionselect-1].p22[0];
jsonArg22.value = totalpositionformater[positionselect-1].p22[1];
var jsonArg23 = new Object();
jsonArg23.year = totalpositionformater[positionselect-1].p23[0];
jsonArg23.value = totalpositionformater[positionselect-1].p23[1];
var jsonArg24 = new Object();
jsonArg24.year = totalpositionformater[positionselect-1].p24[0];
jsonArg24.value = totalpositionformater[positionselect-1].p24[1];
var jsonArg25 = new Object();
jsonArg25.year = totalpositionformater[positionselect-1].p25[0];
jsonArg25.value = totalpositionformater[positionselect-1].p25[1];
var jsonArg26 = new Object();
jsonArg26.year = totalpositionformater[positionselect-1].p26[0];
jsonArg26.value = totalpositionformater[positionselect-1].p26[1];
var jsonArg27 = new Object();
jsonArg27.year = totalpositionformater[positionselect-1].p27[0];
jsonArg27.value = totalpositionformater[positionselect-1].p27[1];
var jsonArg28 = new Object();
jsonArg28.year = totalpositionformater[positionselect-1].p28[0];
jsonArg28.value = totalpositionformater[positionselect-1].p28[1];
var jsonArg29 = new Object();
jsonArg29.year = totalpositionformater[positionselect-1].p29[0];
jsonArg29.value = totalpositionformater[positionselect-1].p29[1];

var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);
pluginArrayArg.push(jsonArg9);
pluginArrayArg.push(jsonArg10);
pluginArrayArg.push(jsonArg11);
pluginArrayArg.push(jsonArg12);
pluginArrayArg.push(jsonArg13);
pluginArrayArg.push(jsonArg14);
pluginArrayArg.push(jsonArg15);
pluginArrayArg.push(jsonArg16);
pluginArrayArg.push(jsonArg17);
pluginArrayArg.push(jsonArg18);
pluginArrayArg.push(jsonArg19);
pluginArrayArg.push(jsonArg20);
pluginArrayArg.push(jsonArg21);
pluginArrayArg.push(jsonArg22);
pluginArrayArg.push(jsonArg23);
pluginArrayArg.push(jsonArg24);
pluginArrayArg.push(jsonArg25);
pluginArrayArg.push(jsonArg26);
pluginArrayArg.push(jsonArg27);
pluginArrayArg.push(jsonArg28);
pluginArrayArg.push(jsonArg29);


console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}

/////////acaban 29dias

//////////////////////////formateando 28dias
function dataproviderformater28dias(dataprovider,positionselect) {
	/////coleccion de una hora unicamente
	///REALIZAR UN LISTA DE COLECCION DE numero de elementos
	var ElementInterval;
	const intervalo = 28;
var ajustedata;
	var amplitudIntervalo;
	var  valorunit="";var tiempounit="";
	var totalpositionformater = new Array();
	var totalposition = new Array();
   
	for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
		var coleccionposition = new Object();				
			///////////calcular los intervalos de timestamp-value
		amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);

			/////////////////valores que eligiria del intervalo::posisiones


			coleccionposition.p1 = 0;
			coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
			coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
			coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
			coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
			coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
			coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);
			coleccionposition.p8 = ((coleccionposition.p7) + amplitudIntervalo);
			coleccionposition.p9 = ((coleccionposition.p8) + amplitudIntervalo);
			coleccionposition.p10 = ((coleccionposition.p9) + amplitudIntervalo);
			coleccionposition.p11 = ((coleccionposition.p10) + amplitudIntervalo);		
			coleccionposition.p12 = ((coleccionposition.p11 + amplitudIntervalo));
			coleccionposition.p13 = ((coleccionposition.p12) + amplitudIntervalo);
			coleccionposition.p14 = ((coleccionposition.p13) + amplitudIntervalo);
			coleccionposition.p15 = ((coleccionposition.p14) + amplitudIntervalo);
			coleccionposition.p16 = ((coleccionposition.p15) + amplitudIntervalo);
			coleccionposition.p17 = ((coleccionposition.p16) + amplitudIntervalo);
			coleccionposition.p18 = ((coleccionposition.p17) + amplitudIntervalo);
			coleccionposition.p19 = ((coleccionposition.p18) + amplitudIntervalo);
			coleccionposition.p20 = ((coleccionposition.p19) + amplitudIntervalo);
			coleccionposition.p21 = ((coleccionposition.p20) + amplitudIntervalo);
			coleccionposition.p22 = ((coleccionposition.p21) + amplitudIntervalo);
			coleccionposition.p23 = ((coleccionposition.p22) + amplitudIntervalo);
			coleccionposition.p24 = ((coleccionposition.p23) + amplitudIntervalo);
			coleccionposition.p25 = ((coleccionposition.p24) + amplitudIntervalo);
			coleccionposition.p26 = ((coleccionposition.p25) + amplitudIntervalo);
			coleccionposition.p27 = ((coleccionposition.p26) + amplitudIntervalo);
			coleccionposition.p28 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
			totalposition.push(coleccionposition);////colecciones de posisionesNn-1
		
	}


console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
	//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
	//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
var coleccionpositionformater = new Object();	

valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Time;
coleccionpositionformater.p9= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Time;
coleccionpositionformater.p10= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Time;
coleccionpositionformater.p11= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Time;
coleccionpositionformater.p12= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Time;
coleccionpositionformater.p13= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Time;
coleccionpositionformater.p14= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Time;
coleccionpositionformater.p15= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Time;
coleccionpositionformater.p16= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Time;
coleccionpositionformater.p17= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Time;
coleccionpositionformater.p18= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Time;
coleccionpositionformater.p19= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Time;
coleccionpositionformater.p20= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Time;
coleccionpositionformater.p21= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Time;
coleccionpositionformater.p22= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Time;
coleccionpositionformater.p23= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Time;
coleccionpositionformater.p24= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p25].Time;
coleccionpositionformater.p25= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p26].Time;
coleccionpositionformater.p26= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p27].Time;
coleccionpositionformater.p27= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p28].Time;
coleccionpositionformater.p28= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
totalpositionformater.push(coleccionpositionformater);


}
/////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));



var jsonArg1 = new Object();
jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
var jsonArg2 = new Object();
jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
var jsonArg3 = new Object();
jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
var jsonArg4 = new Object();
jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
var jsonArg5 = new Object();
jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
var jsonArg6 = new Object();
jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
var jsonArg7 = new Object();
jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
var jsonArg8 = new Object();
jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
var jsonArg9 = new Object();
jsonArg9.year = totalpositionformater[positionselect-1].p9[0];
jsonArg9.value = totalpositionformater[positionselect-1].p9[1];
var jsonArg10 = new Object();
jsonArg10.year = totalpositionformater[positionselect-1].p10[0];
jsonArg10.value = totalpositionformater[positionselect-1].p10[1];
var jsonArg11 = new Object();
jsonArg11.year = totalpositionformater[positionselect-1].p11[0];
jsonArg11.value = totalpositionformater[positionselect-1].p11[1];
var jsonArg12 = new Object();
jsonArg12.year = totalpositionformater[positionselect-1].p12[0];
jsonArg12.value = totalpositionformater[positionselect-1].p12[1];
var jsonArg13 = new Object();
jsonArg13.year = totalpositionformater[positionselect-1].p13[0];
jsonArg13.value = totalpositionformater[positionselect-1].p13[1];
var jsonArg14 = new Object();
jsonArg14.year = totalpositionformater[positionselect-1].p14[0];
jsonArg14.value = totalpositionformater[positionselect-1].p14[1];
var jsonArg15 = new Object();
jsonArg15.year = totalpositionformater[positionselect-1].p15[0];
jsonArg15.value = totalpositionformater[positionselect-1].p15[1];
var jsonArg16 = new Object();
jsonArg16.year = totalpositionformater[positionselect-1].p16[0];
jsonArg16.value = totalpositionformater[positionselect-1].p16[1];
var jsonArg17 = new Object();
jsonArg17.year = totalpositionformater[positionselect-1].p17[0];
jsonArg17.value = totalpositionformater[positionselect-1].p17[1];
var jsonArg18 = new Object();
jsonArg18.year = totalpositionformater[positionselect-1].p18[0];
jsonArg18.value = totalpositionformater[positionselect-1].p18[1];
var jsonArg19 = new Object();
jsonArg19.year = totalpositionformater[positionselect-1].p19[0];
jsonArg19.value = totalpositionformater[positionselect-1].p19[1];
var jsonArg20 = new Object();
jsonArg20.year = totalpositionformater[positionselect-1].p20[0];
jsonArg20.value = totalpositionformater[positionselect-1].p20[1];
var jsonArg21 = new Object();
jsonArg21.year = totalpositionformater[positionselect-1].p21[0];
jsonArg21.value = totalpositionformater[positionselect-1].p21[1];
var jsonArg22 = new Object();
jsonArg22.year = totalpositionformater[positionselect-1].p22[0];
jsonArg22.value = totalpositionformater[positionselect-1].p22[1];
var jsonArg23 = new Object();
jsonArg23.year = totalpositionformater[positionselect-1].p23[0];
jsonArg23.value = totalpositionformater[positionselect-1].p23[1];
var jsonArg24 = new Object();
jsonArg24.year = totalpositionformater[positionselect-1].p24[0];
jsonArg24.value = totalpositionformater[positionselect-1].p24[1];
var jsonArg25 = new Object();
jsonArg25.year = totalpositionformater[positionselect-1].p25[0];
jsonArg25.value = totalpositionformater[positionselect-1].p25[1];
var jsonArg26 = new Object();
jsonArg26.year = totalpositionformater[positionselect-1].p26[0];
jsonArg26.value = totalpositionformater[positionselect-1].p26[1];
var jsonArg27 = new Object();
jsonArg27.year = totalpositionformater[positionselect-1].p27[0];
jsonArg27.value = totalpositionformater[positionselect-1].p27[1];
var jsonArg28 = new Object();
jsonArg28.year = totalpositionformater[positionselect-1].p28[0];
jsonArg28.value = totalpositionformater[positionselect-1].p28[1];

var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);
pluginArrayArg.push(jsonArg9);
pluginArrayArg.push(jsonArg10);
pluginArrayArg.push(jsonArg11);
pluginArrayArg.push(jsonArg12);
pluginArrayArg.push(jsonArg13);
pluginArrayArg.push(jsonArg14);
pluginArrayArg.push(jsonArg15);
pluginArrayArg.push(jsonArg16);
pluginArrayArg.push(jsonArg17);
pluginArrayArg.push(jsonArg18);
pluginArrayArg.push(jsonArg19);
pluginArrayArg.push(jsonArg20);
pluginArrayArg.push(jsonArg21);
pluginArrayArg.push(jsonArg22);
pluginArrayArg.push(jsonArg23);
pluginArrayArg.push(jsonArg24);
pluginArrayArg.push(jsonArg25);
pluginArrayArg.push(jsonArg26);
pluginArrayArg.push(jsonArg27);
pluginArrayArg.push(jsonArg28);

console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}

/////////acaban 28dias
//////////////////forteando 1dia

function dataproviderformater1dias(dataprovider,positionselect) {
	/////coleccion de una hora unicamente
	///REALIZAR UN LISTA DE COLECCION DE numero de elementos
	var ElementInterval;
	const intervalo = 24;
var ajustedata;
	var amplitudIntervalo;
	var  valorunit="";var tiempounit="";
	var totalpositionformater = new Array();
	var totalposition = new Array();
   
	for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
		var coleccionposition = new Object();				
			///////////calcular los intervalos de timestamp-value
		amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);

			/////////////////valores que eligiria del intervalo::posisiones


			coleccionposition.p1 = 0;
			coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
			coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
			coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
			coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
			coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
			coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);
			coleccionposition.p8 = ((coleccionposition.p7) + amplitudIntervalo);
			coleccionposition.p9 = ((coleccionposition.p8) + amplitudIntervalo);
			coleccionposition.p10 = ((coleccionposition.p9) + amplitudIntervalo);
			coleccionposition.p11 = ((coleccionposition.p10) + amplitudIntervalo);		
			coleccionposition.p12 = ((coleccionposition.p11 + amplitudIntervalo));
			coleccionposition.p13 = ((coleccionposition.p12) + amplitudIntervalo);
			coleccionposition.p14 = ((coleccionposition.p13) + amplitudIntervalo);
			coleccionposition.p15 = ((coleccionposition.p14) + amplitudIntervalo);
			coleccionposition.p16 = ((coleccionposition.p15) + amplitudIntervalo);
			coleccionposition.p17 = ((coleccionposition.p16) + amplitudIntervalo);
			coleccionposition.p18 = ((coleccionposition.p17) + amplitudIntervalo);
			coleccionposition.p19 = ((coleccionposition.p18) + amplitudIntervalo);
			coleccionposition.p20 = ((coleccionposition.p19) + amplitudIntervalo);
			coleccionposition.p21 = ((coleccionposition.p20) + amplitudIntervalo);
			coleccionposition.p22 = ((coleccionposition.p21) + amplitudIntervalo);
			coleccionposition.p23 = ((coleccionposition.p22) + amplitudIntervalo);
			coleccionposition.p24 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
			totalposition.push(coleccionposition);////colecciones de posisionesNn-1
		
	}


console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
	//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
	//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
var coleccionpositionformater = new Object();	

valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Time;
coleccionpositionformater.p9= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Time;
coleccionpositionformater.p10= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Time;
coleccionpositionformater.p11= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Time;
coleccionpositionformater.p12= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p13].Time;
coleccionpositionformater.p13= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p14].Time;
coleccionpositionformater.p14= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p15].Time;
coleccionpositionformater.p15= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p16].Time;
coleccionpositionformater.p16= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p17].Time;
coleccionpositionformater.p17= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p18].Time;
coleccionpositionformater.p18= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p19].Time;
coleccionpositionformater.p19= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p20].Time;
coleccionpositionformater.p20= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p21].Time;
coleccionpositionformater.p21= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p22].Time;
coleccionpositionformater.p22= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p23].Time;
coleccionpositionformater.p23= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Value;
tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p24].Time;
coleccionpositionformater.p24= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
totalpositionformater.push(coleccionpositionformater);


}
/////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));




var jsonArg1 = new Object();
jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
var jsonArg2 = new Object();
jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
var jsonArg3 = new Object();
jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
var jsonArg4 = new Object();
jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
var jsonArg5 = new Object();
jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
var jsonArg6 = new Object();
jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
var jsonArg7 = new Object();
jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
var jsonArg8 = new Object();
jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
var jsonArg9 = new Object();
jsonArg9.year = totalpositionformater[positionselect-1].p9[0];
jsonArg9.value = totalpositionformater[positionselect-1].p9[1];
var jsonArg10 = new Object();
jsonArg10.year = totalpositionformater[positionselect-1].p10[0];
jsonArg10.value = totalpositionformater[positionselect-1].p10[1];
var jsonArg11 = new Object();
jsonArg11.year = totalpositionformater[positionselect-1].p11[0];
jsonArg11.value = totalpositionformater[positionselect-1].p11[1];
var jsonArg12 = new Object();
jsonArg12.year = totalpositionformater[positionselect-1].p12[0];
jsonArg12.value = totalpositionformater[positionselect-1].p12[1];
var jsonArg13 = new Object();
jsonArg13.year = totalpositionformater[positionselect-1].p13[0];
jsonArg13.value = totalpositionformater[positionselect-1].p13[1];
var jsonArg14 = new Object();
jsonArg14.year = totalpositionformater[positionselect-1].p14[0];
jsonArg14.value = totalpositionformater[positionselect-1].p14[1];
var jsonArg15 = new Object();
jsonArg15.year = totalpositionformater[positionselect-1].p15[0];
jsonArg15.value = totalpositionformater[positionselect-1].p15[1];
var jsonArg16 = new Object();
jsonArg16.year = totalpositionformater[positionselect-1].p16[0];
jsonArg16.value = totalpositionformater[positionselect-1].p16[1];
var jsonArg17 = new Object();
jsonArg17.year = totalpositionformater[positionselect-1].p17[0];
jsonArg17.value = totalpositionformater[positionselect-1].p17[1];
var jsonArg18 = new Object();
jsonArg18.year = totalpositionformater[positionselect-1].p18[0];
jsonArg18.value = totalpositionformater[positionselect-1].p18[1];
var jsonArg19 = new Object();
jsonArg19.year = totalpositionformater[positionselect-1].p19[0];
jsonArg19.value = totalpositionformater[positionselect-1].p19[1];
var jsonArg20 = new Object();
jsonArg20.year = totalpositionformater[positionselect-1].p20[0];
jsonArg20.value = totalpositionformater[positionselect-1].p20[1];
var jsonArg21 = new Object();
jsonArg21.year = totalpositionformater[positionselect-1].p21[0];
jsonArg21.value = totalpositionformater[positionselect-1].p21[1];
var jsonArg22 = new Object();
jsonArg22.year = totalpositionformater[positionselect-1].p22[0];
jsonArg22.value = totalpositionformater[positionselect-1].p22[1];
var jsonArg23 = new Object();
jsonArg23.year = totalpositionformater[positionselect-1].p23[0];
jsonArg23.value = totalpositionformater[positionselect-1].p23[1];
var jsonArg24 = new Object();
jsonArg24.year = totalpositionformater[positionselect-1].p24[0];
jsonArg24.value = totalpositionformater[positionselect-1].p24[1];
var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);
pluginArrayArg.push(jsonArg9);
pluginArrayArg.push(jsonArg10);
pluginArrayArg.push(jsonArg11);
pluginArrayArg.push(jsonArg12);
pluginArrayArg.push(jsonArg13);
pluginArrayArg.push(jsonArg14);
pluginArrayArg.push(jsonArg15);
pluginArrayArg.push(jsonArg16);
pluginArrayArg.push(jsonArg17);
pluginArrayArg.push(jsonArg18);
pluginArrayArg.push(jsonArg19);
pluginArrayArg.push(jsonArg20);
pluginArrayArg.push(jsonArg21);
pluginArrayArg.push(jsonArg22);
pluginArrayArg.push(jsonArg23);
pluginArrayArg.push(jsonArg24);


console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}



////////////////acaba 1dias


		///////formateando 7dias

		function dataproviderformater7dias(dataprovider,positionselect) {
			/////coleccion de una hora unicamente
  
			///REALIZAR UN LISTA DE COLECCION DE numero de elementos
			var ElementInterval;
			const intervalo = 7;
		        var ajustedata;
			var amplitudIntervalo;
			var  valorunit="";var tiempounit="";
			var totalpositionformater = new Array();
			var totalposition = new Array();
           
                              
     
			for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
				var coleccionposition = new Object();				
					///////////calcular los intervalos de timestamp-value
				amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);

					/////////////////valores que eligiria del intervalo::posisiones


					coleccionposition.p1 = 0;
					coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
					coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
					coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
					coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
					coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);				
					coleccionposition.p7 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
					totalposition.push(coleccionposition);////colecciones de posisionesNn-1
				
			}


		console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
			//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
			//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
	var coleccionpositionformater = new Object();	
 

      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
	  coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
	  coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
	  coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
	  coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
	  coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
	  coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
	  coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);   
	  totalpositionformater.push(coleccionpositionformater);


}
   /////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));




	var jsonArg1 = new Object();
	jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
	jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
	var jsonArg2 = new Object();
    jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
    jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
	var jsonArg3 = new Object();
	jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
	jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
	var jsonArg4 = new Object();
    jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
    jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
	var jsonArg5 = new Object();
    jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
    jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
	var jsonArg6 = new Object();
    jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
    jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
	var jsonArg7 = new Object();
	jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
	jsonArg7.value = totalpositionformater[positionselect-1].p7[1];

var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);




console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}



       ///////////acaban 7dias


        ///formateando 8h
		function dataproviderformater8hora(dataprovider,positionselect) {
			/////coleccion de una hora unicamente
			///REALIZAR UN LISTA DE COLECCION DE numero de elementos
			var ElementInterval;
			const intervalo = 8;
		var ajustedata;
			var amplitudIntervalo;
			var  valorunit="";var tiempounit="";
			var totalpositionformater = new Array();
			var totalposition = new Array();
           
			for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
				var coleccionposition = new Object();				
					///////////calcular los intervalos de timestamp-value
				amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);

					/////////////////valores que eligiria del intervalo::posisiones


					coleccionposition.p1 = 0;
					coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
					coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
					coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
					coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
					coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
					coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);
				//	coleccionposition.p8 = ((coleccionposition.p7) + amplitudIntervalo);
				
					coleccionposition.p8 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
					totalposition.push(coleccionposition);////colecciones de posisionesNn-1
				
			}


		console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
			//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
			//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
	var coleccionpositionformater = new Object();	
 

      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
	  coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
	  coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
	  coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
	  coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
	  coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
	  coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
	  coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
	  coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  totalpositionformater.push(coleccionpositionformater);


}
   /////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));




	var jsonArg1 = new Object();
	jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
	jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
	var jsonArg2 = new Object();
    jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
    jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
	var jsonArg3 = new Object();
	jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
	jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
	var jsonArg4 = new Object();
    jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
    jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
	var jsonArg5 = new Object();
    jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
    jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
	var jsonArg6 = new Object();
    jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
    jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
var jsonArg7 = new Object();
	jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
	jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
var jsonArg8 = new Object();
    jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
    jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);



console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}


     ////////////////////////////////////acaba 8h
		///formateando 1h
		function dataproviderformater1hora(dataprovider,positionselect) {
			/////coleccion de una hora unicamente
			///REALIZAR UN LISTA DE COLECCION DE numero de elementos
			var ElementInterval;
			const intervalo = 12;
			const valortotalatributo=dataprovider[0].Values.Values.length - 1;

			
		console.log("atrubuto::"+valortotalatributo);

		var ajustedata;
			var amplitudIntervalo;
			var  valorunit="";var tiempounit="";
			var totalpositionformater = new Array();
			var totalposition = new Array();
           
			for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
				var coleccionposition = new Object();				
					///////////calcular los intervalos de timestamp-value
					if((dataprovider[indexpadre-1].Values.Values.length - 1)<=50){
						///////////////////////para datos menores a 32//
												   
						for( var incconst=1;incconst<=12;incconst++ ){
							console.log("condicion por dentromenos de 50:"+incconst+"/"+ valortotalatributo+"<="+incconst);
							
						
												if((incconst==1) && (incconst<=valortotalatributo)){
												//	console.log("correcto");
													coleccionposition.p1 = incconst-1;
											//		totalposition.push(coleccionposition);
												}else if(incconst==1){
													console.log("incorrecto");
													coleccionposition.p1 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
											//		totalposition.push(coleccionposition);
												}
												 
												if(incconst==2 && incconst<=valortotalatributo){
												//	console.log("correcto");
													coleccionposition.p2 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==2){
													coleccionposition.p2 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
													//totalposition.push(coleccionposition);
												}
						
						
						
												if(incconst==3 && incconst<=valortotalatributo){
												//	console.log("correcto");
													coleccionposition.p3 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==2){
													coleccionposition.p3 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
						
						
												if(incconst==4 && incconst<=valortotalatributo){
													coleccionposition.p4 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==3){
													coleccionposition.p4 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
						
												if(incconst==5 && incconst<=valortotalatributo){
													coleccionposition.p5 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==5){
													coleccionposition.p5 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
						
												if(incconst==6 && incconst<=valortotalatributo){
													coleccionposition.p6 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==6){
													coleccionposition.p6 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
												if(incconst==7 && incconst<=valortotalatributo){
													coleccionposition.p7 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==7){
													coleccionposition.p7 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
												if(incconst==8 && incconst<=valortotalatributo){
													coleccionposition.p8 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==8){
													coleccionposition.p8 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
												if(incconst==9 && incconst<=valortotalatributo){
													coleccionposition.p9 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==9){
													coleccionposition.p9 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
											
											
												if(incconst==10 && incconst<=valortotalatributo){
													coleccionposition.p10 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==10){
													coleccionposition.p10 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
												if(incconst==11 && incconst<=valortotalatributo){
													coleccionposition.p11 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==11){
													coleccionposition.p11 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
				
												if(incconst==12 && incconst<=valortotalatributo){
													coleccionposition.p12 = incconst-1;
												//	totalposition.push(coleccionposition);
												}else if(incconst==12){
													coleccionposition.p12 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
												//	totalposition.push(coleccionposition);
												}
											
											
						
											
						
											}//////////////termina el ciclado de seleccion para valores menores a 50
						
						
						
											totalposition.push(coleccionposition);////colecciones de posisionesNn-1
						
											}else{
									///////////calcular los intervalos de timestamp-value
						
								amplitudIntervalo = Math.trunc((dataprovider[indexpadre-1].Values.Values.length - 1) / intervalo);
										  console.log("intervalos::"+amplitudIntervalo);
									/////////////////valores que eligiria del intervalo::posisiones
									coleccionposition.p1 = 0;
									coleccionposition.p2 = (((coleccionposition.p1 + amplitudIntervalo)) + amplitudIntervalo);
									coleccionposition.p3 = ((coleccionposition.p2) + amplitudIntervalo);
									coleccionposition.p4 = ((coleccionposition.p3) + amplitudIntervalo);
									coleccionposition.p5 = ((coleccionposition.p4) + amplitudIntervalo);
									coleccionposition.p6 = ((coleccionposition.p5) + amplitudIntervalo);
									coleccionposition.p7 = ((coleccionposition.p6) + amplitudIntervalo);		
									coleccionposition.p8 = ((coleccionposition.p6) + amplitudIntervalo);
									coleccionposition.p9 = ((coleccionposition.p6) + amplitudIntervalo);	
									coleccionposition.p10 = ((coleccionposition.p6) + amplitudIntervalo);	
									coleccionposition.p11 = ((coleccionposition.p6) + amplitudIntervalo);									
									coleccionposition.p12 = ((dataprovider[indexpadre-1].Values.Values.length)-1);
									totalposition.push(coleccionposition);////colecciones de posisionesNn-1
										  }
			}


		console.log("ARRAY TOTAL:  " + JSON.stringify(totalposition));

////////////Extracion de los valores de las posisiones del array totalposition
			//console.log("data que necesita abraham valor: ", JSON.stringify(dataProvider[0].Values.Values[0].Value));
			//console.log("data que necesita abraham valor TOTAL DE LA DATA: ", JSON.stringify(dataProvider[0].Values.Values.length));
//console.log("datos internos::::"+JSON.stringify(  dataprovider[0].Values.Values[totalposition[0].p12].Value));



for (var indexpadre = 1; indexpadre <= dataprovider.length; indexpadre++) {////////n elemt totales
	var coleccionpositionformater = new Object();	
 
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p1].Time;
	  coleccionpositionformater.p1= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p2].Time;
	  coleccionpositionformater.p2= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p3].Time;
	  coleccionpositionformater.p3= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p4].Time;
	  coleccionpositionformater.p4= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p5].Time;
	  coleccionpositionformater.p5= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p6].Time;
	  coleccionpositionformater.p6= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p7].Time;
	  coleccionpositionformater.p7= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p8].Time;
	  coleccionpositionformater.p8= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p9].Time;
	  coleccionpositionformater.p9= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p10].Time;
	  coleccionpositionformater.p10= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p11].Time;
	  coleccionpositionformater.p11= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
      valorunit = dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Value;
      tiempounit= dataprovider[indexpadre-1].Values.Values[totalposition[indexpadre-1].p12].Time;
	  coleccionpositionformater.p12= ajustedata=ajustetimevalueprovider(valorunit,tiempounit);
	  totalpositionformater.push(coleccionpositionformater);


}
   /////////////posisiona las tendencias endatos agrupados unitarios multidata    
console.log("ARRAY TOTALformater:  " + JSON.stringify(totalpositionformater[0].p1[0]));




	var jsonArg1 = new Object();
	jsonArg1.year = totalpositionformater[positionselect-1].p1[0];
	jsonArg1.value = totalpositionformater[positionselect-1].p1[1];
	var jsonArg2 = new Object();
    jsonArg2.year = totalpositionformater[positionselect-1].p2[0];
    jsonArg2.value = totalpositionformater[positionselect-1].p2[1];
	var jsonArg3 = new Object();
	jsonArg3.year = totalpositionformater[positionselect-1].p3[0];
	jsonArg3.value = totalpositionformater[positionselect-1].p3[1];
	var jsonArg4 = new Object();
    jsonArg4.year = totalpositionformater[positionselect-1].p4[0];
    jsonArg4.value = totalpositionformater[positionselect-1].p4[1];
	var jsonArg5 = new Object();
    jsonArg5.year = totalpositionformater[positionselect-1].p5[0];
    jsonArg5.value = totalpositionformater[positionselect-1].p5[1];
	var jsonArg6 = new Object();
    jsonArg6.year = totalpositionformater[positionselect-1].p6[0];
    jsonArg6.value = totalpositionformater[positionselect-1].p6[1];
	var jsonArg7 = new Object();
	jsonArg7.year = totalpositionformater[positionselect-1].p7[0];
	jsonArg7.value = totalpositionformater[positionselect-1].p7[1];
	var jsonArg8 = new Object();
    jsonArg8.year = totalpositionformater[positionselect-1].p8[0];
    jsonArg8.value = totalpositionformater[positionselect-1].p8[1];
	var jsonArg9 = new Object();
	jsonArg9.year = totalpositionformater[positionselect-1].p9[0];
	jsonArg9.value = totalpositionformater[positionselect-1].p9[1];
	var jsonArg10 = new Object();
    jsonArg10.year = totalpositionformater[positionselect-1].p10[0];
    jsonArg10.value = totalpositionformater[positionselect-1].p10[1];
	var jsonArg11 = new Object();
    jsonArg11.year = totalpositionformater[positionselect-1].p11[0];
    jsonArg11.value = totalpositionformater[positionselect-1].p11[1];
	var jsonArg12 = new Object();
    jsonArg12.year = totalpositionformater[positionselect-1].p12[0];
    jsonArg12.value = totalpositionformater[positionselect-1].p12[1];
var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);
pluginArrayArg.push(jsonArg3);
pluginArrayArg.push(jsonArg4);
pluginArrayArg.push(jsonArg5);
pluginArrayArg.push(jsonArg6);
pluginArrayArg.push(jsonArg7);
pluginArrayArg.push(jsonArg8);
pluginArrayArg.push(jsonArg9);
pluginArrayArg.push(jsonArg10);
pluginArrayArg.push(jsonArg11);
pluginArrayArg.push(jsonArg12);



//////elemento 2



console.log(JSON.stringify(pluginArrayArg));

/*var jsonArg1 = new Object();
jsonArg1.year = 'jun 26 2022 01:00:00';
//jsonArg1.titulo = "titulo1";
jsonArg1.value = 3.1415;
jsonArg1.tutulo = "titulo";
jsonArg1.value2 = 2.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg1.value3 = 1.1415;
jsonArg1.tutulo3 = "titulo3";

var jsonArg2 = new Object();
jsonArg2.year = 'jun 26 2022 01:20:00';
jsonArg2.value = 5.73;
jsonArg1.tutulo = "titulo1";
jsonArg2.value2 = 4.1415;
jsonArg1.tutulo2 = "titulo2";
jsonArg2.value3 = 3.1415;
jsonArg1.tutulo3 = "titulo3";


var pluginArrayArg = new Array();
pluginArrayArg.push(jsonArg1);
pluginArrayArg.push(jsonArg2);

///to convert pluginArrayArg (which is pure javascript array) into JSON array:

var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))*/
return pluginArrayArg ;
///////////////////////////////////////////////////////////////////acaaba la extraccion de data modulada
}
		///////////acaaba el formateo de una hora 
		function dataproviderformater(dataprovider) {
       var DATOS = new Array();
	   var cont=0;	
     var p=0;
			
	   
	   dataprovider[0].Values.Values.forEach(element => {
           var obj = new Object();
		   obj.date= Modelfecha(element.Time);	   
	       obj.value= Modelvalor(dataprovider[1].Values.Values[cont].Value);//valor de referencia de compra
		   obj.valueline=Modelvalor(element.Value);//valor de referencia precio tag
		   obj.fromValue2=Modelvalor(element.Value);///reference a valueline
	       obj.toValue2=Modelvalor(dataprovider[1].Values.Values[cont].Value);//reference a value
		   obj.fromValue=Modelvalor(dataprovider[1].Values.Values[cont].Value);//reference a value
		   obj.toValue=0;///se queda asi
	       obj.tituloref=dataprovider[0].TituloTag	;
           obj.titulocom=dataprovider[1].TituloTag	;     
         cont++;
		
		   DATOS.push(obj);
				
			});
			
		
			
			
			
        //  console.log("DATAREALPERFORM:::"+JSON.stringify(DATOS));
		  

			





			return DATOS;

		}



		function Modelfecha(tiempounit){
		  var D = "";
		  var M = "";
		  var A = "";
		  var mesIgregoriano = "";
		  var fechaparset = "";

		  var feFcha = tiempounit;
		  var feFechaFormater = feFcha.split(',');
		  var fechaparseada = feFechaFormater[0].split(' ');
		  var fechapurificada = fechaparseada[0].split('/');

		  D = fechapurificada[0];
		  M = fechapurificada[1];
		  A = fechapurificada[2];

		  if (M == "01"|| M == "1") { mesIgregoriano = "jan"; }
		  if (M == "02"|| M == "2") { mesIgregoriano = "feb"; }
		  if (M == "03"|| M == "3") { mesIgregoriano = "mar"; }
		  if (M == "04"|| M == "4") { mesIgregoriano = "apr"; }
		  if (M == "05"|| M == "5") { mesIgregoriano = "may"; }
		  if (M == "06"|| M == "6") { mesIgregoriano = "jun"; }
		  if (M == "07"|| M == "7") { mesIgregoriano = "jul"; }
		  if (M == "08"|| M == "8") { mesIgregoriano = "ago"; }
		  if (M == "09"|| M == "9") { mesIgregoriano = "sep"; }
		  if (M == "10") { mesIgregoriano = "oct"; }
		  if (M == "11") { mesIgregoriano = "nov"; }
		  if (M == "12") { mesIgregoriano = "dec"; }


		  fechaparset = mesIgregoriano + " " + D + " " + A+" "+"0"+fechaparseada[1] ;

			//console.log("valorextens::"+fechaparset);
			return fechaparset;

		}

		function Modelvalor(val){
			var valor;
			var valparcial=val.split(',');
			if(valparcial.length==1){ valor=valparcial[0]}
			else{valor=valparcial[0]+"."+valparcial[1]; 
			var V=parseFloat(valor);
		}


		return V;
		}


		///funcion para definir los datos al formateo adecuado a la recepcion del amchart
      function ajustetimevalueprovider(valunit,tiempounit){
		
        var array=new Array();
		var valparcial=valunit.split(',');////algoritmo de quitar ./, o ,/.
                
                var valor;

if(valparcial.length==1){ valor=valparcial[0]}else{valor=valparcial[0]+valparcial[1];}
	 







          // console.log(valor);    
         
		  var D = "";
		  var M = "";
		  var A = "";
		  var mesIgregoriano = "";
		  var fechaparset = "";

		  var feFcha = tiempounit;
		  var feFechaFormater = feFcha.split(',');
		  var fechaparseada = feFechaFormater[0].split(' ');
		  var fechapurificada = fechaparseada[0].split('/');

		  D = fechapurificada[0];
		  M = fechapurificada[1];
		  A = fechapurificada[2];

		  /////empieza a fecha gregoriano


		  if (M == "01"||M == "1") { mesIgregoriano = "jan"; }
		  if (M == "02"||M == "2") { mesIgregoriano = "feb"; }
		  if (M == "03"||M == "3") { mesIgregoriano = "mar"; }
		  if (M == "04"||M == "4") { mesIgregoriano = "apr"; }
		  if (M == "05"||M == "5") { mesIgregoriano = "may"; }
		  if (M == "06"||M == "6") { mesIgregoriano = "jun"; }
		  if (M == "07"||M == "7") { mesIgregoriano = "jul"; }
		  if (M == "08"||M == "8") { mesIgregoriano = "ago"; }
		  if (M == "09"||M == "9") { mesIgregoriano = "sep"; }
		  if (M == "10") { mesIgregoriano = "oct"; }
		  if (M == "11") { mesIgregoriano = "nov"; }
		  if (M == "12") { mesIgregoriano = "dic"; }

		  fechaparset = mesIgregoriano + " " + D + " " + A+" "+fechaparseada[1] ;
		  array.push(fechaparset);
		  array.push(valor);

          ///console.log(array);
return fechaparset;
	  }






		//////////////////7













		///////////////////////////////////////////////

		//fin de visualizacion chart */
		//************************************
		// Function that returns an array of titles
		//************************************
		/*function createArrayOfChartTitles() {
			var titleText = "";
			if (scope.config.Units) {
				titleText = ("Trend of" + scope.config.Label + " (" + scope.config.Units + ")");
			} else {
				titleText = ("Trend of" + scope.config.Label);
			}
			// Build the titles array
			var titlesArray = [
				{
					"text": titleText,
					"size": scope.config.fontSize + 3,
					"bold": false
				}
			];
			return titlesArray;
		}*/

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
		// Functions for exporting data
		//************************************
		// Courtesy of http://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
		function createCSVFileContents() {
			var result, ctr, keys, columnDelimiter, lineDelimiter;
			// Verify that a valid array object was passed in
			if (dataArray == null || !dataArray.length) {
				return null;
			}
			// Specify delimeters that will be used to create the CSV
			columnDelimiter = ',';
			lineDelimiter = '\n';
			// Take the keys from the input array
			keys = Object.keys(dataArray[0]);
			// Add the data items on the trend
			result = '';
			result += "Export from PI Vision" + lineDelimiter;
			result += scope.config.Label + " (" + scope.config.Units + ")" + lineDelimiter;
			// Add the first headers row to the output file
			result += keys.join(columnDelimiter);
			result += lineDelimiter;
			// Loop through all of the items in the input object and add it to the CSV
			dataArray.forEach(function (item) {
				ctr = 0;
				keys.forEach(function (key) {
					if (ctr > 0) result += columnDelimiter;
					result += item[key];
					ctr++;
				});
				result += lineDelimiter;
			});
			return result;
		}
		// Actually start the download
		function downloadCSV(filename, csv) {
			var linkElement;
			// Encode the data in the right file format
			if (csv == null) return;
			if (!csv.match(/^data:text\/csv/i)) {
				csv = 'data:text/csv;charset=utf-8,' + csv;
			}
			// Create a link element to allow the file to be downloaded
			linkElement = document.createElement('a');
			symbolContainerDiv.appendChild(linkElement);
			linkElement.setAttribute('href', encodeURI(csv));
			linkElement.setAttribute('download', filename);
			// Click the link!  Then delete the element
			linkElement.click();
			symbolContainerDiv.removeChild(linkElement);
		}

		//************************************
		// Function that is called when custom configuration changes are made
		//************************************
			// function myCustomConfigurationChangeFunction(data) {
			// 	// If the visualization exists...
			// 	if(customVisualizationObject) {
			// 		// Turn on column display (instead of line display, if specified)
			// 		if (scope.config.useColumns) {
			// 			customVisualizationObject.graphs[0].type = "column";
			// 		} else {
			// 			customVisualizationObject.graphs[0].type = "line";
			// 		}
			// 		// Apply fixed scaling, if turned on
			// 		if (scope.config.useCustomYAxisRange) {
			// 			customVisualizationObject.valueAxes[0].minimum = scope.config.minimumYValue;
			// 			customVisualizationObject.valueAxes[0].maximum = scope.config.maximumYValue;
			// 		} else {
			// 			customVisualizationObject.valueAxes[0].minimum = autoScaleMinimumValue;
			// 			customVisualizationObject.valueAxes[0].maximum = autoScaleMaximumValue;
			// 		}				
			// 		// Update the title
			// 	if (scope.config.showTitle) {
			// 			customVisualizationObject.titles = createArrayOfChartTitles();
			// 		} else {
			// 			customVisualizationObject.titles = null;
			// 		}
			// 		// Update colors and fonts
			// 		if (customVisualizationObject.graphs[0].lineColor != scope.config.seriesColor) {
			// 			customVisualizationObject.graphs[0].lineColor = scope.config.seriesColor;
			// 		}
			// 		if (customVisualizationObject.color != scope.config.textColor) {
			// 			customVisualizationObject.color = scope.config.textColor;
			// 		}
			// 		if (customVisualizationObject.backgroundColor != scope.config.backgroundColor) {
			// 			customVisualizationObject.backgroundColor = scope.config.backgroundColor;
			// 		}
			// 		if (customVisualizationObject.plotAreaFillColors != scope.config.plotAreaFillColor) {
			// 			customVisualizationObject.plotAreaFillColors = scope.config.plotAreaFillColor;
			// 		}
			// 		if (customVisualizationObject.fontSize != scope.config.fontSize) {
			// 			customVisualizationObject.fontSize = scope.config.fontSize;
			// 		}
			// 		// Check whether you should prepare data for export
			// 		if (scope.config.exportData) {
			// 			// Reset the button back to unchecked, when complete
			// 			scope.config.exportData = false;
			// 			downloadCSV('ExportFromPIVision.csv', createCSVFileContents());
			// 		}
			// 		// Check whether you should prepare the paths for export
			// 		if (scope.config.exportDataItemPaths) {
			// 			// Reset the button back to unchecked, when complete
			// 			scope.config.exportDataItemPaths = false;
			// 			downloadCSV('ExportFromPIPIVision_DataItemPaths.csv', dataItemPaths.toString());
			// 		}
			// 		// Update the scroll bar
			// 		if (customVisualizationObject.chartScrollbar.enabled != scope.config.showChartScrollBar) {
			// 			customVisualizationObject.chartScrollbar.enabled = scope.config.showChartScrollBar;
			// 		}
			// 		// Commit updates to the chart
			// 		customVisualizationObject.validateNow();
			// 		console.log("Configuration updated.");
			// 	}
			// }



		function myCustomConfigurationChangeFunction(data) {
		 
			if (chart) {
				// Apply new settings
				//chart.sortColumns = scope.config.sortItemsByValue;
			
             chart.titles[0].text=scope.config.TitleText;
             chart.titles[0].size=scope.config.fontSize;
            

				chart.color = scope.config.textColor;
				chart.backgroundColor = scope.config.backgroundColor;
				chart.graphs[3].lineColor=scope.config.plotAreaFillColor;
				chart.graphs[5].lineColor=scope.config.backgroundColor;
                chart.graphs[0].lineColor=scope.config.seriesColor1;
				chart.graphs[1].bulletColor=scope.config.bullet;
				chart.graphs[1].lineColor=scope.config.seriesColor2;


				if (scope.config.showTitle) {
					chart.titles[0].text = scope.config.TitleText;
				} else {
					chart.titles[0].text = "";
				}

				 // Draw the chart again
				//  chart.validateNow();
			}
		}

		// Specify which function to call when a data update or configuration change occurs 
		//return { dataUpdate: myCustomDataUpdateFunction, configChange:myCustomConfigurationChangeFunction };
	}
	// Register this custom symbol definition with PI Vision
	CS.symbolCatalog.register(myCustomSymbolDefinition);

})(window.PIVisualization);