import { Component } from '@angular/core';

// MODELS
import { User } from '../../models/user.model';

// SERVICES
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public user: User;

  constructor( private userService: UserService ) { 
    
    this.user = userService.user;
    

  }

  logout(){
    this.userService.logout();
  }

}
