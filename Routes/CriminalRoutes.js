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
        }
    ];
}(module));