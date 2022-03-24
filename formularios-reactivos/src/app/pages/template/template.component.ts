import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario:any = {
    nombre: '',
    apellido: '',
    correo: '',
    data: '',
    genero: ''
  };
  pokemones: any = [];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getCountries()
    .subscribe(
      (paises:any) => {
        this.pokemones = paises.results
        this.pokemones.unshift({
          name: '[Seleccione Pokemon]',
          url: ''
        })
      }
    )

  }

  guardar(formulario: NgForm) {
    if ( formulario.invalid) {
      Object.values(formulario.controls).forEach( (control) => {
        control.markAllAsTouched()
      })

      return;
    }
    console.log('Submit disparado!')
    console.log(formulario.value);
  }

}
