import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../../../../services/auth/social.service';
import { User } from '../../../../../models/user.model';
import { CustomAuthService} from '../../../../../services/auth/custom-auth.service';
import { TokenModel } from '../../../../../services/auth/token/token-model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { Login } from '../../../../../models/login.model';

@Component({
    selector: 'app-social-sing-in',
    templateUrl: './social-sing-in.component.html',
    styleUrls: ['./social-sing-in.component.css']
})
export class SocialSingInComponent {
    user = new User;
    login: boolean = false;
    constructor(private socialAuthService: AuthService,
                // private authService: AuthService,
        private ourauthService: CustomAuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private socialService: SocialService,
        private location: Location) { }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }


        // this.socialAuthService.signInWithSocial(socialPlatformProvider).subscribe(
        //     (userData) => {
        //         console.log(socialPlatform + " sign in data : ", userData);
        //         console.log(userData.email);
        //         this.authService.signInWithSocial(new Login(
        //         // this.authService.signInWithSocial(new SocialPrincipal(
        //             userData))
        //             .subscribe((token: TokenModel) => {
        //                 this.tokenStorage.saveToken(token);
        //                 this.snackBar.open('You are successfully authorized', null, {
        //                     duration: 4000
        //                 });
        //                 this.router.navigate(['/main']);

        //             }, (error) => {
        //                 if (error instanceof HttpErrorResponse)
        //                     this.snackBar.open(error.error.response, null, {
        //                         duration: 5000
        //                     });
        //             })
        //     }
        // );
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (SocialUser) => {
                console.log(socialPlatform + ' sign in data : ', SocialUser);
                console.log(SocialUser.email);
                this.user.email = SocialUser.email;
                this.user.firstName = SocialUser.name;
                this.user.provider = SocialUser.provider;
                this.socialService.signInWithSocial(this.user).subscribe((token: TokenModel) => {
                  this.ourauthService.setToken(token);
                  alert('User loged successfully.');
                  this.snackBar.open('User loged successfully', null, {
                    duration: 4000
                  });
                  this.router.navigate(['main']);
                }, (error) => {
                  if (error instanceof HttpErrorResponse) {
                    if (error.error.description === 'User is disabled') {
                      this.snackBar.open('Your account is not activated. Please confirm the registration', null, {
                        duration: 5000
                      });
                    } else {
                      this.snackBar.open(error.error.response, null, {
                        duration: 5000
                      });
                    }
                  }
                });
                this.login = true;
            }
        );


    }
    public socialSignOut() {
        this.socialAuthService.signOut();
        this.login = false;
    }
}
