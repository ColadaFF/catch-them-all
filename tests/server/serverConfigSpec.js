/**
 * Created by cs2kn on 17/10/2015.
 */
(function(){
    "use strict";
    var customServerMatchers = require("../customMatcher");
    describe("RethinkDB connection", function() {
        beforeEach(function() {
            jasmine.addMatchers(customServerMatchers);
        });


        it("contains a test to check rethinkDB connection", function() {
            /*
            * @TODO test
            * */
        });
    });
}());