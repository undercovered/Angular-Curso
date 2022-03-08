import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioLoginModel } from "src/app/models/login.model";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
// import Swal from 'sweetalert';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioLoginModel  = new UsuarioLoginModel();
  recordarme: boolean = false;
  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    if( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email')
      this.recordarme = true;
    }
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: "¡Por favor espere...!",
      icon: "info",
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(
      (res: any) => {
        console.log(res);
        Swal.close();
        if( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home')
      },
      (error: any) => {
        Swal.fire({
          title: "¡Error en las credenciales!",
          text:
            error.error.error.message == "INVALID_PASSWORD"
              ? "Contraseña incorrecta"
              : "Email incorrecto",
          icon: "error",
        });
      }
    );
  }
}
