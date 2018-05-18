import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Send } from '../models/send.model';
import { environment } from '../../environments/environment';
import { Message } from '../models/Message.model';

@Injectable()
export class TwilioService {
  constructor(private http: HttpClient) { }

  // send sms
  public sendSmsRequest(request: Send): Promise<any> {
    return this.http.post(environment.url + "send", request).toPromise();
  }

  // get all sent sms
  public getSentMessages(): Promise<Array<Message>> {
    return this.http.get<Array<Message>>(environment.url + "sent").toPromise();
  }

  // get all received sms
  public getReceivedMessages(): Promise<Array<Message>> {
    return this.http.get<Array<Message>>(environment.url + "rcvd").toPromise();
  }
}