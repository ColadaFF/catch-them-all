/**
 * Created by barcode on 31/10/15.
 */
(function() {
    "use strict";
    var _ = require("lodash"),
        request = require("request"),
        solrCriminals = require('../index/criminals');
    exports.sayHi = function(request, response) {
        var Criminals = this.Criminals;
        response({
            "message": "Hi there!"
        });
    };


    function updateCriminal(request, response) {
        var Criminal = this.Criminals,
            Thinky = this.Thinky,
            Query = Thinky.Query,
            r = Thinky.r,
            criminalQuery = new Query(Criminal, r);
        console.log(request.payload);
        Criminal
            .get(request.params.id)
            .update(request.payload.criminal)
            .run()
            .then(function(data) {
                response({
                    "data": data
                });
            })
            .error(function(reason) {
                response({
                    "Message": "There was an error querying the Criminals table",
                    "Error": reason
                })
            });
    }

    function generateCriminals(request, response) {
        var Criminal = this.Criminals,
            criminalsAPI = require('../generators/criminals'),
            criminals = criminalsAPI.criminals;
        console.log(criminals);
        Criminal
            .save(criminals)
            .then(function(data) {
                process.nextTick(function() {
                    solrCriminals.index(data);
                });
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

    function searchCriminal(request, response) {
        solrCriminals.search(request.query.q, function(err, res) {
            response({
                "data": _.get(res, 'response.docs', [])
            });
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
        Criminal
            .save(request.body.criminal)
            .then(function(data) {
                process.nextTick(function() {
                    solrCriminals.index(data);
                });
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
    exports.searchCriminal = searchCriminal;
    exports.updateCriminal = updateCriminal;
}());
