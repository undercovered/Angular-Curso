import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  get camposNoValidos() {
    const validador = {
      nombre:
        this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched,
      apellido:
        this.forma.get('apellido')?.invalid &&
        this.forma.get('apellido')?.touched,
      correo:
        this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched,
      distrito: this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched,
      ciudad: this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched,
    };
    return validador;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]], //[valor por defecto, los validadores sincronos, validadores asincronos]
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      })
    });
  }
  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
  }
}
