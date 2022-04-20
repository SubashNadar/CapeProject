import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { KanbanDialogComponent } from '../kanban-dialog/kanban-dialog.component';
import { Kanban } from '../model/kanban';
import { KanbanService } from '../service/kanban.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  kanbanList!: Kanban[];
  email!:any;
  username!:any;
  constructor(
    private kanbanService: KanbanService,
    private dialog: MatDialog
  ) { this.email=sessionStorage.getItem('email')

      this.username=sessionStorage.getItem('username');
    }

  


  ngOnInit() {

    this.getAllKanbanByEmailId();   
  }

  openDialogForNewKanban(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      kanban: new Kanban()
    };
    this.dialog.open(KanbanDialogComponent, dialogConfig)
  }


  
  private getAllKanbanByEmailId(): void {
      this.kanbanService.getAllKanbanByEmail(this.email).subscribe(
       response => {
          this.kanbanList = response;
         }
      )
     }
     logoutIn(){
      this.kanbanService.logout();
  }
    
}

