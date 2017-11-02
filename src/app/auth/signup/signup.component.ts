import { Component,Inject } from "@angular/core";
import { Form,FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
@Component({
    selector:'signup-layout',
    templateUrl:'./signup.view.html'
})

export class SignupComponent {
  form: FormGroup;
 
  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      signupCredentials: fb.group({
        email: new FormControl('', [Validators.minLength(2)]),
        password: new FormControl('', [Validators.minLength(2)]),
      })
     
    });
  }

  checkForm() {
    console.log(this.form.value.signupCredentials.email);
    localStorage.setItem("user-info", JSON.stringify(this.form.value.credentials));
  }
}
