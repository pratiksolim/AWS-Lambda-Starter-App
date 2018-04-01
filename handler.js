'use strict';
var AWS = require('aws-sdk');
var ses = new AWS.SES();
var fs = require('fs');

module.exports.sendDailyMail = (event, context, callback) => {

    var emailHtml = fs.readFileSync('./dailyMessage.html', 'utf-8');

    var toAndFromAdress = 'pratik.solim@gmail.com';
    var params = {
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Here's your wishes!!"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Good Morning"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress,
    };

    ses.sendEmail(params, function(err, data) {
        // an error occurred
        if (err) console.log(err, err.stack);
        // successful response
        else callback(null, data);
    });

};
