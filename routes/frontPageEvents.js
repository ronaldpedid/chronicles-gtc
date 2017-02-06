/**
 * Created by ronal on 1/22/2017.
 */
function frontPageEvents(){
    return function frontPageEvents(res,req,next){
        req.events.findOne(function(err, record){
            var event = record;
            var number = Math.floor(Math.random() * event.length);
            res.locals.frontPageEvents = event[number];
            next()
        });
    };
}

module.exports = frontPageEvents;