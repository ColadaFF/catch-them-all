/**
 * Created by barcode on 30/10/15.
 */
(function() {
    "use strict";
    module.exports = function(thinky){
        var type = thinky.type,
            criminalsModel = thinky.createModel("Criminals", {
                "idNumber": type.number(),
                "name": type.string(),
                "lastName": type.string(),
                "alias": type.string(),
                "picture": type.string(),
                "profile": type.object().schema({
                    "kindStrikes": type.array().schema([
                        type.string()
                    ])
                }),
                "attributes": type.object().schema({
                    "skinColor": type.string(),
                    "eyes": type.string(),
                    "hair": type.string(),
                    "physicalAppearance": type.string(),
                    "kindDress": type.string()
                }),
                classification: type.number()
            }, {
                pk: "idNumber"
            });
        return criminalsModel;
    };

}());
