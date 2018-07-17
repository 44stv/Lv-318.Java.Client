import {Component, OnInit} from '@angular/core';
import {SocialService} from '../../../../../services/auth/social.service';
import {User} from '../../../../../models/user.model';
import {CustomAuthService} from '../../../../../services/auth/custom-auth.service';
import {TokenModel} from '../../../../../services/auth/token/token-model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import {Login} from '../../../../../models/login.model';

@Component({
  selector: 'app-social-sing-in',
  templateUrl: './social-sing-in.component.html',
  styleUrls: ['./social-sing-in.component.css']
})
export class SocialSingInComponent {
  user = new User;
  login: boolean = false;
  facebookImg = '../../../../../../assets/img/social-facebook-button-blue-icon.png';
  googleImg = '../../../../../../assets/img/Google-Plus-icon.png';

  constructor(private socialAuthService: AuthService,
              private ourauthService: CustomAuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private socialService: SocialService,
              private location: Location) {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (SocialUser) => {
        console.log(socialPlatform + ' sign in data : ', SocialUser);
        console.log(SocialUser.email);
        this.user.email = SocialUser.email;
        this.user.firstName = SocialUser.name;
        this.user.provider = SocialUser.provider;
        this.user.tokenId = SocialUser.idToken;
        this.user.password = '';
        if (SocialUser.provider === 'google') {
          this.loginGoogle();
        }
        if (SocialUser.provider === 'facebook') {
          this.loginFacebook();
        }
      }
    );
  }

  public loginGoogle() {
    this.socialService.signInWithSocialGoogle(this.user).subscribe((token: TokenModel) => {
      this.ourauthService.setToken(token);
      this.snackBar.open('User loged successfully', null, {
        duration: 4000
      });
      this.router.navigate(['main/user/profile']);
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open('Sorry, you can`t login! Try again or registrate', null, {
          duration: 5000
        });
      }
    });
  }

  public loginFacebook() {
    this.socialService.signInWithSocialFacebook(this.user).subscribe((token: TokenModel) => {
      this.ourauthService.setToken(token);
      console.log('token after login Facebok');
      this.snackBar.open('User loged successfully', null, {
        duration: 4000
      });
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open('Sorry, you can`t login! Try again or registrate', null, {
          duration: 5000
        });
      }
    });
  }

  public socialSignOut() {
    this.socialAuthService.signOut();
    this.login = false;
  }
}
