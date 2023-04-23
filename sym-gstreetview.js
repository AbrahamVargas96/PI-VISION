(function(CS) {
    var definition = {
        typeName: 'gstreetview',
        datasourceBehavior: CS.DatasourceBehaviors.Multiple,
        iconUrl: '../streetview.svg',
        getDefaultConfig: function() {
            return {
                DataShape: 'Table',
                Height: 400,
                Width: 400,
                HeadingName: 'Heading',
                PitchName: 'Pitch',
                ZoomName: 'Zoom',
                LngName: 'Longitude',
                LatName: 'Latitude',
                LatIndex: -1,
                LngIndex: -1,
                HeadingIndex: -1,
                PitchIndex: -1,
                ZoomIndex: -1,
                AddressControl: true,
                ClickToGo: true,
                DisableDefaultUI: false,
                DisableDoubleClickZoom: false,
                ImageDateControl: true,
                PanControl: true,
                ZoomControl: true
            };
        },
        configOptions: function() {
            return [{
                title: 'Format Symbol',
                mode: 'format'
            }];
        },
        init: init
    };



    window.gStreetViewCallback = function() {
        $(window).trigger('gSvLoaded');
    }

    function loadGoogleMaps() {
        if (window.google == undefined) {
            if (window.googleRequested) {
                setTimeout(function() {
                    window.gStreetViewCallback();
                }, 200);

            } else {
                var script_tag = document.createElement('script');
                script_tag.setAttribute("type", "text/javascript");
                script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=gStreetViewCallback");
                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
                window.googleRequested = true;
            }
        } else {
            window.gStreetViewCallback();
        }
    }


    function init(scope, elem) {
        var container = elem.find('#container')[0];
        var id = "gstreetview_" + Math.random().toString(36).substr(2, 16);
        container.id = id;
        scope.id = id;



        scope.currentLatLng = { lat: -23.5626384, lng: -46.6510285 };
        scope.startStreetView = function() {
            if (scope.panorama == undefined) {
                scope.panorama = new google.maps.StreetViewPanorama(document.getElementById(scope.id), {
                    position: scope.currentLatLng,
                    pov: {
                        heading: 0,
                        pitch: 0,
                        zoom: 1
                    }
                });
            }
            scope.updateGoogleStreetViewConfig(scope.config);
        };



        scope.updateGoogleStreetViewConfig = function(config) {
            scope.LatIndex = parseInt(config.LatIndex);
            scope.LngIndex = parseInt(config.LngIndex);
            scope.HeadingIndex = parseInt(config.HeadingIndex);
            scope.PitchIndex = parseInt(config.PitchIndex);
            scope.ZoomIndex = parseInt(config.ZoomIndex);

            if (scope.panorama != undefined) {
                scope.panorama.setOptions({
                    addressControl: config.AddressControl,
                    clickToGo: config.ClickToGo,
                    disableDefaultUI: config.DisableDefaultUI,
                    disableDoubleClickZoom: config.DisableDoubleClickZoom,
                    imageDateControl: config.ImageDateControl,
                    panControl: config.PanControl,
                    zoomControl: config.ZoomControl
                });
            }
        };

        scope.resizeGoogleStreetView = function(width, height) {
            if (scope.panorama != undefined) {
                google.maps.event.trigger(scope.panorama, "resize");
            }
        }



        $(window).bind('gSvLoaded', scope.startStreetView);
        loadGoogleMaps();



        scope.updateIndexes = function(data) {
            var isValid = true;
            scope.config.LatIndex = -1;
            scope.config.LngIndex = -1;
            scope.config.HeadingIndex = -1;
            scope.config.PitchIndex = -1;
            scope.config.ZoomIndex = -1;

            for (var i = 0; i < data.Rows.length; i++) {
                var splitResult = data.Rows[i].Label.split('|');
                if (splitResult[1] == scope.config.LatName) {
                    scope.config.LatIndex = i;
                } else if (splitResult[1] == scope.config.LngName) {
                    scope.config.LngIndex = i;
                } else if (splitResult[1] == scope.config.HeadingName) {
                    scope.config.HeadingIndex = i;
                } else if (splitResult[1] == scope.config.PitchName) {
                    scope.config.PitchIndex = i;
                } else if (splitResult[1] == scope.config.ZoomName) {
                    scope.config.ZoomIndex = i;
                }
            }

            var checkIndex = function(attributeName, indexValue) {
                if (indexValue == -1) {
                    isValid = false;
                    alert(attributeName + ' attribte was not found');
                }
            }

            checkIndex('Latitude', scope.config.LatIndex);
            checkIndex('Longitude', scope.config.LngIndex);
            checkIndex('Zoom', scope.config.ZoomIndex);
            checkIndex('Pitch', scope.config.PitchIndex);
            checkIndex('Heading', scope.config.HeadingIndex);
            return isValid;


        }


        scope.updateDisplay = function(data) {
            var currentPov = {
                heading: parseFloat(data.Rows[scope.config.HeadingIndex].Value),
                pitch: parseFloat(data.Rows[scope.config.PitchIndex].Value),
                zoom: parseFloat(data.Rows[scope.config.ZoomIndex].Value)
            };

            scope.currentLatLng = { lat: parseFloat(data.Rows[scope.config.LatIndex].Value), lng: parseFloat(data.Rows[scope.config.LngIndex].Value) };

            setTimeout(function() {
                scope.panorama.setOptions({
                    position: scope.currentLatLng,
                    pov: currentPov
                });
            }, 3000);

        }

        scope.dataUpdate = function(data) {
            if ((data == null) || (data.Rows.length == 0)) {
                return;
            }

            if (data.Rows[0].Path) {
                scope.updateIndexes(data);
            }

            if (scope.panorama != undefined) {
                scope.updateDisplay(data);
            }
        }

        return { dataUpdate: scope.dataUpdate, resize: scope.resizeGoogleStreetView, configChange: scope.updateGoogleStreetViewConfig };
    }

    CS.symbolCatalog.register(definition);
})(window.Coresight);