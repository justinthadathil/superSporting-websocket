import { Component, OnInit } from '@angular/core';
import { SportServiceService } from './sport-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  allSportingEvent:any;
  marketUpdate:any;

  constructor(
    private SportServiceService: SportServiceService
  ){ }

  ngOnInit(): void {
    this.SportServiceService.subscribe('/topic/inplay', (idData: any):void =>{
      //get list of the Ids of the sport events currently considered live.
      let eventIDs = JSON.parse(idData);
      let sportingEvents:any = [];
      eventIDs.map((elm:any, i:number) => {
        this.SportServiceService.subscribe(`/topic/event/${elm.id}`, (eventData: any):void =>{
          let convertedEventData = JSON.parse(eventData);
          let checkData:any = sportingEvents.filter((obj: any) => obj.id === elm.id);
          //check for duplicate id
          if(checkData.length === 0) {
            //if no then push
            sportingEvents.push(convertedEventData);
          }else{
            //if found then update the values
            console.log('old vales', checkData);
            console.log('new values', convertedEventData);
            const index = sportingEvents.findIndex((obj:any) => obj.id === convertedEventData.id);
            if (index !== -1) {
              sportingEvents[index] = convertedEventData;
            }
          }

          if(eventIDs.length === i+1){
            this.allSportingEvent = sportingEvents;
          }
        });
      });

    });
  }


  returnData(marketId: any){
    console.log(marketId)
    this.SportServiceService.subscribe(`/topic/market/${marketId}`, (eventData: any):void =>{
      let convertedEventData = JSON.parse(eventData);
      this.marketUpdate = convertedEventData;
      console.log(this.marketUpdate)
    });
  }

}
