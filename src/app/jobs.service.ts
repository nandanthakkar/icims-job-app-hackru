import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private basePath =  'https://hackicims.com/api/v1/companies/24/jobs/';
  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.basePath)
      .pipe(
        catchError(this.handleError('getJobs', []))
      );
  }

  getJob(id: number): Observable<Job> {
    const url = `${this.basePath}/${id}`;
    return this.http.get<Job>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Job>(`getJob id=${id}`))
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
