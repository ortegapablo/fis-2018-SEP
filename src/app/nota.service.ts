import { Injectable } from '@angular/core';
import { Nota } from './nota';
import { NOTAS } from './mock-notas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotaService {

  serverUrl = "/api/v1";

  constructor(private httpClient: HttpClient) { }

  getNotas(): Observable<Nota[]> {
    const url = this.serverUrl + "/notas";
    return this.httpClient.get<Nota[]>(url);

  }
}
