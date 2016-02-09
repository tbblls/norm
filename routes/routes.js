/**
 * Created by Adam on 5/18/2015.
 */
module.exports = function(express, app, wit, config, norm){
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

    router.get('/test', function(req, res, next){
        res.render('test', {title:'Norm'})
    });

   /* router.post('/norm/api/message', function(req, response){
        var message = req.body.message;
        console.log(message);
        var result =  function (err, res) {
         console.log("Response from Wit for text input: ");
         if (err) {
         console.log("Error: ", err);
         }else{
         var returnMsg = JSON.stringify(res, null, " ");
         console.log(returnMsg);
             response.header("Access-Control-Allow-Origin", "*");
             response.status(200).json(returnMsg);
            // return response.json({'data':'some content'});
             response.end();
         }
         };

         wit.captureTextIntent(config.witAccessToken, message, result);

       // return res.send({'data':'test'});
       //  return res.send('test');
    });*/

    router.route('/norm/api/message')
        .post(function(request, response) {
           var message = request.body.message;

           var result =  function (err, res) {
                if (err) {
                    console.log("Error: ", err);
                }else{

                    var result = norm.processMessage(res);
                    console.log(result);

                    response.status(200).json(result);
                    response.end();
                }
            };

           wit.captureTextIntent(config.witAccessToken, message, result);
        });


    app.use('/', router);

}