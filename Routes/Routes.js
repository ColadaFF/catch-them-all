/**
 * Created by barcode on 31/10/15.
 */
(function (module) {
    "use strict";
    var _ = require("lodash"),
        criminalRoutes = require("./CriminalRoutes"),
        routes = [];


    _.forEach([criminalRoutes], function (routesCollection) {
        _.forEach(routesCollection, function (route) {
            routes.push(route);
        });
    });

    module.exports = routes;
}(module));