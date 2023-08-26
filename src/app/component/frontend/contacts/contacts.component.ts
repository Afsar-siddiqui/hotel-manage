import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FrontendService } from 'src/app/service/frontend.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private _service: FrontendService, private router: Router){
    this.loginForm = this.fb.group({
      mobile: [],
      password: [],
    })
  }

  onSubmit(){
    let data = this.loginForm.value;
    console.log("working", data);

    this._service.getLogin(data).subscribe({
      next: res=>{
        let response = res;
        console.log("login", res)
      },
      error: err=>{
        console.log("error ",err)
      }
    })

  }

}
