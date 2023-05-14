import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as StockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportServiceService {

  socket = new StockJS(environment.socketEndpoint);
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: any): void{
    const connected: boolean = this.stompClient.connected;
    if(connected){
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.stompClient.connect({}, ():any=> {
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(topic: string, callback: any): void{
    this.stompClient.subscribe(topic, (message:any):any=>{
      callback(message.body);
    });
  }

}
