import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observer,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { userForm } from '../components/auth/auth.component';

export interface UserProfile {
  email: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private _authError = new Subject<string>();
  private _userProfile = new BehaviorSubject<UserProfile | null>(null);

  get authErrorSubject() {
    const authContext = this._authError;
    const subscribe = authContext.subscribe.bind(authContext);

    return { subscribe };
  }

  get userProfileSubject() {
    const authContext = this._userProfile;
    const subscribe = authContext.subscribe.bind(authContext);
    const pipe = authContext.pipe.bind(authContext);

    return { subscribe, pipe };
  }

  private setErrorMessage = (error: Error) => {
    this._authError.next(error.message);
    return of(null);
  };

  private setUserProfile = (user: UserProfile | null) => {
    this._userProfile.next(user);
  };

  fetchUser = ({ email, password }: userForm) => {
    const params = {
      email: `eq.${email}`,
      password: `eq.${password}`,
      select: 'email, token',
    };

    return this.http
      .get<UserProfile[]>('/users', { params })
      .pipe(
        map((users) => {
          if (!users.length)
            throw new Error('Email or Password are incorrect!');

          return users[0];
        }),
        catchError(this.setErrorMessage)
      )
      .subscribe(this.setUserProfile);
  };

  createUser = (signupForm: userForm) => {
    const postOptions: Parameters<typeof this.http.post>['2'] = {
      headers: { prefer: 'return=representation' },
      params: { select: 'email, token' },
    };

    this.http
      .post<UserProfile[]>('/users', signupForm, postOptions)
      .pipe(
        catchError(this.setErrorMessage),
        map((userProfile) => userProfile && userProfile[0])
      )
      .subscribe(this.setUserProfile);
  };
}
