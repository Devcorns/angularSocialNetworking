import { Component,Inject } from "@angular/core";
import { Form,FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
    selector:'login-layout',
    templateUrl:'./login.view.html'
})

export class LoginComponent {
  form: FormGroup;
 
  constructor(@Inject(FormBuilder) fb: FormBuilder,private router:Router) {
    this.form = fb.group({
      loginCredentials: fb.group({
        email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      })
     
    });
  }

  redirectSignup(){
    this.router.navigate(["/signup"]);
  }
  checkForm() {
    // console.log(this.form.value.loginCredentials);
    // localStorage.setItem("user-info", JSON.stringify(this.form.value.loginCredentials));
    localStorage.setItem("user-info", JSON.stringify(this.form.value.loginCredentials));
    var jsonCredentials = JSON.parse(localStorage.getItem('user-info'));
    console.log(jsonCredentials.email);
    // if(jsonCredentials.email||jsonCredentials.password){
    //   console.log("Ready to redirect");
    // }
    if(jsonCredentials.email=="itprakhar@gmail.com" || jsonCredentials.password=="password"){
      console.log("Email and password is okay");
      this.router.navigate(["/signup"]);
    }
    else{
      console.log("Email and password is not okay");
    }
      


   
  }
}
