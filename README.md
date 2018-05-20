# Twilio Integration project
This project demonstrates integration of Twilio two way sms using
Anuglar 6 with angular-cli@6.0.1 as frontend
NodeJS@10.1.0 as backend
Sqlite3 as file based db

Angular6 codebase TwilioSmsIntegration/TwilioIntegration
NodJS codebase TwilioSmsIntegration/TwilioIntegrationNode

## Get started
Install Node, NPM @latest
Install angular-cli@6.0.1

cd TwilioSmsIntegration/TwilioIntegration
npm install
// now build the project which will create a public folder in Node folder of the project
ng build --prod 

cd TwilioSmsIntegration/TwilioIntegrationNode
npm install

// now finally run the server, defaut port 9090
node index.js

Now you can reach localhost:9090 and access the project.
You can send sms with your own twilio keys, but to receive the sms  you need to set up two way sms in your twilio account and point the webhook url for incoming sms in twilio to 
http://ip_where_this_project_is_hosted:port/incoming (Method POST)

Important: Make sure that your IP is publicly accessible.

## links for configuring the inbound message in twilio
https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply

## article in twilio regarding two way sms (receive)
Step 4: Receive incoming messages
1. Let’s set up two-way messaging  so you can receive the responses from your users in your software, in this example survey responses.
2. For two-way messaging, you’ll need your code to be deployed to a server that’s publicly accessible from the internet, so we can send calls to it, known as webhooks

3. To handle a webhook you need a web application that can accept the HTTP requests. If you already have a web application set up, handling a webhook is usually as easy as adding a new URL to your application. If you don't already have a web application, almost all server-side programming languages offer frameworks to help you build one.

4. When a text message is received by your Twilio number, Twilio makes an HTTP request to the message URL configured for that number. In your response to that request, you can tell Twilio what to do in response to the SMS using Twilio’s XML like markup language, TwiML  or just acknowledge receipt.
5. An alternative to deploying code to a server during development is to serve that code from your local development environment. You can do this by tunneling to your local machine using ngrok. ngrok is a really easy way to use your local dev environment and it provides a publicly accessible URL.  Download the free package and use that address to respond to Twilio webhook requests.

