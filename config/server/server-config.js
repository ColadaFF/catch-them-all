/**
 * Created by cs2kn on 17/10/2015.
 */
(function () {
    "use strict";
    var Thinky = require("thinky"),
        rethinkDBConfig = {
            "host": "rethinkdb",
            "port": 28015,
            "authKey": "",
            "db": "cta"
        },
        hapi = {
            "port": 3000,
            "host": "localhost",
            "routes": {
                "cors": {
                    origin: ['*']
                }
            }
        },
        thinkyIns = Thinky(rethinkDBConfig);
    module.exports = {
        "hapi": hapi,
        "thinky": thinkyIns
    }
}());