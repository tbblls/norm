/**
 * Created by Adam on 5/26/2015.
 */

var request    = require('ajax-request'),
    xpath      = require('xpath'),
    dom        = require('xmldom').DOMParser;

    var processMathMessage = function (intent) {

        console.log(intent.entities);

        var expression = intent.entities.math_expression[0].value;
        var wolframUrl = "http://api.wolframalpha.com/v2/query?input=" + encodeURIComponent(expression) +
            "&appid=" + process.env.wolframKey +
             "&format=image,plaintext";


        request(wolframUrl, function(err, res, body){

            var doc = new dom().parseFromString(body);

            var val = xpath.select("//pod[@title='Result']/subpod[@title='']/plaintext/text()", doc).toString();


        });




        return {
            error: "",
            data: {
                message: "Do math callout to wolframalpha and return message and result",
                result: 7
            }
        };


    };



    module.exports.processMathMessage = processMathMessage;
