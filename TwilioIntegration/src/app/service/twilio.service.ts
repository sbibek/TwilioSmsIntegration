import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Send } from '../models/send.model';
import { environment } from '../../environments/environment';

@Injectable()
export class TwilioService {
  constructor(private http: HttpClient) { }

  public sendSmsRequest(request:Send): Promise<any> {
    return this.http.post(environment.url+"send",request).toPromise();
  }
}