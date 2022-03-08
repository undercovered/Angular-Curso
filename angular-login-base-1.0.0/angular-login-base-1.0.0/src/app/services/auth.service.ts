import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsuarioLoginModel } from "../models/login.model";
import { UsuarioModel } from "../models/usuario.model";
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = " https://identitytoolkit.googleapis.com/v1/accounts:";
  private apiKey = "AIzaSyBEWa5fsF9RiaFSoIQDzyo7NpwAorHRSeE";
  userToken: string;
  // crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }
  logout() {
    localStorage.removeItem('token')
  }
  login(usuario: UsuarioLoginModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( res => {
        console.log('Entró en el map')
        this.guardarToken(res['idToken'])
        return res;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
    .pipe(
      map( res => {
        console.log('Entró en el map')
        this.guardarToken(res['idToken'])
        return res;
      })
    );
  }

  private guardarToken(idToken:string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }
    else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado():boolean {
    return this.userToken.length > 2;
  }
}
