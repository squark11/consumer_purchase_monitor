import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  private subscription: Subscription;
  message: any;
  private alertTimeout: any; 

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.subscription = this.alertService.getAlert()
          .subscribe(message => {
              switch (message && message.type) {
                  case 'success':
                      message.cssClass = 'alert alert-success';
                      break;
                  case 'error':
                      message.cssClass = 'alert alert-danger';
                      break;
              }
              this.message = message;
              this.setAlertTimeout(); 
          });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
      clearTimeout(this.alertTimeout); 
  }

  private setAlertTimeout() {
      if (this.alertTimeout) {
          clearTimeout(this.alertTimeout); 
      }
      this.alertTimeout = setTimeout(() => {
          this.message = null; 
      }, 5000); 
  }
}
