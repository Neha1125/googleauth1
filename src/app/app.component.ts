import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy{
  token: NbAuthOAuth2Token;
  public data:any = []
  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService, private http:HttpClient) {
    this.authService.onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
          this.getData(token['payload']['access_token']);
        }
      });
  }

  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        
      });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getData(token){
    const url ='https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+token;
    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }
  
  
}
