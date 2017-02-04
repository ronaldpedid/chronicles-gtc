/**
 * Created by ronal on 1/4/2017.
 */

var mongojs = require('mongojs');


function mongoMiddleware(options) {
    options = options || {}
    var connectionString = options.connectionString || "cgtc";
    var db = mongojs(connectionString);
    return function mongoMiddleware(req, res, next) {
        req.db = db;
        req.cgtc = db.collection("cgtc");
        next();
    };
}

module.exports = mongoMiddleware;
