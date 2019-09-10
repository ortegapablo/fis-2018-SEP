import { Injectable } from '@angular/core';
import { Nota } from './nota';
import { NOTAS } from './mock-notas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotaService {

  serverUrl = "/api/v1";
  apikey = "?apikey=d5f92e5c-b3d8-4f62-9c81-3adb06482ab8";

  constructor(private httpClient: HttpClient) { }


   private log(message: string) {
    console.log(`notaservice: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}



  getNotas(): Observable<Nota[]> {
    const url = this.serverUrl + "/notas" + this.apikey;
    return this.httpClient.get<Nota[]>(url);

  }
  deleteNota(nota: Nota): Observable<Nota[]> {
    const url = this.serverUrl + "/notas/" + nota.titulo + this.apikey;
    return this.httpClient.delete<Nota[]>(url)
    .pipe(
      tap(() => this.log('nota...')),
      catchError(this.handleError('errores al borrar', []))
  );
     }
     addNota(nota: Nota): Observable<any> {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = this.serverUrl + "/notas" + this.apikey;
      return this.httpClient.post(url, nota, {responseType: 'text', headers: headers})
    /*     .pipe(
            tap(() => this.log(`add proyect id =${proyect.id}`)),
            catchError(this.handleError('addProyect', []))
        ); */
    }
  
    putNota(nota: Nota): Observable<any> {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = this.serverUrl + "/notas/" + nota.titulo + this.apikey;
      return this.httpClient.put(url, nota, {responseType: 'text', headers: headers})
        //   .pipe(
        //     tap(() => this.log(`updated proyect id=${proyect.id}`)),
        //     catchError(this.handleError('updateProyect', []))
        // );    
    }









    }

