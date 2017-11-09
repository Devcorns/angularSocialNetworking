import { Component,Inject } from "@angular/core";

import { Form,FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";


@Component({
  selector: 'taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent {
  
  leftPanel:boolean = false;
  taskform: FormGroup;
 
  constructor(public fb: FormBuilder) {
    
    this.taskform = this.fb.group({
      taskPanelGroup: fb.group({
         
            taskHeading: new FormControl('',[Validators.required]),
            taskDescription: new FormControl('',[Validators.required])
         

      })
     
    
    });
  }
  



}

