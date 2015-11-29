(function() {
    "use strict";

    let solr = require('solr-client'),
        solrClient = solr.createClient({
            host: "solr",
            port: 8983,
            core: "criminals",
            path: "/solr"
        }),
        _ = require('lodash');

    function indexCriminal(criminal) {
        solrClient.add(criminal, function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log('Solr response:', obj);
                commitSolr();
            }
        });
    }

    function searchCriminal(query, callback) {
        var arrayQuery = query.split(" "),
            queryToSend = solrClient.createQuery()
            .q(arrayQuery)
            .edismax()
            .qf({
                "alias": 2.5,
                "name": 2.5,
                "eyes": 2,
                "hair": 1,
                "kindDress": 1,
                "kindStrikes": 1.5,
                "lastNames": 2.5,
                "physicalAppearance": 1,
                "skinColor": 1
            })
            .qop("or");
        solrClient.search(queryToSend, callback);
    }

    function commitSolr() {
        solrClient.commit(function(err, res) {
            if (err) {
                console.log(err);
            }
            if (res) {
                console.log(res);
            }
        });
    }

    exports.index = indexCriminal;
    exports.search = searchCriminal;

}());
