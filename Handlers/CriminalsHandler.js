/**
 * Created by barcode on 31/10/15.
 */
(function() {
    "use strict";
    var _ = require("lodash"),
        request = require("request");
    exports.sayHi = function(request, response) {
        var Criminals = this.Criminals;
        response({
            "message": "Hi there!"
        });
    };


    function generateCriminals(request, response) {
        var Criminal = this.Criminals,
            criminalsAPI = require('../generators/criminals'),
            criminals = criminalsAPI.criminals;
            console.log(criminals);
        Criminal
            .save(criminals)
            .then(function(data) {
                response({
                    "data": data
                });
            })
            .error(function(reason) {
                if (_.isEmpty(reason)) {
                    response({
                        "data": []
                    }).code(200);
                } else {
                    response({
                        "Message": "There was an error querying the Criminals table",
                        "Error": reason
                    })
                }
            });
    }


    function getCriminals(request, response) {
        var Criminals = this.Criminals,
            Thinky = this.Thinky,
            Query = Thinky.Query,
            r = Thinky.r;
        r
            .table("Criminals")
            .run()
            .then(function(data) {
                response({
                    "data": data
                });
            })
            .error(function(reason) {
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

    function getCriminal(request, response) {
        var Criminal = this.Criminals,
            Thinky = this.Thinky,
            Query = Thinky.Query,
            r = Thinky.r,
            criminalQuery = new Query(Criminal, r);
        Criminal
            .filter({
                "idNumber": parseInt(request.params.id)
            })
            .run()
            .then(function(data) {
                response({
                    "data": data
                });
            })
            .error(function(reason) {
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

    function saveCriminal(request, response) {
        var Criminal = this.Criminals;
        getCriminalsAPI(Criminal, function(data) {
            response({
                "data": data
            });
        });
    }

    function deleteCriminal(request, response) {
        var Criminal = this.Criminals;
    }


    function getCriminalsAPI(Criminal, callback) {

        request('http://api.randomuser.me/?results=2000&gender=male', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body).results);
                var users = _.map(JSON.parse(body).results, function(user) {
                    console.log(user);
                    return _.assign({}, {
                        "name": user.user.name.first,
                        "lastname": user.user.name.last,
                        "idNumber": user.user.registered,
                        "alias": user.user.password,
                        "picture": user.user.picture.medium
                    });
                });
                console.log(users[0]);
                Criminal
                    .save(users)
                    .then(callback)
                    .error(function(reason) {
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
                    })
            }
        });
    }

    exports.getAll = getCriminals;
    exports.saveCriminal = saveCriminal;
    exports.getCriminal = getCriminal;
    exports.deleteCriminal = deleteCriminal;
    exports.generateCriminals = generateCriminals;
}());
