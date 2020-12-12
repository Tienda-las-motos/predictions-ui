import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { UserInterface } from './user.interface';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: Observable<any>
  unloggedPath: string = ''

  constructor (
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private _cache: CacheService,
    private _snack: MatSnackBar
  ) {



    //? Método para cargar el usuario autenticado de manera asíncrona
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        return user ?
          this.afs.doc<UserInterface>( `users/${ user.uid }` ).valueChanges() :
          of( null );
      } )
    )
  }
  
  async getCurrentUser() {
    var user = this._cache.getDataKey( 'user' )

    if ( !user ) {

      var user2 
        this.user$.pipe().subscribe( u => user2 = u)
      if ( !user2 ) {
        this.router.navigate( [ `/${this.unloggedPath}` ], { queryParams: { logged: false } } )
      } else {
        this._cache.updateData( 'user', user2 )
      }
      return user2

    } else {
      return user
    }
  }

  // ? Iniciar sesión con una cuenta google
  async googleSingIn() {

    // Abre el popup de autenticación
    const provider = new firebase.auth.GoogleAuthProvider();
    var credential = await this.afAuth.signInWithPopup( provider )

    // Guardar los datos de cliente nuevo en firebase
    return this.updateUserData( credential.user )
  }

  async facebookSingIn() {

    // Abre el popup de autenticación
    const provider = new firebase.auth.FacebookAuthProvider();
    var credential = await this.afAuth.signInWithPopup( provider )

    // Guardar los datos de cliente nuevo en firebase
    return this.updateUserData( credential.user )
  }

  async passwordLogin( email, pwd ) {
    try {
      var credential = await this.afAuth.signInWithEmailAndPassword( email, pwd )
      return this.updateUserData( credential.user )
    } catch ( error ) {
      console.log( error )
      if ( error.code.includes( 'not-found' ) ) {
        alert( 'No se encontró el email' )
      }
      if ( error.code.includes( 'invalid' ) ) {
        alert( 'Escribe una direccion de correo válida' )
      }
      if ( error.code.includes( 'wrong-password' ) ) {
        alert( 'Contraseña incorrecta' )
      }
    }
  }

  private async updateUserData( { uid, email, displayName, photoURL }: UserInterface ) {
    // Buscar el usuario en la base de datos de firebase
    const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc( `users/${ uid }` );
    const userDoc = await this.afs.collection( 'users' ).ref.doc( uid ).get()
    const dateRegist = new Date()

    // Si no existe, se agrega fecha de registro
    if ( userDoc.exists ) {
      var data = { uid, email, displayName, photoURL }
      userRef.set( data, { merge: true } )
      this._cache.updateData( 'user', userDoc.data() )
    } else {
      var newData = { uid, email, displayName, photoURL, dateRegist }
      userRef.set( newData, { merge: true } )
      this._cache.updateData( 'user', newData )
    }


    this.router.navigate( [ '' ] );
  }

  editPwd( email ) {
    this.afAuth.sendPasswordResetEmail( email )
      .then( res => {
        this._snack.open( 'Se ha enviado un email al admin para cambiar su contraseña' )
      } ).catch( error => {
        alert( error.message )
      } )
  }



  //? Cerrar sesión

  async singOut() {
    await this.afAuth.signOut();
    localStorage.removeItem( 'mii' )
    return this.router.navigate( [ '/' ] );
  }

}
