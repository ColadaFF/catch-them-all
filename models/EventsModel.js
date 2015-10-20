/**
 * Created by cs2kn on 17/10/2015.
 */
(function () {
    "use strict";
    module.exports = function (thinky, moment) {
        var type = thinky.type,
            eventsModel = thinky.createModel("Events", {
                "id": type.string(),
                "Location": type.object().schema({
                    "lat": type.number(),
                    "long": type.number()
                }),
                "type": type.string(),
                "criminal": type.array().schema([
                    type.string()
                ]),
                "reportedAt": type.date().default(moment())
            });
        return eventsModel;
    };
}());