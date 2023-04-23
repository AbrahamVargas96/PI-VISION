(function (CS) {
    var definition = {
        typeName: 'gmapspartone',
        datasourceBehavior: CS.DatasourceBehaviors.Multiple,
        getDefaultConfig: function () {
            return {
                DataShape: 'Table',
                Height: 400,
                Width: 400             
            };
        },       
        init: init
    };



    window.gMapsCallback = function () {
        $(window).trigger('gMapsLoaded');
    }

    function loadGoogleMaps() {
        if (window.google == undefined) {
            if (window.googleRequested) {
                setTimeout(function () {
                    window.gMapsCallback();
                }, 3000);

            }
            else {
                var script_tag = document.createElement('script');
                script_tag.setAttribute("type", "text/javascript");
                script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
                window.googleRequested = true;
            }
        }
        else {
            window.gMapsCallback();
        }
    }



    function init(scope, elem) {
        var container = elem.find('#container')[0];
        var id = "gmaps_" + Math.random().toString(36).substr(2, 16);
        container.id = id;
        scope.id = id;


        scope.startGoogleMaps = function () {
            if (scope.map == undefined) {
                scope.map = new window.google.maps.Map(document.getElementById(scope.id), {
                    center: { lat: 0, lng: 0 },
                    zoom: 1
                });
            }
            scope.updateGoogleMapsConfig(scope.config);
        };


        scope.updateGoogleMapsConfig = function (config) {

        };

        scope.resizeGoogleMaps = function (width, height) {

        }

        scope.dataUpdate = function (data) {

        }

        $(window).bind('gMapsLoaded', scope.startGoogleMaps);
        loadGoogleMaps();

        return { dataUpdate: scope.dataUpdate, resize: scope.resizeGoogleMaps, configChange: scope.updateGoogleMapsConfig };
    }

    CS.symbolCatalog.register(definition);
})(window.Coresight);