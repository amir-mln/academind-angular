import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PortalDirective } from 'src/app/features/shared/directives/portal/portal.directive';
import { AuthService, UserProfile } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/features/shared/components/alert/alert.component';
import { Router } from '@angular/router';

export interface userForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  authForm!: FormGroup;
  user: UserProfile | null = null;
  authErrorSubscription!: Subscription;
  alertCloseSubscription!: Subscription;
  userProfileSubscription!: Subscription;
  @ViewChild(PortalDirective, { static: false }) alertPortal!: PortalDirective;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.userProfileSubscription =
      this.authService.userProfileSubject.subscribe(this.navigateOnUserLog);
    this.authErrorSubscription = this.authService.authErrorSubject.subscribe(
      this.renderAlertPortal
    );
  }

  ngOnDestroy(): void {
    this.authErrorSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }

  toggleLoginMode = () => (this.isLoginMode = !this.isLoginMode);

  formSubmitHandler = () => {
    const authMethodName = this.isLoginMode ? 'fetchUser' : 'createUser';
    this.authService[authMethodName](this.authForm.value);
  };

  renderAlertPortal = (alertMessage: string) => {
    const alertContainerRef = this.alertPortal.viewContainerRef;
    let alertComponentRef;
    alertContainerRef.clear();

    alertComponentRef = alertContainerRef.createComponent(AlertComponent);
    alertComponentRef.instance.message = alertMessage;
    this.alertCloseSubscription = alertComponentRef.instance.close.subscribe(
      () => {
        this.alertCloseSubscription.unsubscribe();
        alertContainerRef.clear();
      }
    );
  };

  navigateOnUserLog = (userProfile: UserProfile | null) =>
    !!userProfile && this.router.navigate(['/recipe']);
}
