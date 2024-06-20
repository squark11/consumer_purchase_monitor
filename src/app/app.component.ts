import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_ConsumerPurchaseMonitor';

  currentUser:User

  constructor(protected authService:AuthenticationService, private modalService: NgbModal){
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    console.log(this.authService.currentUserValue)
  }
  logout() {
    // this.authService.logout();
  }

  openChangePasswordModal() {
    this.modalService.open(ChangePasswordComponent);
  }
}

