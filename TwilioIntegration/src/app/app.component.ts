import { Component, OnInit } from '@angular/core';
import { Send } from './models/send.model';
import { TwilioService } from './service/twilio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public sendObject = new Send();
  public sending = false;
  public isSuccess = false;
  public showAlert = false;

  public receivedSms = [];
  public sentSms = [];
  constructor(private twilio: TwilioService) { }

  ngOnInit() {
    this.refreshMessages();
  }

  // refresh the messages
  public refreshMessages() {
    Promise.all([this.twilio.getSentMessages(), this.twilio.getReceivedMessages()]).then(result => {
      this.sentSms = result[0];
      this.receivedSms = result[1];
    }).catch(err => {
      console.log(err);
    })
  }

  // check if fields are valid
  public isValid() {
    return this.sendObject.accountSid != '' && this.sendObject.authToken != '' &&
      this.sendObject.from != '' && this.sendObject.to != '' && this.sendObject.message != '';
  }

  // fire send
  public send() {
    this.sending = true;
    this.twilio.sendSmsRequest(this.sendObject).then(res => {
      this.sending = false;
      this.isSuccess = true;
      this.showAlert = true;
      this.sendObject.from = this.sendObject.to = this.sendObject.message = "";
      this.refreshMessages();
    }).catch(err => {
      this.sending = false;
      this.isSuccess = false;
      this.showAlert = true;
    })
  }
}
