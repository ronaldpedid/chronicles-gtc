// var newEvent = require('../views/index.hbs');
// var mongo-data = require('../model/mongo-data');
//
// exports.get = function(req, res) {
//     mongo_data.eventData("D", function(err, eventData) {
//         if (!err) {
//             var strEventData = "",
//                 i = 0;
//             for (i = 0; i < eventData;) {
//                 strEventData = strEventData + "<li>" + eventData.events[i] + "</li>";
//                 i = i + 1;
//             }
//             strEventData = "<ul>" + strEventData + "</ul>";
//             res.writeHead(200, {
//                 'Content-Type': 'text/html'
//             });
//             res.write(index.hbs("Test web page on node.js", "Hello there", "<p>" " + eventData.events + " </p>" + strEventData));
//             res.end();
//         } else {
//             res.writeHead(200, {
//                 'Content-Type': 'text/html'
//             });
//             res.write(index.hbs("Oh dear", "Database error", "<p>Error details: " + err + "</p>"));
//             res.end();
//         }
//     });
// };