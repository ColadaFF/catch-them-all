/**
 * Created by barcode on 31/10/15.
 */
(function (module) {
    "use strict";
    var endpoint = "/api/criminals",
        Criminals = require("../Handlers/CriminalsHandler");
    module.exports = [
        {
            "method": "GET",
            "path": endpoint,
            "handler": Criminals.getAll
        },
        {
            "method": "GET",
            "path": endpoint + "/{id}",
            "handler": Criminals.getCriminal
        },
        {
            "method": "POST",
            "path": endpoint,
            "handler": Criminals.saveCriminal
        },
        {
            method: "PUT",
            path: endpoint + "/generate",
            handler: Criminals.generateCriminals
        },
        {
            method: "GET",
            path: endpoint + "/search",
            handler: Criminals.searchCriminal
        },
        {
            method: 'PUT',
            path: endpoint + '/{id}',
            handler: Criminals.updateCriminal
        }
    ];
}(module));
