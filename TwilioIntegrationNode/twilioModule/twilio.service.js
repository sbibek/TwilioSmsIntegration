var twilio = require('twilio');
var twilioSendSms = function (accountSid, authToken, message, from, to) {
    const client = twilio(accountSid, authToken);
    return client.messages.create({
        body: message,
        from: from,
        to: to
    });
}

// export the service functionalities
module.exports = {
    twilioSendSms: twilioSendSms
}