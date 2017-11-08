import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent {
  showhidepanel:String="hide";
  leftPanel:boolean = false;
  constructor() { }
  showRightPanel(){

    
  }



}
