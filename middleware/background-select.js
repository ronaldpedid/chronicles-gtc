/**
 * Created by ronal on 1/8/2017.
 */
function backgroundSelectMiddleware(){
    return function backgroundSelectMiddleware(req,res,next){
        req.cgtc.findOne(function(err,record){
            var images = record.logoImages;
            var number = Math.floor( Math.random() * images.length);
            res.locals.backgroundPath = images[number];
            res.locals.title='Chronicles: GTC';
            next()
        });
    };
}

module.exports = backgroundSelectMiddleware;