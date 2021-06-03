/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData;
  constructor(private ngFireAuth: AngularFireAuth, private router: Router, public afStore: AngularFirestore) {
    this.ngFireAuth.authState.subscribe(user =>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      }
      else{
        localStorage.setItem('user', null);
      }
    });
  }

  SignIn(email, password){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  RegisterUser(email, password){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  SignOut()
  {
    // ERROR =>
    // when logout is clicked directs to login page,
    // BUT login details in there form
    // HOW to clear the form
    localStorage.setItem('user', null);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    return this.ngFireAuth.signOut();
  }

  getUser(){
    return this.ngFireAuth.user;
  }

}
