// var mongo = require('mongodb'), //require mongo db
//     Server = mongo.Server, //using out local mongo server
//     Db = mongo.Db; //var Db is accessing out mongo databased
// var server = new Server('localhost', 27017, { //new server at host on port 27017
//     auto_reconnect: true // if fails try auto reconnect
// });
// var db = new Db('events', server);
// var onErr = function(err, callback) {
//     db.close();
//     callback(err);
// };
// exports.eventList = function(npost, callback) {
//     db.open(function(err, db) {
//         if (!err) {
//             db.eventData('eventList', function(err, eventData) {  //eventData is a collection 
//                 if (!err) {
//                     eventData.find({  
//                         'eventList': npost
//                     }).toArray(function(err, docs) {
//                         if (!err) {
//                             db.close();
//                             var intCount = docs.length;
//                             if (intCount > 0) {
//                                 var strJson = "";
//                                 for (var i = 0; i < intCount;) {
//                                     strJson += '{"eventCount":"' + docs[i].eventCount + '"}'
//                                     i = i + 1;
//                                     if (i < intCount) {
//                                         strJson += ',';
//                                     }
//                                 }
//                                 strJson = '{"eventList":"' + npost + '","eventCount":' + intCount + ',"games":[' + strJson + "]}"
//                                 callback("", JSON.parse(strJson));
//                             }
//                         } else {
//                             onErr(err, callback);
//                         }
//                     }); //end collection.find
//                 } else {
//                     onErr(err, callback);
//                 }
//             }); //end db.collection
//         } else {
//             onErr(err, callback);
//         }
//     }); // end db.open
// };