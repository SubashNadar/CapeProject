import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { KanbanService } from '../service/kanban.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router:Router,private kanbanService:KanbanService, private authService:AuthService) {}
  ngOnInit(): void {}
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
    })
    get email() {
      return this.loginForm.get('email') as FormControl;
      
    }
    
    get password(){
      return this.loginForm.get('password') as FormControl;
    }
    
    emailId!:any;

  //authentication and navigate to login
  onSubmit(){

    this.emailId=this.loginForm.controls.email.value;
    console.log(this.emailId);
    
    sessionStorage.setItem('email',this.emailId);
    
    this.kanbanService.authenticate(this.loginForm.value).subscribe(result=>{
      console.log(result)

      sessionStorage.setItem('token',result.jwtToken);
      
      Swal.fire({   
        icon: 'success',  
        title: 'Your logged in successfuly',  
        showConfirmButton: false,  
        timer: 3000  
      });  
       this.authService.login();
      this.router.navigate(['/kanban'])
    },
    err=>console.log(err)
    )
}
  
  //navigate to register page
  register(){
    this.router.navigate(['/register']);
  }
}