import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_ConsumerPurchaseMonitor';

  currentUser:User

  constructor(protected authService:AuthenticationService){
  }

  ngOnInit() {
    // Subskrybuj do zmian w currentUser
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    console.log(this.authService.currentUserValue)
  }
  logout() {
    this.authService.logout();
  }
}

