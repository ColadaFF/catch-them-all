(function() {
    "use strict";
    var names = require('./names.json'),
        lastNames = require('./lastnames.json'),
        alias = require('./alias.json'),
        pictures = require('./pictures.json'),
        kindStrikes = ["Robo", "Homicidio", "Estafa", "Agresión", "Violación", "Vandalismo", "Terrorismo"],
        skinColor = ["Blanco", "Negro", "Moreno", "Mono", "Trigueño"],
        eyes = ["Azules", "Negros", "Zarcos", "Verdes", "Cafes"],
        hair = ["Castaño", "Negro", "Rubio", "Rojo"],
        physicalAppearance = ["alto", "bajo", "normal"],
        kindDress = ["Gamin", "Empresario", "casual"],
        _ = require('lodash'),
        index = -1,
        criminals = _.map(alias, function criminalsGen(t) {
            return _.assign({}, {
                name: _.reduce(_.sample(names, _.sample([1, 2])), function(total, name){
                    return total + " " + name;
                }),
                lastNames: _.reduce(_.sample(lastNames, 2), function(total, name){
                    return total + " " + name;
                }),
                alias: t,
                picture: pictures[++index],
                kindStrikes: _.sample(kindStrikes, _.sample([1, 2, 3, 4, 5])),
                skinColor: _.sample(skinColor),
                eyes: _.sample(eyes),
                hair: _.sample(hair),
                physicalAppearance: _.sample(physicalAppearance),
                kindDress: _.sample(kindDress, _.sample([1, 2]))
            });
        });

    exports.criminals = criminals;
}());
