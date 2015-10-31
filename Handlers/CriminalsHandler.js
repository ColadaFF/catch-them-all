/**
 * Created by barcode on 31/10/15.
 */
(function () {
    "use strict";
    var _ = require("lodash");
    exports.sayHi = function (request, response) {
        var Criminals = this.Criminals;
        response({
            "message": "Hi there!"
        });
    };


    function getCriminals(request, response) {
        var Criminals = this.Criminals;
        Criminals
            .count()
            .run()
            .then(function (data) {
                response({
                    "data": data
                });
            })
            .error(function (reason) {
                if (_.isEmpty(reason)) {
                    response({
                        "data": []
                    }).code(404);
                } else {
                    response({
                        "Message": "There was an error querying the Criminals table",
                        "Error": reason
                    })
                }
            });
    }

    exports.getAll = getCriminals;

}());