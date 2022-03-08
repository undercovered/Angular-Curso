import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioModel } from "src/app/models/usuario.model";
import { AuthService } from "src/app/services/auth.service";

import Swal from "sweetalert2";
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel; //Instancia
  recordarme: boolean = false;

  
  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel(); //Inicialización
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      text: "¡Por favor espere...!",
      icon: "info",
    });
    Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe(
      (res: any) => {
        Swal.close();
        Swal.fire({
          text: "¡Datos correctamente registrados!",
          icon: "success",
        });
        if( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home')
        console.log(res);
      },
      (err: any) => {
        console.log(err.error.error.message);
        Swal.close();
        Swal.fire({
          title: "¡Error en los datos registrado!",
          text:
            err.error.error.message == "EMAIL_EXISTS"
              ? "Este correo electrónico se encuentra registrado"
              : `${err.error.error.message}`,
          icon: "error",
        });
      }
    );
  }
}
