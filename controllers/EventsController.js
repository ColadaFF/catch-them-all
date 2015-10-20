/**
 * Created by cs2kn on 17/10/2015.
 */
(function (module) {
    module.exports = function (server, EventsModel) {
        server.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, reply) {
                reply('hello world');
            }
        });
        return server;
    };
}(module));