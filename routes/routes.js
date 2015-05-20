/**
 * Created by Adam on 5/18/2015.
 */
module.exports = function(express, app, wit, config){
    var router = express.Router();

    router.use(function(req, res, next) {
        // do logging
        console.log('NORM.');
        next(); // make sure we go to the next routes and don't stop here
    });

   /* router.get('/', function(req, res) {
        res.json({ message: 'NORM api!' });
    });*/

    router.get('/', function(req, res, next){
        res.render('index', {title:'Norm'})
    });

    router.route('/norm/api/message')

        //post a message to NORM (accessed at POST http://localhost:8080/api/message)
        .post(function(req, res) {

            var response = res;

            var message = req.body.message;
            console.log(message);

            wit.captureTextIntent(config.witAccessToken, message, function (err, res) {
                console.log("Response from Wit for text input: ");
                if (err) console.log("Error: ", err);
                console.log(JSON.stringify(res, null, " "));
                var returnMsg = JSON.stringify(res, null, " ");
                response.json(returnMsg);

            });




        });


    app.use('/', router);

}