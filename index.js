(function () {
    "use strict";
    var _ = require("lodash"),
        Async = require("async"),
        Hapi = require("hapi"),
        Good = require("good"),
        moment = require("moment"),
        /*
         * Configuration files
         * */
        serverConf = require("./config/server/server-config"),

        /*
         * Server Instance
         * */
        server = new Hapi.Server(),

        /**
         * Thinky instance
         */
        Thinky = serverConf.thinky,


        /*
        * Model instances
        * */

        EventsModel = require("./models/EventsModel")(Thinky, moment);


    /**
     * Server conf
     * */
    server.connection(serverConf.hapi);






    /**
     * Start server
     */
    server.register({
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    }, function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    });

}());