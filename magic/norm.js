/**
 * Created by Adam on 5/19/2015.
 */


    var math = require('./lib/math.js');
    var publish = require('./lib/publish.js');

    var processMessage = function (msg) {


        var intents = [];
        var returnMsgs = [];


        for (var i = 0; i < msg.outcomes.length; i++) {
            intents.push(msg.outcomes[i]);
            switch (msg.outcomes[i].intent) {
                case "publish":
                    var result = publish.processPublish(msg.outcomes[i]);
                    returnMsgs.push(result.data.message);
                    break;
                case "ask_math":
                    var result = math.processMathMessage(msg.outcomes[i]);
                    returnMsgs.push(result.data.message);
                    break;
                default:
                    returnMsgs.push("I've got a lot to learn!");
                    break;

            }
        }
        return {result: returnMsgs};


        return promise;

    };

    module.exports.processMessage = processMessage;
