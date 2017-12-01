import { Component,Inject } from "@angular/core";
import { PasswordValidation } from "./custom.passwordValidation";
import { Form,FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";




/*
* @Service of signup import 
*/
import { SignupService } from './signup.service';


@Component({
    selector:'signup-layout',
    templateUrl:'./signup.view.html',
    providers: [SignupService]
})

export class SignupComponent {
  form: FormGroup;
 serviceTitle:any;
 
  constructor(public fb: FormBuilder,private _SignupService: SignupService) {
    $(document).ready(function() { console.log('jquery is working'); });
    this._SignupService.someMethod().subscribe(res=>{
      this.serviceTitle= res ;
      
      this.abc(this.serviceTitle);
    });
    
    
    this.form = this.fb.group({
      signupCredentials: fb.group({
        email: new FormControl('', [Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
        mobno: new FormControl('', [Validators.maxLength(10),Validators.required,Validators.minLength(10),Validators.pattern(/\d/)]),
        password: new FormControl('', [Validators.minLength(8),Validators.required]),
        repassword: new FormControl('', [Validators.minLength(8),Validators.required])
      },
     {validator: PasswordValidation.MatchPassword})
    
    });
  }
  abc(obj){
    //console.log(obj)
  }
  checkForm() {
    console.log(this.form.value);
    //localStorage.setItem("user-info", JSON.stringify(this.form.value.credentials));
    this._SignupService.saveUser(this.form.value).subscribe(
      res=>{
        console.log(res);
      },
      error=>{console.error(error);
      }

    );

  }
}
