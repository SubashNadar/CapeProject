import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Kanban } from '../model/kanban';
import { kanbanDTO } from '../model/kanbanDto';

import { KanbanService } from '../service/kanban.service';



@Component({
  selector: 'app-kanban-dialog',
  templateUrl: './kanban-dialog.component.html',
  styleUrls: ['./kanban-dialog.component.css']
})
export class KanbanDialogComponent implements OnInit {

  title !: string;
  form!:FormGroup;
 
  details:kanbanDTO={
    kanbanTitle: '',
    email: ''
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<KanbanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private kanbanService: KanbanService) { 

    this.createRegisterForm();
    }

  ngOnInit() {
  }
  createRegisterForm() :void{


    this.form=new FormGroup({
       "kanbanTitle":new FormControl(this.details.kanbanTitle,[Validators.required]),
       "email":new FormControl(sessionStorage.getItem('email'))
    });
  }
 
  close() {
    this.dialogRef.close();
  } 

  save(){
    Swal.fire({   
      icon: 'success',  
      title: 'you Updated task successfuly',  
      showConfirmButton: false,  
      timer: 10500  
    }); 

    const Observable= this.kanbanService.saveNewKanban(this.form.value);
    Observable.subscribe((data:{}) =>{
    })
    this.dialogRef.close();
    window.location.reload();
  }
}


