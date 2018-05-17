import { Component } from '@angular/core';
import { Send } from './models/send.model';
import { TwilioService } from './service/twilio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sendObject = new Send();
  public sending = false;
  public isSuccess = false;
  public showAlert = false;

  constructor(private twilio:TwilioService){}

  public isValid() {
    return this.sendObject.accountSid != '' && this.sendObject.authToken != '' &&
      this.sendObject.from != '' && this.sendObject.to != '' && this.sendObject.message != '';
  }

  public send(){
    this.sending = true;
    this.twilio.sendSmsRequest(this.sendObject).then(res => {
      this.sending = false;
      this.isSuccess = true;
      this.showAlert = true;
      this.sendObject.from = this.sendObject.to = this.sendObject.message = "";
    }).catch(err => {
      this.sending = false;
      this.isSuccess = false;
      this.showAlert = true;
    })
  }
}
