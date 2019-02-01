import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  idToken; userInfo; user; userDB
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log('AuthComponent')
  }
  public login() {
    this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.firebase.apiKey}`, {
      email: "mrsilva@yesmkt.com",
      password: "volvoxc90d5",
      returnSecureToken: true
    })
      .toPromise()
      .then((res) => {
        this.idToken = res['idToken']
        console.log(res, this.idToken)
      })
      .catch((err) => console.log(err))
  }
  public registration() {
    this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebase.apiKey}`, {
      email: "mikeriver@yesmkt.com",
      password: "volvoxc90d5",
      returnSecureToken: true
    })
      .toPromise()
      .then((res) => {
        this.idToken = res['idToken']
        console.log(res, this.idToken)
      })
      .catch((err) => console.log(err))
  }
  public getUserInfo() {
    this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${environment.firebase.apiKey}`, {
      idToken: this.idToken
    })
      .toPromise()
      .then((res) => {
        this.user = res['users'][0]
        console.log(this.user)
      })
      .catch((err) => console.log(err))
  }
  public userFirestoreInfo(collection, id) {
    this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/${collection}/${id}`)
      .toPromise()
      .then((res) => {
        this.userDB = res
        console.log(res, this.userDB)
      })
      .catch((err) => console.log(err))
  }
}
