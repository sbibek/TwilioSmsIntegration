# Twilio Integration project for lez
Uses.
Anuglar 6 with angular-cli@6.0.1
NodeJS@10.1.0

## sms inbound demo url
http://176.56.238.208:9090/incoming

## links for configuring the inbound message in twilio
https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply

## article in twilio regarding two way sms (receive)
Step 4: Receive incoming messages
1. Let’s set up two-way messaging  so you can receive the responses from your users in your software, in this example survey responses.
2. For two-way messaging, you’ll need your code to be deployed to a server that’s publicly accessible from the internet, so we can send calls to it, known as webhooks

3. To handle a webhook you need a web application that can accept the HTTP requests. If you already have a web application set up, handling a webhook is usually as easy as adding a new URL to your application. If you don't already have a web application, almost all server-side programming languages offer frameworks to help you build one.

4. When a text message is received by your Twilio number, Twilio makes an HTTP request to the message URL configured for that number. In your response to that request, you can tell Twilio what to do in response to the SMS using Twilio’s XML like markup language, TwiML  or just acknowledge receipt.
5. An alternative to deploying code to a server during development is to serve that code from your local development environment. You can do this by tunneling to your local machine using ngrok. ngrok is a really easy way to use your local dev environment and it provides a publicly accessible URL.  Download the free package and use that address to respond to Twilio webhook requests.

