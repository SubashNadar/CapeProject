import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { KanbanService } from './kanban.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth:KanbanService,private router:Router) { }
  canActivate(): boolean {
    if(this.auth.loggedIn()){
      return true
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
    }
}
