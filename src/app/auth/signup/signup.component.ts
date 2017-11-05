import { Component,Inject } from "@angular/core";
import { PasswordValidation } from "./custom.passwordValidation";
import { Form,FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";

@Component({
    selector:'signup-layout',
    templateUrl:'./signup.view.html'
})

export class SignupComponent {
  form: FormGroup;
 
  constructor(public fb: FormBuilder) {
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

  checkForm() {
    console.log(this.form);
    localStorage.setItem("user-info", JSON.stringify(this.form.value.credentials));
  }
}
