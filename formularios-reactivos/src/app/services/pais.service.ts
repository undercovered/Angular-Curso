import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private urlCountries: string = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(this.urlCountries);
  }
}
