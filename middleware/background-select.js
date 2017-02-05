/**
 * Created by ronal on 1/8/2017.
 */
function backgroundSelectMiddleware(){
    return function backgroundSelectMiddleware(req,res,next){
        function writeImages(record) {
            var images = record.logoImages;
            var number = Math.floor( Math.random() * images.length);
            res.locals.backgroundPath = images[number];
            res.locals.title='Chronicles: GTC';
        }

        req.cgtc.findOne(function(err,record){
            if (record) {
                writeImages(record);
                next()
            } else {
                req.cgtc.insert({
                    logoImages: [
                        'images/carousel-1.jpg',
                        'images/carousel-2.jpg',
                        'images/carousel-3.jpg'
                    ]
                }, function (err) {
                    if (err) {
                        throw err;
                    }
                    req.cgtc.findOne(function (err, record) {
                        if (err) {
                            throw err;
                        }
                        writeImages(record);
                        next();
                    });
                })
            }
        });
    };
}

module.exports = backgroundSelectMiddleware;