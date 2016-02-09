/**
 * Created by Adam on 5/27/2015.
 */


var processPublish = function(intent) {

    console.log(intent.entities);

   // var expression = intent.entities.publish_expression.value;



    return {
        error: "",
        data: {
            message: "Do publish and return message",
            result: "Publish successful"
        }
    };


};

module.exports.processPublish = processPublish;