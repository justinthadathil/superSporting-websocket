import { Component, OnInit } from '@angular/core';
import { SportServiceService } from './sport-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  inplayList = [];

  constructor(
    private SportServiceService: SportServiceService
  ){ }


  ngOnInit(): void {
    this.SportServiceService.subscribe('/topic/inplay', (data: any):void =>{
      this.inplayList = JSON.parse(data)
      console.log(this.inplayList)

      this.inplayList.map((elm:any) => {
        console.log(elm.id)

        this.SportServiceService.subscribe(`/topic/event/${elm.id}`, (data2: any):void =>{
          console.log(data2)
        })
      });
    });
  }

}
