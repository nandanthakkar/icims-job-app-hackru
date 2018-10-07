import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private basePath =  'https://hackicims.com/api/v1/companies/24/applications/';
  constructor(private http: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.basePath)
      .pipe(
        catchError(this.handleError('getApplications', []))
      );
  }

  getApplication(id: number): Observable<Application> {
    const url = `${this.basePath}/${id}`;
    return this.http.get<Application>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Application>(`getApplication id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
