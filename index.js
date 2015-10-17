(function () {
    "use strict";
    var _ = require("lodash"),
        Async = require("async"),
        Hapi = require("hapi"),

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

        EventsModel = require("./models/EventsModel")(Thinky);


    /**
     * Server conf
     * */
    server.connection(serverConf.hapi);






    /**
     * Start server
     */
    server.start(function () {
        console.log("Server running at:", server.info.uri);
    });




}());